import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Shield, Key, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your admin dashboard configuration and preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage authentication and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Change Admin Password</h3>
                  <p className="text-sm text-gray-500">Update your admin dashboard password</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                  Change Password
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">Session Timeout</h3>
                  <p className="text-sm text-gray-500">Currently set to 7 days</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  Configure
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Environment Configuration
              </CardTitle>
              <CardDescription>
                View and manage your environment variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Admin Password</h4>
                    <p className="text-xs text-gray-500">Set via ADMIN_PASSWORD</p>
                  </div>
                  <span className="text-xs text-green-600">✓ Configured</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">App URL</h4>
                    <p className="text-xs text-gray-500">Set via NEXT_PUBLIC_APP_URL</p>
                  </div>
                  <span className="text-xs text-green-600">✓ Configured</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Supabase</h4>
                    <p className="text-xs text-gray-500">Database and authentication</p>
                  </div>
                  <span className="text-xs text-yellow-600">Optional</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">PostHog</h4>
                    <p className="text-xs text-gray-500">Analytics and event tracking</p>
                  </div>
                  <span className="text-xs text-yellow-600">Optional</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deployment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Deployment Information
              </CardTitle>
              <CardDescription>
                Current deployment status and configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Environment</h4>
                  <p className="text-sm text-gray-600">Development</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Version</h4>
                  <p className="text-sm text-gray-600">1.0.0</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Last Deployed</h4>
                  <p className="text-sm text-gray-600">Never</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Status</h4>
                  <p className="text-sm text-green-600">Running</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Database className="h-5 w-5 mr-2" />
                  View Logs
                </button>
                
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Globe className="h-5 w-5 mr-2" />
                  Deploy to Production
                </button>
                
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Audit
                </button>
                
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-5 w-5 mr-2" />
                  Export Data
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
