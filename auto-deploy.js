#!/usr/bin/env node

/**
 * Auto-Deploy Script for Portfolio Website
 * Watches for file changes and automatically deploys to AWS
 */

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

class AutoDeployer {
    constructor() {
        this.isDeploying = false;
        this.deployQueue = [];
        this.watchPaths = [
            'src/**/*',
            'webpack.config.js',
            'package.json',
            'tsconfig.json'
        ];
        this.ignorePaths = [
            'node_modules/**',
            'dist/**',
            '.git/**',
            '*.log'
        ];
    }

    async start() {
        console.log('🚀 Starting Auto-Deploy System...');
        console.log('📁 Watching paths:', this.watchPaths);
        console.log('🚫 Ignoring paths:', this.ignorePaths);
        console.log('⏰ Auto-deploy will trigger 5 seconds after file changes');
        console.log('🛑 Press Ctrl+C to stop\n');

        // Initial build
        await this.build();

        // Watch for changes
        const watcher = chokidar.watch(this.watchPaths, {
            ignored: this.ignorePaths,
            persistent: true,
            ignoreInitial: true
        });

        watcher.on('change', (filePath) => {
            this.handleFileChange(filePath);
        });

        watcher.on('add', (filePath) => {
            this.handleFileChange(filePath);
        });

        watcher.on('unlink', (filePath) => {
            this.handleFileChange(filePath);
        });

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping auto-deploy...');
            watcher.close();
            process.exit(0);
        });
    }

    handleFileChange(filePath) {
        console.log(`📝 File changed: ${filePath}`);
        
        // Add to deploy queue
        this.deployQueue.push({
            file: filePath,
            timestamp: Date.now()
        });

        // Debounce deployment
        this.debounceDeploy();
    }

    debounceDeploy() {
        // Clear existing timeout
        if (this.deployTimeout) {
            clearTimeout(this.deployTimeout);
        }

        // Set new timeout
        this.deployTimeout = setTimeout(() => {
            this.deploy();
        }, 5000); // 5 second delay
    }

    async deploy() {
        if (this.isDeploying) {
            console.log('⏳ Deployment already in progress, queuing...');
            return;
        }

        this.isDeploying = true;
        const changes = this.deployQueue.length;
        this.deployQueue = [];

        try {
            console.log(`\n🔄 Deploying ${changes} file changes...`);
            
            // Build project
            await this.build();
            
            // Deploy to AWS
            await this.deployToAWS();
            
            console.log('✅ Deployment completed successfully!\n');
            
        } catch (error) {
            console.error('❌ Deployment failed:', error.message);
            console.log('🔄 Will retry on next file change\n');
        } finally {
            this.isDeploying = false;
        }
    }

    async build() {
        console.log('🏗️  Building project...');
        
        try {
            // Clean previous build
            execSync('npm run clean', { stdio: 'inherit' });
            
            // Build for production
            execSync('npm run build:prod', { stdio: 'inherit' });
            
            console.log('✅ Build completed');
            
        } catch (error) {
            throw new Error(`Build failed: ${error.message}`);
        }
    }

    async deployToAWS() {
        console.log('☁️  Deploying to AWS...');
        
        try {
            // Check if AWS CLI is configured
            try {
                execSync('aws sts get-caller-identity', { stdio: 'pipe' });
            } catch (error) {
                throw new Error('AWS CLI not configured. Please run "aws configure" first.');
            }

            // Get S3 bucket name from environment or CloudFormation
            const bucketName = process.env.S3_BUCKET_NAME || await this.getS3BucketName();
            if (!bucketName) {
                throw new Error('S3 bucket name not found. Please set S3_BUCKET_NAME environment variable.');
            }

            // Upload to S3
            console.log(`📤 Uploading to S3 bucket: ${bucketName}`);
            execSync(`aws s3 sync dist/ s3://${bucketName}/ --delete`, { stdio: 'inherit' });

            // Invalidate CloudFront
            const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID || await this.getCloudFrontDistributionId();
            if (distributionId) {
                console.log(`🔄 Invalidating CloudFront distribution: ${distributionId}`);
                execSync(`aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`, { stdio: 'inherit' });
            }

            console.log('✅ AWS deployment completed');
            
        } catch (error) {
            throw new Error(`AWS deployment failed: ${error.message}`);
        }
    }

    async getS3BucketName() {
        try {
            const output = execSync('aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue" --output text', { encoding: 'utf8' });
            return output.trim();
        } catch (error) {
            return null;
        }
    }

    async getCloudFrontDistributionId() {
        try {
            const output = execSync('aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue" --output text', { encoding: 'utf8' });
            return output.trim();
        } catch (error) {
            return null;
        }
    }
}

// Start auto-deployer
if (require.main === module) {
    const deployer = new AutoDeployer();
    deployer.start().catch(console.error);
}

module.exports = AutoDeployer;
