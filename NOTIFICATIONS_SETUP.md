# Video Upload Notifications Setup Guide

This guide will help you set up real-time email notifications when users upload videos to your Crave platform.

## 📧 Overview

When a user uploads a video for moderation, you'll receive an instant email notification with:
- Post ID and User ID
- Video description
- Upload timestamp
- Direct link to the moderation dashboard

## 🚀 Setup Instructions

### 1. Install Resend Package

```bash
npm install resend
```

### 2. Get Your Resend API Key

1. Go to [Resend](https://resend.com/emails)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=notifications@yourdomain.com
ADMIN_EMAIL=your-email@example.com

# Optional: Webhook Security
WEBHOOK_SECRET=your_random_secret_here
```

**Important Notes:**
- `RESEND_FROM_EMAIL`: Must be a verified domain in Resend (or use their default for testing)
- `ADMIN_EMAIL`: Your email address where notifications will be sent
- `WEBHOOK_SECRET`: Random string for webhook security (optional but recommended)

### 4. Verify Domain in Resend (Production)

For production use:
1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain (e.g., `yourdomain.com`)
3. Add the DNS records they provide
4. Verify the domain
5. Update `RESEND_FROM_EMAIL` to use your domain

For testing, you can use Resend's default: `onboarding@resend.dev`

## 🧪 Testing Notifications

### Option 1: Use the Test Endpoint

```bash
curl -X POST http://localhost:3000/api/test-notification \
  -H "Content-Type: application/json" \
  -d '{"type": "test", "email": "your-email@example.com"}'
```

Or test a full video notification:

```bash
curl -X POST http://localhost:3000/api/test-notification \
  -H "Content-Type: application/json" \
  -d '{"type": "video", "email": "your-email@example.com"}'
```

### Option 2: Test from Settings Page

Go to your admin dashboard Settings page and use the notification test section (if implemented).

## 🔗 Integration Options

### Option A: Supabase Database Webhook (Recommended)

Set up a Supabase database webhook to trigger when new posts are created:

1. Go to your Supabase project → Database → Webhooks
2. Create a new webhook:
   - **Event**: `INSERT` on `posts` table
   - **URL**: `https://youradmin.com/api/webhooks/video-upload`
   - **Headers**: 
     ```
     x-webhook-secret: your_webhook_secret_here
     Content-Type: application/json
     ```
   - **Condition**: `status = 'pending'`

3. The webhook payload should include:
   ```json
   {
     "postId": 123,
     "userId": "user_abc",
     "description": "Video description",
     "videoUrl": "video_url",
     "createdAt": "2024-01-01T00:00:00Z"
   }
   ```

### Option B: Call from Your Mobile App/Backend

When a user uploads a video, make a POST request to your webhook:

```typescript
// In your mobile app or backend
const response = await fetch('https://youradmin.com/api/webhooks/video-upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-webhook-secret': 'your_webhook_secret_here',
  },
  body: JSON.stringify({
    postId: post.id,
    userId: user.id,
    description: post.description,
    videoUrl: post.video_url,
    createdAt: post.created_at,
  }),
});
```

### Option C: Supabase Edge Function

Create a Supabase Edge Function that triggers on database changes:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { record } = await req.json()
  
  // Only notify for pending posts
  if (record.status === 'pending') {
    await fetch('https://youradmin.com/api/webhooks/video-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': process.env.WEBHOOK_SECRET,
      },
      body: JSON.stringify({
        postId: record.id,
        userId: record.user,
        description: record.description,
        videoUrl: record.video_url,
        createdAt: record.created_at,
      }),
    })
  }
  
  return new Response('ok')
})
```

## 🔒 Security Best Practices

1. **Always use HTTPS** in production
2. **Set a strong WEBHOOK_SECRET** and verify it in the webhook handler
3. **Limit rate** of webhook calls to prevent abuse
4. **Validate payload** structure before processing
5. **Log webhook attempts** for debugging

## 📊 Monitoring

Check your Resend dashboard to monitor:
- Email delivery rates
- Bounce rates
- Open rates (if tracking enabled)
- Failed deliveries

## 🐛 Troubleshooting

### Emails not arriving?

1. Check your RESEND_API_KEY is correct
2. Verify ADMIN_EMAIL is set
3. Check Resend dashboard for errors
4. Look at your admin panel logs
5. Check spam folder

### Webhook not triggering?

1. Verify the webhook URL is correct
2. Check webhook secret matches
3. Test with curl command first
4. Check Supabase webhook logs
5. Verify the posts table has the correct trigger

### Getting "Resend not configured" error?

Make sure you've:
1. Installed the `resend` package
2. Added RESEND_API_KEY to .env.local
3. Restarted your dev server

## 📱 Mobile App Integration

If you're calling from a mobile app, make sure to:
1. Store the webhook URL in your app config
2. Include the webhook secret in secure storage
3. Handle network failures gracefully
4. Don't wait for the webhook response (make it async)

## 🎯 Next Steps

1. Set up your Resend account
2. Add environment variables
3. Test with the test endpoint
4. Integrate with your video upload flow
5. Monitor and adjust as needed

For more information, visit:
- [Resend Documentation](https://resend.com/docs)
- [Supabase Webhooks](https://supabase.com/docs/guides/database/webhooks)

