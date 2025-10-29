# Dashboard Integration Guide

This guide shows you how to safely connect your external dashboards to your Crave admin panel.

## 🔐 Security Best Practices

### 1. **Environment Variables**
- Never commit API keys to your repository
- Use `.env.local` for local development
- Use Vercel environment variables for production
- Rotate keys regularly

### 2. **API Key Management**
- Use read-only API keys when possible
- Implement rate limiting
- Monitor API usage
- Use IP whitelisting if available

## 📊 PostHog Integration

### Setup
1. **Get your PostHog API key** from your PostHog dashboard
2. **Add to environment variables**:
```bash
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Implementation
The `PostHogWidget` component is already created. To connect real data:

1. **Install PostHog SDK**:
```bash
npm install posthog-js
```

2. **Update the widget** to use real API calls:
```typescript
// In PostHogWidget.tsx
const fetchMetrics = async () => {
  const response = await fetch(`https://app.posthog.com/api/projects/${PROJECT_ID}/insights/`, {
    headers: {
      'Authorization': `Bearer ${process.env.POSTHOG_API_KEY}`,
    },
  });
  const data = await response.json();
  setMetrics(data);
};
```

## 🐛 Sentry Integration

### Setup
1. **Get your Sentry DSN** from your Sentry project
2. **Add to environment variables**:
```bash
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

### Implementation
The `SentryWidget` component is ready. To connect real data:

1. **Install Sentry SDK**:
```bash
npm install @sentry/nextjs
```

2. **Update the widget** to use real API calls:
```typescript
// In SentryWidget.tsx
const fetchMetrics = async () => {
  const response = await fetch(`https://sentry.io/api/0/projects/${ORG}/${PROJECT}/issues/`, {
    headers: {
      'Authorization': `Bearer ${process.env.SENTRY_AUTH_TOKEN}`,
    },
  });
  const data = await response.json();
  setMetrics(data);
};
```

## 🗄️ Supabase Integration

### Setup
1. **Get your Supabase credentials** from your project dashboard
2. **Add to environment variables**:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Implementation
The `SupabaseWidget` component is ready. To connect real data:

1. **Install Supabase SDK**:
```bash
npm install @supabase/supabase-js
```

2. **Update the widget** to use real API calls:
```typescript
// In SupabaseWidget.tsx
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const fetchMetrics = async () => {
  const { data: users } = await supabase
    .from('users')
    .select('count', { count: 'exact' });
  
  setMetrics({
    totalUsers: users?.length || 0,
    // ... other metrics
  });
};
```

## 🍎 App Store Connect Integration

### Setup
1. **Create an App Store Connect API key**
2. **Add to environment variables**:
```bash
APP_STORE_CONNECT_API_KEY=your-api-key
APP_STORE_CONNECT_ISSUER_ID=your-issuer-id
```

### Implementation
For App Store Connect, you'll need to use their REST API:

```typescript
// Create a new component: AppStoreWidget.tsx
const fetchAppMetrics = async () => {
  const response = await fetch('https://api.appstoreconnect.apple.com/v1/apps', {
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setMetrics(data);
};
```

## 🔧 API Proxy Setup (Recommended)

For better security, create API proxy routes:

### 1. **Create API Routes**
```typescript
// src/app/api/posthog/route.ts
export async function GET() {
  const response = await fetch('https://app.posthog.com/api/...', {
    headers: {
      'Authorization': `Bearer ${process.env.POSTHOG_API_KEY}`,
    },
  });
  return Response.json(await response.json());
}
```

### 2. **Update Widgets**
```typescript
// In PostHogWidget.tsx
const fetchMetrics = async () => {
  const response = await fetch('/api/posthog');
  const data = await response.json();
  setMetrics(data);
};
```

## 🚀 Production Deployment

### Vercel Environment Variables
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Add all environment variables in the "Environment Variables" section
4. Redeploy your application

### Security Headers
The `vercel.json` file already includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📈 Monitoring & Alerts

### 1. **Set up monitoring** for:
- API rate limits
- Failed authentication attempts
- Unusual traffic patterns
- Error rates

### 2. **Create alerts** for:
- High error rates
- API failures
- Unauthorized access attempts
- Performance degradation

## 🔄 Next Steps

1. **Start with one integration** (recommend PostHog first)
2. **Test thoroughly** in development
3. **Monitor API usage** and costs
4. **Add more integrations** gradually
5. **Set up proper monitoring** and alerts

## 🆘 Troubleshooting

### Common Issues
- **CORS errors**: Use API proxy routes
- **Authentication failures**: Check API keys and permissions
- **Rate limiting**: Implement caching and request batching
- **Data not loading**: Check network requests in browser dev tools

### Debug Mode
Add debug logging to your widgets:
```typescript
console.log('Fetching metrics from:', apiUrl);
console.log('Response status:', response.status);
console.log('Response data:', data);
```

## 📚 Additional Resources

- [PostHog API Documentation](https://posthog.com/docs/api)
- [Sentry API Documentation](https://docs.sentry.io/api/)
- [Supabase API Documentation](https://supabase.com/docs/reference/api)
- [App Store Connect API Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
