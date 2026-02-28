#!/bin/bash

echo "🚀 Deploying Sylo AI Backend to Cloudflare Workers"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if logged in
echo "📝 Checking Cloudflare login..."
wrangler whoami

if [ $? -ne 0 ]; then
    echo "🔐 Please login to Cloudflare..."
    wrangler login
fi

# Check if secrets are set
echo ""
echo "🔍 Checking secrets..."
wrangler secret list

echo ""
echo "⚠️  Make sure these secrets are set:"
echo "   - OPENROUTER_API_KEY"
echo "   - FIREBASE_API_KEY"
echo "   - FIREBASE_PROJECT_ID"
echo ""

read -p "Are all secrets configured? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Setting up secrets..."
    echo ""
    
    echo "Setting OPENROUTER_API_KEY..."
    echo "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" | wrangler secret put OPENROUTER_API_KEY
    
    echo ""
    echo "Please set FIREBASE_API_KEY:"
    wrangler secret put FIREBASE_API_KEY
    
    echo ""
    echo "Please set FIREBASE_PROJECT_ID:"
    wrangler secret put FIREBASE_PROJECT_ID
fi

# Deploy
echo ""
echo "🚀 Deploying to Cloudflare Workers..."
wrangler deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Copy the Worker URL from above"
    echo "   2. Update your frontend .env file:"
    echo "      REACT_APP_API_URL=<your-worker-url>"
    echo "   3. Restart your frontend: npm start"
    echo ""
else
    echo ""
    echo "❌ Deployment failed. Check the errors above."
    exit 1
fi
