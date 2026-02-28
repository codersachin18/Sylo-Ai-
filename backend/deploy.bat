@echo off
echo 🚀 Deploying Sylo AI Backend to Cloudflare Workers
echo.

REM Check if wrangler is installed
where wrangler >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Wrangler CLI not found. Installing...
    npm install -g wrangler
)

REM Check if logged in
echo 📝 Checking Cloudflare login...
wrangler whoami

if %ERRORLEVEL% NEQ 0 (
    echo 🔐 Please login to Cloudflare...
    wrangler login
)

REM Check secrets
echo.
echo 🔍 Checking secrets...
wrangler secret list

echo.
echo ⚠️  Make sure these secrets are set:
echo    - OPENROUTER_API_KEY
echo    - FIREBASE_API_KEY
echo    - FIREBASE_PROJECT_ID
echo.

set /p SECRETS_OK="Are all secrets configured? (y/n): "

if /i not "%SECRETS_OK%"=="y" (
    echo.
    echo Setting up secrets...
    echo.
    
    echo Setting OPENROUTER_API_KEY...
    echo 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 | wrangler secret put OPENROUTER_API_KEY
    
    echo.
    echo Please set FIREBASE_API_KEY:
    wrangler secret put FIREBASE_API_KEY
    
    echo.
    echo Please set FIREBASE_PROJECT_ID:
    wrangler secret put FIREBASE_PROJECT_ID
)

REM Deploy
echo.
echo 🚀 Deploying to Cloudflare Workers...
wrangler deploy

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Deployment successful!
    echo.
    echo 📋 Next steps:
    echo    1. Copy the Worker URL from above
    echo    2. Update your frontend .env file:
    echo       REACT_APP_API_URL=^<your-worker-url^>
    echo    3. Restart your frontend: npm start
    echo.
) else (
    echo.
    echo ❌ Deployment failed. Check the errors above.
    exit /b 1
)

pause
