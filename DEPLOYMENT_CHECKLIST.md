# Deployment Checklist

Use this checklist to ensure everything is set up correctly before going live.

## ☑️ Pre-Deployment

### Firebase Setup
- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Firestore database created
- [ ] Firestore security rules configured
- [ ] Firebase API Key obtained
- [ ] Firebase Project ID obtained

### API Keys
- [ ] OpenAI API key obtained (or alternative AI API)
- [ ] API key has sufficient credits/quota
- [ ] API key tested and working

### Backend Setup
- [ ] Cloudflare account created
- [ ] Wrangler CLI installed (`npm install -g wrangler`)
- [ ] Logged into Cloudflare (`wrangler login`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Secrets configured:
  - [ ] `OPENAI_API_KEY` set
  - [ ] `FIREBASE_API_KEY` set
  - [ ] `FIREBASE_PROJECT_ID` set

### Frontend Setup
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file created
- [ ] `REACT_APP_API_URL` configured in `.env`

## ☑️ Testing

### Local Testing
- [ ] Backend runs locally (`cd backend && npm run dev`)
- [ ] Frontend runs locally (`npm start`)
- [ ] Can send chat messages
- [ ] AI responds correctly
- [ ] Signup works
- [ ] Login works
- [ ] History saves (when logged in)
- [ ] History loads correctly
- [ ] Can click history items to reload chats
- [ ] New chat button works
- [ ] Guest chat works (without login)

### Backend Testing
- [ ] Test `/api/chat` endpoint
- [ ] Test `/api/auth/signup` endpoint
- [ ] Test `/api/auth/login` endpoint
- [ ] Test `/api/history` endpoint (with auth)
- [ ] Test `/api/history/session` endpoint (with auth)
- [ ] CORS headers working correctly
- [ ] Error handling works properly

### Frontend Testing
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Responsive design works on mobile
- [ ] Auth modal opens/closes
- [ ] Form validation works
- [ ] Error messages display correctly
- [ ] Loading states work
- [ ] Chat input works
- [ ] Send button works
- [ ] Suggestions work

## ☑️ Deployment

### Backend Deployment
- [ ] Run `cd backend && npm run deploy`
- [ ] Deployment successful
- [ ] Worker URL obtained
- [ ] Test deployed endpoints with curl/Postman
- [ ] Check worker logs (`wrangler tail`)

### Frontend Deployment

#### Option A: Vercel
- [ ] Install Vercel CLI (`npm install -g vercel`)
- [ ] Run `vercel`
- [ ] Set environment variables in Vercel dashboard
- [ ] Deployment successful
- [ ] Test live site

#### Option B: Netlify
- [ ] Run `npm run build`
- [ ] Upload `build` folder to Netlify
- [ ] Set environment variables in Netlify dashboard
- [ ] Deployment successful
- [ ] Test live site

#### Option C: Cloudflare Pages
- [ ] Run `npm run build`
- [ ] Run `wrangler pages publish build`
- [ ] Set environment variables in Cloudflare dashboard
- [ ] Deployment successful
- [ ] Test live site

### Post-Deployment
- [ ] Update `.env` with production API URL
- [ ] Redeploy frontend if needed
- [ ] Update CORS headers in backend if needed
- [ ] Test all features on production
- [ ] Check browser console for errors
- [ ] Test on different devices
- [ ] Test on different browsers

## ☑️ Security

- [ ] Firebase security rules are restrictive
- [ ] API keys are stored as secrets (not in code)
- [ ] CORS is configured correctly
- [ ] HTTPS is enforced
- [ ] Token validation works
- [ ] Users can only access their own data
- [ ] Password requirements are enforced (min 6 chars)

## ☑️ Performance

- [ ] Page load time < 3 seconds
- [ ] Chat response time < 5 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] No memory leaks
- [ ] Mobile performance acceptable

## ☑️ Monitoring

- [ ] Set up error tracking (optional)
- [ ] Set up analytics (optional)
- [ ] Monitor Cloudflare Worker usage
- [ ] Monitor Firebase usage
- [ ] Monitor OpenAI API usage
- [ ] Set up billing alerts

## ☑️ Documentation

- [ ] README.md updated
- [ ] SETUP_GUIDE.md reviewed
- [ ] QUICK_START.md reviewed
- [ ] Environment variables documented
- [ ] API endpoints documented

## ☑️ Final Checks

- [ ] All features working in production
- [ ] No broken links
- [ ] All images loading
- [ ] Forms submitting correctly
- [ ] Error messages user-friendly
- [ ] Mobile experience smooth
- [ ] Desktop experience smooth
- [ ] Cross-browser compatibility verified

## 🚀 Launch

- [ ] Announce to users
- [ ] Share on social media
- [ ] Monitor for issues
- [ ] Respond to user feedback
- [ ] Plan next features

## 📊 Post-Launch Monitoring

### Daily
- [ ] Check error logs
- [ ] Monitor API usage
- [ ] Check user feedback

### Weekly
- [ ] Review analytics
- [ ] Check costs
- [ ] Plan improvements

### Monthly
- [ ] Review performance metrics
- [ ] Update dependencies
- [ ] Security audit
- [ ] Backup data

## 🆘 Rollback Plan

If something goes wrong:

1. **Backend Issues**
   ```bash
   cd backend
   wrangler rollback
   ```

2. **Frontend Issues**
   - Revert to previous deployment in hosting platform
   - Or redeploy previous version

3. **Database Issues**
   - Check Firestore rules
   - Verify data integrity
   - Restore from backup if needed

## 📞 Support Contacts

- Cloudflare Support: https://support.cloudflare.com/
- Firebase Support: https://firebase.google.com/support
- OpenAI Support: https://help.openai.com/

---

**Remember**: Test thoroughly before deploying to production!
