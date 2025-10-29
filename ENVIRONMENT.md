# Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Admin Dashboard Configuration
ADMIN_PASSWORD=your-secure-password-here  # REQUIRED - No default password for security
NEXT_PUBLIC_APP_URL=https://admin.cravesocial.app

# Supabase Configuration (REQUIRED for moderation features)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry Configuration
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# App Store Connect (for future integration)
APP_STORE_CONNECT_API_KEY=your-app-store-connect-api-key
APP_STORE_CONNECT_ISSUER_ID=your-app-store-connect-issuer-id
```

## Required for Basic Functionality
- `ADMIN_PASSWORD`: **REQUIRED** - Set a secure password for admin access (no default for security)
- `NEXT_PUBLIC_APP_URL`: Your app URL (use https://admin.cravesocial.app for production)

## Required for Moderation Features
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin operations)

## Optional Integrations
- PostHog: For analytics and event tracking
- Sentry: For error monitoring
- App Store Connect: For iOS app management

## Supabase Database Requirements

Your Supabase database should have the following tables for moderation to work:

- `posts` - User posts with status field
- `reports` - User reports
- `profiles` - User profiles
- `restaurants` - Restaurant data (optional)

The moderation system expects these fields:
- `posts.status` should be 'pending', 'approved', or 'removed'
- `posts.video_url` should contain the video URL
- `reports.status` should be 'pending', 'reviewed', 'resolved', or 'dismissed'
