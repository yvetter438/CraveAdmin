import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  Video, 
  Eye, 
  Heart, 
  MessageCircle,
  BarChart3,
  Activity
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">
            Track user engagement, content performance, and platform metrics.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos Uploaded</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">
                +8.7% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly active users over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart will be integrated with PostHog</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                Top performing videos this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Sunset Timelapse</h4>
                    <p className="text-xs text-gray-500">by john_doe</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">12.5K views</div>
                    <div className="text-xs text-gray-500">2.1K likes</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Cooking Tutorial</h4>
                    <p className="text-xs text-gray-500">by chef_mike</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">8.7K views</div>
                    <div className="text-xs text-gray-500">1.8K likes</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Dance Challenge</h4>
                    <p className="text-xs text-gray-500">by dancer_sarah</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">6.2K views</div>
                    <div className="text-xs text-gray-500">1.5K likes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Likes</CardTitle>
              <CardDescription>Total likes across all content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45,678</div>
              <p className="text-sm text-green-600 mt-2">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                +12.3% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Comments</CardTitle>
              <CardDescription>Total comments across all content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,234</div>
              <p className="text-sm text-green-600 mt-2">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                +8.7% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shares</CardTitle>
              <CardDescription>Total shares across all content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3,456</div>
              <p className="text-sm text-green-600 mt-2">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                +15.2% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* PostHog Integration Notice */}
        <Card>
          <CardHeader>
            <CardTitle>PostHog Integration</CardTitle>
            <CardDescription>
              Connect your PostHog account for detailed analytics and user behavior tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-purple-900">PostHog Dashboard</h3>
                  <p className="text-sm text-purple-700">
                    Access detailed analytics, funnels, and user insights
                  </p>
                </div>
              </div>
              <a
                href="https://app.posthog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Open PostHog
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
