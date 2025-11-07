'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Settings, Shield, Key, Globe, Database, Bell, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function SettingsPage() {
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const handleTestNotification = async () => {
    if (!testEmail) {
      setTestStatus('error');
      setTestMessage('Please enter an email address');
      return;
    }

    setTestStatus('loading');
    try {
      const response = await fetch('/api/test-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'video', email: testEmail }),
      });

      const result = await response.json();
      
      if (result.success) {
        setTestStatus('success');
        setTestMessage('Test notification sent! Check your inbox.');
      } else {
        setTestStatus('error');
        setTestMessage(result.message || 'Failed to send notification');
      }
    } catch (error) {
      setTestStatus('error');
      setTestMessage('Failed to send test notification');
    }
  };
  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
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
                Placeholder Module - Non-Functional
              </p>
              <p className="text-sm text-yellow-700">
                This page is a placeholder. Settings functionality not yet implemented.
              </p>
            </div>
          </div>
        </div>

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
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg hover:border-purple-300 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900">Change Admin Password</h3>
                  <p className="text-sm text-gray-600">Update your admin dashboard password</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md cursor-not-allowed opacity-75">
                  Change Password
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900">Session Timeout</h3>
                  <p className="text-sm text-gray-600">Currently set to 7 days</p>
                </div>
                <button className="px-4 py-2 border-2 border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50 transition-colors shadow-sm cursor-not-allowed opacity-75">
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
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">Admin Password</h4>
                    <p className="text-xs text-gray-600">Set via ADMIN_PASSWORD</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-300">✓ Configured</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">App URL</h4>
                    <p className="text-xs text-gray-600">Set via NEXT_PUBLIC_APP_URL</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-300">✓ Configured</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">Supabase</h4>
                    <p className="text-xs text-gray-600">Database and authentication</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full border border-yellow-300">Optional</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">PostHog</h4>
                    <p className="text-xs text-gray-600">Analytics and event tracking</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full border border-yellow-300">Optional</span>
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
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-purple-900">Environment</h4>
                  <p className="text-sm text-purple-700 font-medium">Development</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-blue-900">Version</h4>
                  <p className="text-sm text-blue-700 font-medium">1.0.0</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-gray-900">Last Deployed</h4>
                  <p className="text-sm text-gray-700 font-medium">Never</p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-green-900">Status</h4>
                  <p className="text-sm text-green-700 font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Running
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications for video uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">Video Upload Alerts</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get instant email notifications when users upload new videos for moderation.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Test Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your-email@example.com"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-blue-200 rounded-md focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      
                      <button
                        onClick={handleTestNotification}
                        disabled={testStatus === 'loading'}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {testStatus === 'loading' ? 'Sending...' : 'Send Test Notification'}
                      </button>

                      {testStatus === 'success' && (
                        <div className="flex items-center space-x-2 text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">{testMessage}</span>
                        </div>
                      )}

                      {testStatus === 'error' && (
                        <div className="flex items-center space-x-2 text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
                          <XCircle className="h-4 w-4" />
                          <span className="text-sm">{testMessage}</span>
                        </div>
                      )}

                      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                        <p className="text-xs text-blue-800">
                          <strong>Setup Required:</strong> Configure RESEND_API_KEY and ADMIN_EMAIL in your environment variables. 
                          See <code className="bg-blue-100 px-1 rounded">NOTIFICATIONS_SETUP.md</code> for details.
                        </p>
                      </div>
                    </div>
                  </div>
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
                <button className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all hover:shadow-md cursor-not-allowed opacity-75">
                  <Database className="h-5 w-5 mr-2 text-blue-700" />
                  <span className="text-blue-900 font-medium">View Logs</span>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg hover:from-green-100 hover:to-green-200 hover:border-green-300 transition-all hover:shadow-md cursor-not-allowed opacity-75">
                  <Globe className="h-5 w-5 mr-2 text-green-700" />
                  <span className="text-green-900 font-medium">Deploy to Production</span>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 transition-all hover:shadow-md cursor-not-allowed opacity-75">
                  <Shield className="h-5 w-5 mr-2 text-purple-700" />
                  <span className="text-purple-900 font-medium">Security Audit</span>
                </button>
                
                <button className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg hover:from-orange-100 hover:to-orange-200 hover:border-orange-300 transition-all hover:shadow-md cursor-not-allowed opacity-75">
                  <Settings className="h-5 w-5 mr-2 text-orange-700" />
                  <span className="text-orange-900 font-medium">Export Data</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
