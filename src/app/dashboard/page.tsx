import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Video, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  ExternalLink,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  Database,
  Bug,
  DollarSign,
  Mail,
  Settings,
  FileText,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const services = [
    // Analytics & Monitoring
    {
      category: "Analytics & Monitoring",
      items: [
        { name: "PostHog", url: "https://app.posthog.com", icon: BarChart3, description: "User analytics & events" },
        { name: "Sentry", url: "https://sentry.io", icon: Bug, description: "Error monitoring" },
        { name: "Google Analytics", url: "https://analytics.google.com", icon: TrendingUp, description: "Website analytics" },
        { name: "Mixpanel", url: "https://mixpanel.com", icon: Activity, description: "Product analytics" },
        { name: "Amplitude", url: "https://amplitude.com", icon: Zap, description: "User behavior analytics" },
      ]
    },
    // Database & Backend
    {
      category: "Database & Backend",
      items: [
        { name: "Supabase", url: "https://supabase.com/dashboard", icon: Database, description: "Database & auth" },
        { name: "Vercel", url: "https://vercel.com/dashboard", icon: Globe, description: "Hosting & deployments" },
        { name: "Railway", url: "https://railway.app", icon: Settings, description: "Backend hosting" },
        { name: "PlanetScale", url: "https://planetscale.com", icon: Database, description: "Database hosting" },
      ]
    },
    // App Stores & Distribution
    {
      category: "App Stores & Distribution",
      items: [
        { name: "App Store Connect", url: "https://appstoreconnect.apple.com", icon: Smartphone, description: "iOS app management" },
        { name: "Google Play Console", url: "https://play.google.com/console", icon: Smartphone, description: "Android app management" },
        { name: "TestFlight", url: "https://testflight.apple.com", icon: Smartphone, description: "iOS beta testing" },
        { name: "Firebase Console", url: "https://console.firebase.google.com", icon: Zap, description: "Mobile app services" },
      ]
    },
    // Business & Marketing
    {
      category: "Business & Marketing",
      items: [
        { name: "Stripe Dashboard", url: "https://dashboard.stripe.com", icon: DollarSign, description: "Payments & billing" },
        { name: "RevenueCat", url: "https://app.revenuecat.com", icon: DollarSign, description: "Subscription management" },
        { name: "Mailchimp", url: "https://mailchimp.com", icon: Mail, description: "Email marketing" },
        { name: "ConvertKit", url: "https://convertkit.com", icon: Mail, description: "Email automation" },
        { name: "Notion", url: "https://notion.so", icon: FileText, description: "Documentation & planning" },
      ]
    },
    // Development & Tools
    {
      category: "Development & Tools",
      items: [
        { name: "GitHub", url: "https://github.com", icon: Settings, description: "Code repository" },
        { name: "Linear", url: "https://linear.app", icon: Settings, description: "Project management" },
        { name: "Figma", url: "https://figma.com", icon: Settings, description: "Design & prototyping" },
        { name: "Discord", url: "https://discord.com", icon: Users, description: "Team communication" },
        { name: "Slack", url: "https://slack.com", icon: Users, description: "Team collaboration" },
      ]
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crave Admin Hub</h1>
          <p className="mt-2 text-gray-600">
            Your central command center for managing Crave app and website.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos Pending</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Awaiting moderation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                +20.1% this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">App Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Live</div>
              <p className="text-xs text-muted-foreground">
                99.9% uptime
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,234</div>
              <p className="text-xs text-muted-foreground">
                +12.5% this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Service Links */}
        <div className="space-y-8">
          {services.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
                <CardDescription>
                  Quick access to your {category.category.toLowerCase()} tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.items.map((service, serviceIndex) => (
                    <a
                      key={serviceIndex}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <service.icon className="h-6 w-6 text-gray-500 group-hover:text-purple-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {service.description}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Website Embed Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Website Preview</CardTitle>
            <CardDescription>
              Quick preview of your main website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://cravesocial.app"
                className="w-full h-96"
                title="Crave Social Website"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
