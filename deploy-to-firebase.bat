@echo off
echo 🚀 Deploying Sylo AI to Firebase Hosting
echo.

echo 📦 Step 1: Building React app...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.

echo 🔥 Step 2: Deploying to Firebase...
call firebase deploy --only hosting

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Deployment successful!
    echo.
    echo 🎉 Your site is now live!
    echo.
    echo 📋 Next steps:
    echo    1. Visit your Firebase Console to see your live URL
    echo    2. Test your site thoroughly
    echo    3. Share with users!
    echo.
) else (
    echo.
    echo ❌ Deployment failed!
    echo.
    echo 💡 Try these solutions:
    echo    1. Run: firebase login --reauth
    echo    2. Check your internet connection
    echo    3. Verify Firebase project is set up
    echo.
)

pause
