# OpenRouter Integration - Complete Guide

Your Sylo AI application now uses **OpenRouter** with the **Upstage Solar Pro 3** model (free tier).

## 🎯 What is OpenRouter?

OpenRouter is a unified API that provides access to multiple AI models from different providers:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini, PaLM)
- Meta (Llama)
- Mistral AI
- And many more!

**Benefits:**
- ✅ Single API for multiple models
- ✅ Free tier available (Solar Pro 3)
- ✅ No credit card required for free models
- ✅ Easy to switch between models
- ✅ Transparent pricing

## 🔑 Your API Key

```
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
```

**Model**: `upstage/solar-pro` (Solar Pro 3)
**Cost**: FREE with rate limits

## 📊 Current Configuration

### Backend (backend/src/index.js)

```javascript
const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://sylo-ai.com',
    'X-Title': 'Sylo AI'
  },
  body: JSON.stringify({
    model: 'upstage/solar-pro', // Solar Pro 3 (free)
    messages: conversationHistory,
    temperature: 0.7,
    max_tokens: 2000
  })
});
```

### Features:
- **Model**: Solar Pro 3 - High-quality responses
- **Max Tokens**: 2000 per response
- **Temperature**: 0.7 (balanced creativity)
- **Context**: Full conversation history

## 🔄 Switching Models

Want to try a different model? Update `backend/src/index.js`:

### Free Models

```javascript
// Llama 3.2 3B (Fast, good for simple tasks)
model: 'meta-llama/llama-3.2-3b-instruct:free'

// Gemma 2 9B (Google, balanced)
model: 'google/gemma-2-9b-it:free'

// Phi-3 Mini (Microsoft, efficient)
model: 'microsoft/phi-3-mini-128k-instruct:free'

// Current: Solar Pro 3 (Upstage, high quality)
model: 'upstage/solar-pro'
```

### Paid Models (Better Quality)

```javascript
// GPT-4 Turbo (OpenAI, best quality)
model: 'openai/gpt-4-turbo'

// Claude 3.5 Sonnet (Anthropic, excellent)
model: 'anthropic/claude-3.5-sonnet'

// Gemini Pro 1.5 (Google, multimodal)
model: 'google/gemini-pro-1.5'

// Llama 3.1 70B (Meta, powerful)
model: 'meta-llama/llama-3.1-70b-instruct'
```

After changing, redeploy:
```bash
cd backend
npm run deploy
```

## 📈 Monitor Usage

### OpenRouter Dashboard
Visit: https://openrouter.ai/activity

You can see:
- Total requests
- Tokens used
- Cost (if using paid models)
- Rate limit status

### Rate Limits (Free Tier)

Solar Pro 3 free tier limits:
- Requests per minute: ~20
- Requests per day: ~200
- If exceeded, wait a few minutes

## 💰 Pricing

### Free Models
- **Solar Pro 3**: $0 (with rate limits)
- **Llama 3.2 3B**: $0 (with rate limits)
- **Gemma 2 9B**: $0 (with rate limits)

### Paid Models (Examples)
- **GPT-4 Turbo**: ~$0.01 per 1K tokens
- **Claude 3.5 Sonnet**: ~$0.003 per 1K tokens
- **Gemini Pro 1.5**: ~$0.0005 per 1K tokens

**Typical chat message**: 100-500 tokens
**Cost per message** (GPT-4): $0.001-0.005

## 🎨 Model Comparison

| Model | Provider | Speed | Quality | Cost | Best For |
|-------|----------|-------|---------|------|----------|
| Solar Pro 3 | Upstage | ⚡⚡⚡ | ⭐⭐⭐⭐ | FREE | General chat |
| Llama 3.2 3B | Meta | ⚡⚡⚡⚡ | ⭐⭐⭐ | FREE | Quick responses |
| Gemma 2 9B | Google | ⚡⚡⚡ | ⭐⭐⭐⭐ | FREE | Balanced |
| GPT-4 Turbo | OpenAI | ⚡⚡ | ⭐⭐⭐⭐⭐ | $$$ | Complex tasks |
| Claude 3.5 | Anthropic | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | $$ | Long context |
| Gemini Pro 1.5 | Google | ⚡⚡⚡ | ⭐⭐⭐⭐ | $ | Multimodal |

## 🔧 Advanced Configuration

### Adjust Response Length

```javascript
max_tokens: 2000  // Current (balanced)
max_tokens: 500   // Shorter, faster
max_tokens: 4000  // Longer, detailed
```

### Adjust Creativity

```javascript
temperature: 0.7  // Current (balanced)
temperature: 0.3  // More focused, deterministic
temperature: 1.0  // More creative, varied
```

### Add System Prompt

```javascript
messages: [
  { 
    role: 'system', 
    content: 'You are Sylo AI, a helpful assistant.' 
  },
  ...conversationHistory,
  { role: 'user', content: message }
]
```

## 🚀 Deployment

### Set API Key

```bash
cd backend
wrangler secret put OPENROUTER_API_KEY
# Paste: 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
```

### Deploy

```bash
npm run deploy
```

Or use the deployment script:
```bash
# Windows
deploy.bat

# Mac/Linux
chmod +x deploy.sh
./deploy.sh
```

## 🐛 Troubleshooting

### "Rate limit exceeded"
- **Cause**: Too many requests to free tier
- **Solution**: Wait 1-2 minutes, or upgrade to paid model

### "Invalid API key"
- **Cause**: API key not set or incorrect
- **Solution**: 
  ```bash
  wrangler secret put OPENROUTER_API_KEY
  ```

### "Model not found"
- **Cause**: Model name incorrect
- **Solution**: Check model name at https://openrouter.ai/models

### Slow responses
- **Cause**: Model is processing
- **Solution**: Try a faster model like `llama-3.2-3b-instruct:free`

## 📚 Resources

- **OpenRouter Docs**: https://openrouter.ai/docs
- **Model List**: https://openrouter.ai/models
- **Usage Dashboard**: https://openrouter.ai/activity
- **API Reference**: https://openrouter.ai/docs/api-reference

## 🎯 Best Practices

1. **Start with free models** - Test your app before paying
2. **Monitor usage** - Check dashboard regularly
3. **Set rate limits** - Prevent abuse in production
4. **Cache responses** - Save common queries
5. **Handle errors** - Graceful fallbacks for rate limits
6. **Test models** - Try different models for your use case

## 🔐 Security

- ✅ API key stored as Cloudflare secret (not in code)
- ✅ HTTPS enforced
- ✅ CORS configured
- ✅ Token-based auth for users
- ✅ Rate limiting on free tier

## 🎉 You're All Set!

Your Sylo AI is now powered by OpenRouter with Solar Pro 3 (free). 

**Next steps:**
1. Deploy backend: `cd backend && npm run deploy`
2. Update frontend .env with Worker URL
3. Test the chat
4. Monitor usage at https://openrouter.ai/activity
5. Upgrade to paid models if needed

Enjoy building with AI! 🚀
