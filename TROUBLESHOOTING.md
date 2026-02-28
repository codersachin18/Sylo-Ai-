# Troubleshooting Guide

Common issues and their solutions.

## 🔴 Backend Issues

### "Failed to send message" Error

**Symptoms**: Chat doesn't respond, error message appears

**Possible Causes**:
1. OpenRouter API key is invalid
2. Backend not deployed or URL incorrect
3. CORS issues
4. Rate limit exceeded (free tier)

**Solutions**:
```bash
# Check if secrets are set
cd backend
wrangler secret list

# Should show:
# - OPENROUTER_API_KEY
# - FIREBASE_API_KEY
# - FIREBASE_PROJECT_ID

# If missing, set them:
wrangler secret put OPENROUTER_API_KEY

# Check backend logs
wrangler tail

# Redeploy backend
npm run deploy

# Check OpenRouter usage
# Visit: https://openrouter.ai/activity
```

### "Unauthorized" Error

**Symptoms**: Can't access history, 401 errors

**Possible Causes**:
1. Token expired or invalid
2. Firebase API key incorrect
3. User not logged in

**Solutions**:
1. Log out and log back in
2. Clear localStorage and try again
3. Check Firebase API key is correct
4. Verify token in browser DevTools → Application → Local Storage

### Backend Not Deploying

**Symptoms**: `wrangler deploy` fails

**Solutions**:
```bash
# Make sure you're logged in
wrangler login

# Check wrangler.toml is correct
cat wrangler.toml

# Try deploying with verbose output
wrangler deploy --verbose

# Update wrangler
npm install -g wrangler@latest
```

## 🔴 Frontend Issues

### "Network Error" or "Failed to Fetch"

**Symptoms**: All API calls fail

**Possible Causes**:
1. Backend URL incorrect in .env
2. Backend not deployed
3. CORS issues

**Solutions**:
1. Check `.env` file has correct URL:
   ```
   REACT_APP_API_URL=https://your-worker.workers.dev
   ```
2. Restart development server after changing .env:
   ```bash
   npm start
   ```
3. Test backend URL directly in browser
4. Check browser console for CORS errors

### Auth Modal Not Working

**Symptoms**: Can't signup or login

**Possible Causes**:
1. Firebase not configured
2. Email/Password auth not enabled
3. Network issues

**Solutions**:
1. Check Firebase Console → Authentication → Sign-in method
2. Enable Email/Password provider
3. Check browser console for errors
4. Verify Firebase API key in backend secrets

### History Not Saving

**Symptoms**: Chat works but history doesn't persist

**Possible Causes**:
1. User not logged in
2. Firestore rules too restrictive
3. Firebase Project ID incorrect

