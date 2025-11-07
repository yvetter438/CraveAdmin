import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
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
        {/* Dummy Module Indicator */}
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Crave Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 mr-3"
            />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Placeholder Module - Static Data Only
              </p>
              <p className="text-sm text-yellow-700">
                This page shows mock data. Real analytics integration pending.
              </p>
            </div>
          </div>
        </div>

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
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-dashed border-purple-200">
                <div className="text-center p-6">
                  <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-3" />
                  <p className="text-purple-700 font-medium mb-1">Analytics Chart Placeholder</p>
                  <p className="text-sm text-purple-600">Will be integrated with PostHog</p>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 hover:border-purple-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
                      <Video className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">Sunset Timelapse</h4>
                      <p className="text-xs text-gray-600">by john_doe</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-purple-700">12.5K views</div>
                    <div className="text-xs text-gray-600 flex items-center justify-end">
                      <Heart className="h-3 w-3 mr-1" />2.1K
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center mr-3">
                      <Video className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">Cooking Tutorial</h4>
                      <p className="text-xs text-gray-600">by chef_mike</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-700">8.7K views</div>
                    <div className="text-xs text-gray-600 flex items-center justify-end">
                      <Heart className="h-3 w-3 mr-1" />1.8K
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center mr-3">
                      <Video className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">Dance Challenge</h4>
                      <p className="text-xs text-gray-600">by dancer_sarah</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-700">6.2K views</div>
                    <div className="text-xs text-gray-600 flex items-center justify-end">
                      <Heart className="h-3 w-3 mr-1" />1.5K
                    </div>
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
