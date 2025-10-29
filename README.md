# Crave Admin Dashboard

A comprehensive admin dashboard for managing your Crave iOS app and website. This dashboard provides a central hub for monitoring performance, moderating content, and accessing external tools.

## Features

### 🔐 Authentication
- Password-protected admin access
- Secure session management
- Automatic redirect to login for unauthorized access

### 📊 Dashboard Overview
- Real-time metrics and statistics
- System status monitoring
- Quick action buttons for common tasks
- External tool integration

### 🎯 Key Sections
- **Analytics**: PostHog integration for user behavior tracking
- **Moderation**: Video content approval system
- **Performance**: App and Supabase performance monitoring
- **Users**: User management and insights
- **Settings**: Configuration and preferences

### 🔗 External Integrations
- **PostHog**: Analytics and event tracking
- **Sentry**: Error monitoring and performance tracking
- **Supabase**: Database and authentication management
- **App Store Connect**: iOS app management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crave-admin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp ENVIRONMENT.md .env.local
# Edit .env.local with your actual values
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login
- The default admin password is set via the `ADMIN_PASSWORD` environment variable
- Set a secure password in your `.env.local` file

## Environment Variables

See [ENVIRONMENT.md](./ENVIRONMENT.md) for a complete list of required and optional environment variables.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy to `https://admin.cravesocial.app`

### Environment Variables for Production
```bash
ADMIN_PASSWORD=your-secure-production-password
NEXT_PUBLIC_APP_URL=https://admin.cravesocial.app
# ... other variables from ENVIRONMENT.md
```

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── auth.ts           # Authentication utilities
│   └── utils.ts          # General utilities
└── middleware.ts         # Route protection middleware
```

## Security Features

- Password-based authentication
- HTTP-only cookies for session management
- Middleware-based route protection
- Secure environment variable handling

## Customization

### Adding New Dashboard Sections
1. Create a new page in `src/app/dashboard/[section]/`
2. Add navigation item in `src/app/dashboard/layout.tsx`
3. Implement your section's functionality

### Integrating New External Tools
1. Add tool configuration to environment variables
2. Create integration components in `src/components/`
3. Add external links to the dashboard layout

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Supabase** - Database and authentication
- **PostHog** - Analytics
- **Sentry** - Error monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Private - All rights reserved