#!/bin/bash

# Setup Auto-Deploy for Portfolio Website
# This script sets up automated deployment to AWS when files change

set -e

echo "🚀 Setting up Auto-Deploy for Portfolio Website"
echo "=============================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ All prerequisites met"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x aws-deployment/deploy.sh
chmod +x auto-deploy.js

# Check if AWS infrastructure exists
echo "☁️  Checking AWS infrastructure..."

STACK_NAME="portfolio-website"
REGION="us-east-1"

if aws cloudformation describe-stacks --stack-name "$STACK_NAME" --region "$REGION" &> /dev/null; then
    echo "✅ AWS infrastructure found"
    
    # Get S3 bucket name
    BUCKET_NAME=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
        --output text)
    
    # Get CloudFront distribution ID
    DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
        --output text)
    
    echo "📦 S3 Bucket: $BUCKET_NAME"
    echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"
    
else
    echo "⚠️  AWS infrastructure not found. Deploying infrastructure first..."
    
    # Deploy infrastructure
    aws cloudformation deploy \
        --template-file aws-deployment/cloudformation-template.yaml \
        --stack-name "$STACK_NAME" \
        --region "$REGION" \
        --capabilities CAPABILITY_IAM \
        --no-fail-on-empty-changeset
    
    # Get outputs
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
    
    echo "✅ AWS infrastructure deployed"
    echo "📦 S3 Bucket: $BUCKET_NAME"
    echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"
fi

# Set environment variables
echo "🔧 Setting up environment variables..."
export S3_BUCKET_NAME="$BUCKET_NAME"
export CLOUDFRONT_DISTRIBUTION_ID="$DISTRIBUTION_ID"

# Create .env file for auto-deploy
cat > .env << EOF
S3_BUCKET_NAME=$BUCKET_NAME
CLOUDFRONT_DISTRIBUTION_ID=$DISTRIBUTION_ID
AWS_REGION=$REGION
EOF

echo "✅ Environment variables set"

# Test auto-deploy
echo "🧪 Testing auto-deploy system..."
npm run build:prod

# Upload initial version
echo "📤 Uploading initial version to S3..."
aws s3 sync dist/ s3://"$BUCKET_NAME"/ --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"

echo ""
echo "🎉 Auto-Deploy Setup Complete!"
echo "=============================="
echo ""
echo "Your website is now live at:"
echo "🌐 https://$DISTRIBUTION_ID.cloudfront.net"
echo ""
echo "To start auto-deploy (watches for file changes):"
echo "📝 npm run watch"
echo ""
echo "To deploy manually:"
echo "🚀 npm run deploy:aws"
echo ""
echo "To stop auto-deploy:"
echo "🛑 Press Ctrl+C"
echo ""
echo "Files being watched:"
echo "📁 src/**/*"
echo "📁 webpack.config.js"
echo "📁 package.json"
echo "📁 tsconfig.json"
echo ""
echo "Auto-deploy will trigger 5 seconds after any file change."
echo "=============================================="
