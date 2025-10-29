'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Video, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Play,
  Flag,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { PendingPost, Report, ModerationStats, supabaseUrl } from '@/lib/supabase';

export default function ModerationPage() {
  const [stats, setStats] = useState<ModerationStats>({
    pendingPosts: 0,
    totalReports: 0,
    activeUsers: 0,
    approvedToday: 0,
    rejectedToday: 0
  });
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, postsRes, reportsRes] = await Promise.all([
        fetch('/api/moderator/stats'),
        fetch('/api/moderator/pending-posts'),
        fetch('/api/moderator/reports')
      ]);

      const [statsData, postsData, reportsData] = await Promise.all([
        statsRes.json(),
        postsRes.json(),
        reportsRes.json()
      ]);

      setStats(statsData);
      setPendingPosts(postsData.posts || []);
      setReports(reportsData.reports || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: number) => {
    if (!confirm('Are you sure you want to approve this post?')) return;
    
    setProcessingId(postId);
    try {
      const response = await fetch('/api/moderator/approve-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPendingPosts(prev => prev.filter(p => p.id !== postId));
        setStats(prev => ({ 
          ...prev, 
          pendingPosts: prev.pendingPosts - 1, 
          approvedToday: prev.approvedToday + 1 
        }));
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error approving post:', error);
      alert('Failed to approve post');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (postId: number) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;
    
    setProcessingId(postId);
    try {
      const response = await fetch('/api/moderator/reject-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, reason })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPendingPosts(prev => prev.filter(p => p.id !== postId));
        setStats(prev => ({ 
          ...prev, 
          pendingPosts: prev.pendingPosts - 1, 
          rejectedToday: prev.rejectedToday + 1 
        }));
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error rejecting post:', error);
      alert('Failed to reject post');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
              <p className="mt-2 text-gray-600">
                Review and approve user-generated content for your Crave platform.
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPosts}</div>
              <p className="text-xs text-muted-foreground">
                Videos waiting for approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <Flag className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
              <p className="text-xs text-muted-foreground">
                User reports
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <User className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedToday}</div>
              <p className="text-xs text-muted-foreground">
                Posts approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rejectedToday}</div>
              <p className="text-xs text-muted-foreground">
                Posts rejected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Posts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Review ({pendingPosts.length})</CardTitle>
            <CardDescription>
              Videos waiting for moderator approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingPosts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
                <p className="mt-1 text-sm text-gray-500">No pending posts to review.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="relative">
                      <div className="w-48 h-32 bg-black rounded-lg overflow-hidden">
                        <video
                          src={post.video_url}
                          className="w-full h-full object-cover"
                          controls
                          muted
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            @{post.user.username} ({post.user.displayname})
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleString()}
                          </p>
                          {post.restaurant && (
                            <p className="text-sm text-gray-600 mt-1">
                              📍 {post.restaurant.name}
                            </p>
                          )}
                          <p className="mt-2 text-sm text-gray-700">
                            {post.description || 'No description'}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex space-x-3 ml-4">
                          <button
                            onClick={() => handleApprove(post.id)}
                            disabled={processingId === post.id}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </button>
                          
                          <button
                            onClick={() => handleReject(post.id)}
                            disabled={processingId === post.id}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports ({reports.filter(r => r.status === 'pending').length})</CardTitle>
            <CardDescription>
              User reports that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reports.filter(r => r.status === 'pending').length === 0 ? (
              <div className="text-center py-12">
                <Flag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending reports</h3>
                <p className="mt-1 text-sm text-gray-500">All reports have been reviewed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.filter(r => r.status === 'pending').slice(0, 10).map((report) => (
                  <div key={report.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {report.reason.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">
                            {report.target_type} #{report.target_id}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          Reported by @{report.reporter.username}
                        </p>
                        {report.description && (
                          <p className="mt-1 text-sm text-gray-600">
                            "{report.description}"
                          </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(report.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}