**Solutions**:
1. Make sure you're logged in (check sidebar)
2. Check Firestore rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
         match /history/{sessionId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
   }
   ```
3. Verify Firebase Project ID in backend secrets
4. Check browser console for Firestore errors

### History Not Loading

**Symptoms**: Sidebar shows "No chat history yet" even after chatting

**Possible Causes**:
1. History not being saved
2. API call failing
3. Token issues

**Solutions**:
1. Check browser console for errors
2. Verify you're logged in
3. Check Network tab in DevTools for failed requests
4. Try logging out and back in
5. Clear localStorage and login again

## 🔴 Firebase Issues

### "Permission Denied" Errors

**Symptoms**: Can't read/write to Firestore

**Solutions**:
1. Check Firestore rules are set correctly
2. Verify user is authenticated
3. Check token is valid
4. Make sure userId matches in rules

### "Invalid API Key" Error

**Symptoms**: Authentication fails

**Solutions**:
1. Get correct API key from Firebase Console → Project Settings
2. Update backend secret:
   ```bash
   cd backend
   wrangler secret put FIREBASE_API_KEY
   ```
3. Redeploy backend

### "Project Not Found" Error

**Symptoms**: Firestore operations fail

**Solutions**:
1. Verify Project ID in Firebase Console
2. Update backend secret:
   ```bash
   cd backend
   wrangler secret put FIREBASE_PROJECT_ID
   ```
3. Redeploy backend

## 🔴 OpenRouter Issues

### "Rate Limit Exceeded" Error

**Symptoms**: Chat stops working after several messages

**Solutions**:
1. Check OpenRouter usage at https://openrouter.ai/activity
2. Free tier has rate limits - wait a few minutes
3. Consider upgrading to paid tier if needed
4. Switch to a different free model temporarily

### "Invalid API Key" Error

**Symptoms**: AI doesn't respond, authentication error

**Solutions**:
1. Verify API key is correct:
   ```
   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
   ```
2. Update backend secret:
   ```bash
   cd backend
   wrangler secret put OPENROUTER_API_KEY
   ```
3. Redeploy backend

### "Model Not Available" Error

**Symptoms**: Specific model doesn't work

**Solutions**:
1. Check model name in backend code (should be `upstage/solar-pro`)
2. Try alternative free models:
   - `meta-llama/llama-3.2-3b-instruct:free`
   - `google/gemma-2-9b-it:free`
3. See all models at https://openrouter.ai/models

## 🔴 Development Issues

### Changes Not Reflecting

**Symptoms**: Code changes don't appear

**Solutions**:
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart development server
3. Check if you're editing the right file
4. Make sure file is saved

### "Module Not Found" Errors

**Symptoms**: Import errors

**Solutions**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Symptoms**: Can't start development server

**Solutions**:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

## 🔴 Deployment Issues

### Frontend Build Fails

**Symptoms**: `npm run build` errors

**Solutions**:
1. Check for console errors
2. Fix any TypeScript/ESLint errors
3. Update dependencies:
   ```bash
   npm update
   ```
4. Clear cache and rebuild:
   ```bash
   rm -rf node_modules build
   npm install
   npm run build
   ```

### Backend Deployment Fails

**Symptoms**: `wrangler deploy` errors

**Solutions**:
1. Check wrangler.toml syntax
2. Verify you're logged in: `wrangler whoami`
3. Check Cloudflare account limits
4. Try deploying with verbose output:
   ```bash
   wrangler deploy --verbose
   ```

### CORS Errors in Production

**Symptoms**: API calls work locally but fail in production

**Solutions**:
1. Update CORS headers in backend to include production domain
2. Redeploy backend
3. Check browser console for specific CORS error
4. Verify frontend is using HTTPS

## 🔴 Performance Issues

### Slow Chat Responses

**Possible Causes**:
1. OpenAI API slow
2. Large conversation history
3. Network latency

**Solutions**:
1. Use faster model (gpt-3.5-turbo)
2. Limit conversation history sent to API
3. Add loading indicators
4. Implement streaming responses

### High Costs

**Symptoms**: Unexpected bills

**Solutions**:
1. Monitor usage in dashboards:
   - Cloudflare: Workers dashboard
   - Firebase: Usage tab
   - OpenAI: Usage page
2. Implement rate limiting
3. Add usage alerts
4. Optimize API calls
5. Cache responses when possible

## 🛠️ Debugging Tips

### Check Backend Logs

```bash
cd backend
wrangler tail
```

### Check Frontend Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Check Network tab for failed requests

### Test API Endpoints

```bash
# Test chat endpoint
curl -X POST https://your-worker.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","model":"Sylo Gen-6.7"}'

# Expected response with Solar Pro 3 model
```
curl -X GET https://your-worker.workers.dev/api/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Check Environment Variables

```bash
# Frontend
cat .env

# Backend secrets
cd backend
wrangler secret list
```

### Verify Firebase Setup

1. Go to Firebase Console
2. Check Authentication → Users (should see registered users)
3. Check Firestore → Data (should see users collection)
4. Check Rules (should allow authenticated access)

## 📞 Getting Help

If you're still stuck:

1. Check browser console for errors
2. Check backend logs: `wrangler tail`
3. Review [SETUP_GUIDE.md](SETUP_GUIDE.md)
4. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
5. Search for error message online
6. Check official documentation:
   - [Cloudflare Workers](https://developers.cloudflare.com/workers/)
   - [Firebase](https://firebase.google.com/docs)
   - [OpenRouter](https://openrouter.ai/docs)

## 🔍 Common Error Messages

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| "Failed to send message" | OpenRouter API issue | Check API key and rate limits |
| "Unauthorized" | Token invalid | Log out and log back in |
| "Permission denied" | Firestore rules | Update security rules |
| "Network error" | Backend URL wrong | Check .env file |
| "Invalid API key" | OpenRouter key wrong | Update backend secret |
| "Rate limit exceeded" | Too many requests | Wait or upgrade plan |
| "CORS error" | CORS not configured | Update backend CORS headers |

## ✅ Health Check

Run through this checklist:

- [ ] Backend deployed and accessible
- [ ] All secrets set in Cloudflare
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] Firestore rules configured
- [ ] Frontend .env has correct URL
- [ ] Can signup new user
- [ ] Can login existing user
- [ ] Can send chat messages
- [ ] Can see AI responses
- [ ] History saves (when logged in)
- [ ] History loads on page refresh
- [ ] Can click history items
- [ ] New chat button works

If all checked, your app is working correctly! 🎉
