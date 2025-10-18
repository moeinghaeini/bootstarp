#!/bin/bash

# AWS S3 + CloudFront Deployment Script for Portfolio Website
# This script deploys the portfolio website to AWS using free tier services

set -e  # Exit on any error

# Configuration
STACK_NAME="portfolio-website"
REGION="us-east-1"  # CloudFront requires us-east-1
BUCKET_NAME=""
DOMAIN_NAME="moeinghaeini.github.io"  # Change this to your domain
CERTIFICATE_ARN=""  # Optional: Add your ACM certificate ARN for custom domain

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check if AWS CLI is configured
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS CLI is not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    # Check if Node.js is installed (for build process)
    if ! command -v node &> /dev/null; then
        log_warning "Node.js is not installed. Some build optimizations will be skipped."
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        log_warning "npm is not installed. Some build optimizations will be skipped."
    fi
    
    log_success "Prerequisites check completed"
}

# Build the website
build_website() {
    log_info "Building website for production..."
    
    # Create public directory if it doesn't exist
    mkdir -p public/{css,js,images}
    
    # Copy source files to public directory
    cp -r src/* public/
    
    # Optimize CSS if clean-css-cli is available
    if command -v cleancss &> /dev/null; then
        log_info "Minifying CSS..."
        cleancss -o public/css/main.min.css src/styles/main.css
    else
        log_warning "clean-css-cli not found, copying CSS without minification"
        cp src/styles/main.css public/css/main.css
    fi
    
    # Optimize JavaScript if terser is available
    if command -v terser &> /dev/null; then
        log_info "Minifying JavaScript..."
        terser src/scripts/main.js -o public/js/main.min.js -c -m
    else
        log_warning "terser not found, copying JavaScript without minification"
        cp src/scripts/main.js public/js/main.js
    fi
    
    # Copy images
    cp -r src/assets/images/* public/images/ 2>/dev/null || true
    
    # Create optimized index.html
    create_optimized_index
    
    log_success "Website build completed"
}

# Create optimized index.html for production
create_optimized_index() {
    log_info "Creating optimized index.html..."
    
    # Read the source index.html
    INDEX_CONTENT=$(cat src/index.html)
    
    # Replace development references with production references
    INDEX_CONTENT=$(echo "$INDEX_CONTENT" | sed 's|src/styles/main.css|css/main.min.css|g')
    INDEX_CONTENT=$(echo "$INDEX_CONTENT" | sed 's|src/scripts/main.js|js/main.min.js|g')
    INDEX_CONTENT=$(echo "$INDEX_CONTENT" | sed 's|src/assets/images/|images/|g')
    
    # Add production optimizations
    INDEX_CONTENT=$(echo "$INDEX_CONTENT" | sed 's|<script src="js/main.min.js"></script>|<script src="js/main.min.js" defer></script>|g')
    
    # Write optimized index.html
    echo "$INDEX_CONTENT" > public/index.html
    
    log_success "Optimized index.html created"
}

# Deploy CloudFormation stack
deploy_infrastructure() {
    log_info "Deploying AWS infrastructure..."
    
    # Deploy CloudFormation stack
    aws cloudformation deploy \
        --template-file aws-deployment/cloudformation-template.yaml \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --parameter-overrides \
            DomainName="$DOMAIN_NAME" \
            CertificateArn="$CERTIFICATE_ARN" \
        --capabilities CAPABILITY_IAM \
        --no-fail-on-empty-changeset
    
    # Get stack outputs
    BUCKET_NAME=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
        --output text)
    
    DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text)
    
    WEBSITE_URL=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
        --output text)
    
    log_success "Infrastructure deployed successfully"
    log_info "S3 Bucket: $BUCKET_NAME"
    log_info "CloudFront Distribution: $DISTRIBUTION_ID"
    log_info "Website URL: $WEBSITE_URL"
}

# Upload website files to S3
upload_website() {
    log_info "Uploading website files to S3..."
    
    if [ -z "$BUCKET_NAME" ]; then
        log_error "S3 bucket name not found. Please check CloudFormation stack."
        exit 1
    fi
    
    # Upload all files with proper content types and cache headers
    aws s3 sync public/ s3://"$BUCKET_NAME"/ \
        --region "$REGION" \
        --delete \
        --cache-control "public, max-age=31536000" \
        --exclude "*.html" \
        --exclude "*.json"
    
    # Upload HTML files with shorter cache
    aws s3 sync public/ s3://"$BUCKET_NAME"/ \
        --region "$REGION" \
        --cache-control "public, max-age=3600" \
        --include "*.html" \
        --include "*.json"
    
    # Set proper content types
    aws s3 cp s3://"$BUCKET_NAME"/index.html s3://"$BUCKET_NAME"/index.html \
        --content-type "text/html" \
        --cache-control "public, max-age=3600"
    
    aws s3 cp s3://"$BUCKET_NAME"/manifest.json s3://"$BUCKET_NAME"/manifest.json \
        --content-type "application/json" \
        --cache-control "public, max-age=3600"
    
    log_success "Website files uploaded to S3"
}

# Invalidate CloudFront cache
invalidate_cache() {
    log_info "Invalidating CloudFront cache..."
    
    if [ -z "$DISTRIBUTION_ID" ]; then
        log_error "CloudFront distribution ID not found. Please check CloudFormation stack."
        exit 1
    fi
    
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*" \
        --region "$REGION"
    
    log_success "CloudFront cache invalidation initiated"
}

# Setup monitoring and alerts
setup_monitoring() {
    log_info "Setting up basic monitoring..."
    
    # Create CloudWatch alarm for 4xx errors (free tier)
    aws cloudwatch put-metric-alarm \
        --alarm-name "$STACK_NAME-4xx-errors" \
        --alarm-description "4xx errors on portfolio website" \
        --metric-name 4xxErrorRate \
        --namespace AWS/CloudFront \
        --statistic Average \
        --period 300 \
        --threshold 5.0 \
        --comparison-operator GreaterThanThreshold \
        --dimensions Name=DistributionId,Value="$DISTRIBUTION_ID" \
        --evaluation-periods 2 \
        --region "$REGION" || log_warning "Could not create CloudWatch alarm"
    
    log_success "Basic monitoring setup completed"
}

# Display deployment summary
show_summary() {
    log_success "Deployment completed successfully!"
    echo ""
    echo "=========================================="
    echo "  PORTFOLIO WEBSITE DEPLOYMENT SUMMARY"
    echo "=========================================="
    echo "Website URL: $WEBSITE_URL"
    echo "S3 Bucket: $BUCKET_NAME"
    echo "CloudFront Distribution: $DISTRIBUTION_ID"
    echo "Region: $REGION"
    echo "Stack Name: $STACK_NAME"
    echo ""
    echo "Next steps:"
    echo "1. Wait 5-10 minutes for CloudFront distribution to fully deploy"
    echo "2. Test your website at: $WEBSITE_URL"
    echo "3. Monitor costs in AWS Billing Dashboard"
    echo "4. Set up custom domain (optional)"
    echo ""
    echo "To update the website, run this script again."
    echo "To delete all resources, run: aws cloudformation delete-stack --stack-name $STACK_NAME"
    echo "=========================================="
}

# Main deployment function
main() {
    echo "🚀 Starting AWS Portfolio Website Deployment"
    echo "============================================="
    
    check_prerequisites
    build_website
    deploy_infrastructure
    upload_website
    invalidate_cache
    setup_monitoring
    show_summary
}

# Run main function
main "$@"
