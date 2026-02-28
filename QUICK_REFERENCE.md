# 🎯 Quick Reference Card

## 🔑 Your Credentials

### OpenRouter API Key (Already Set!)
```
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
```
**Model**: Solar Pro 3 (FREE)

### Firebase (You Need to Get)
- **API Key**: Get from Firebase Console > Project Settings
- **Project ID**: Get from Firebase Console > Project Settings

## ⚡ Quick Commands

### Deploy Backend
```bash
cd backend
deploy.bat          # Windows
./deploy.sh         # Mac/Linux
```

### Run Frontend
```bash
npm start
```

### View Logs
```bash
cd backend
wrangler tail
```

### Check Secrets
```bash
cd backend
wrangler secret list
```

### Redeploy Backend
```bash
cd backend
npm run deploy
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `START_HERE.md` | Setup guide |
| `QUICK_START.md` | 5-min quickstart |
| `backend/deploy.bat` | Deploy script (Windows) |
| `backend/src/index.js` | Backend API |
| `src/pages/ChatPage.js` | Chat interface |
| `.env` | Frontend config |

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Firebase Console | https://console.firebase.google.com/ |
| Cloudflare Dashboard | https://dash.cloudflare.com/ |
| OpenRouter Dashboard | https://openrouter.ai/activity |
| OpenRouter Models | https://openrouter.ai/models |

## 🐛 Quick Fixes

### "Failed to send message"
```bash
cd backend
wrangler secret list
wrangler tail
npm run deploy
```

### "Unauthorized"
- Log out and log back in
- Check Firebase API key

### History not saving
- Make sure you're logged in
- Check Firestore rules

### Backend not working
```bash
cd backend
wrangler whoami      # Check login
wrangler secret list # Check secrets
wrangler tail        # View logs
```

## 📊 Free Tier Limits

| Service | Limit |
|---------|-------|
| Cloudflare Workers | 100k requests/day |
| Firebase Reads | 50k/day |
| Firebase Writes | 20k/day |
| OpenRouter Solar Pro 3 | ~200 requests/day |

## 🎯 Setup Checklist

- [ ] Firebase project created
- [ ] Authentication enabled
- [ ] Firestore enabled
- [ ] Firestore rules set
- [ ] Backend deployed
- [ ] Secrets configured
- [ ] Frontend .env updated
- [ ] App tested locally

## 🚀 Deployment Flow

```
1. Setup Firebase
   ↓
2. Run deploy.bat/sh
   ↓
3. Copy Worker URL
   ↓
4. Update .env
   ↓
5. npm start
   ↓
6. Test & Deploy
```

## 💡 Pro Tips

- Use `wrangler tail` to debug
- Check OpenRouter usage regularly
- Set Firestore rules correctly
- Test with guest mode first
- Monitor free tier limits

## 📞 Get Help

1. `TROUBLESHOOTING.md`
2. `SETUP_GUIDE.md`
3. Browser console (F12)
4. Backend logs (`wrangler tail`)

## 🎉 Success Indicators

✅ Can send chat messages
✅ AI responds correctly
✅ Can signup/login
✅ History saves
✅ History loads
✅ Can click history items
✅ New chat works
✅ Guest mode works

---

**Need detailed help?** See `START_HERE.md`
