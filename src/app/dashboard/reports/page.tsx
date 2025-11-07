'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flag, 
  Video, 
  MessageCircle, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Trash2,
  Shield,
  Eye
} from 'lucide-react';

interface Report {
  id: number;
  target_type: 'post' | 'comment' | 'user';
  target_id: number;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  reporter: {
    username: string;
  };
  target_content?: {
    post?: {
      id: number;
      description?: string;
      video_url?: string;
      user_id: string;
    };
    comment?: {
      id: number;
      content: string;
      post_id: number;
      user_id: string;
    };
  };
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('pending');
  const [filterType, setFilterType] = useState<'all' | 'post' | 'comment' | 'user'>('all');
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [hideDeleted, setHideDeleted] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/moderator/reports');
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm('This will automatically dismiss all reports for deleted content. Continue?')) return;

    setIsCleaningUp(true);
    try {
      const response = await fetch('/api/moderator/cleanup-reports', {
        method: 'POST',
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        loadReports(); // Reload to see updated list
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error cleaning up reports:', error);
      alert('Failed to clean up reports');
    } finally {
      setIsCleaningUp(false);
    }
  };

  const handleDismissReport = async (reportId: number) => {
    setProcessingId(reportId);
    try {
      const response = await fetch('/api/moderator/resolve-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, action: 'dismiss' }),
      });

      const result = await response.json();
      
      if (result.success) {
        setReports(prev => prev.map(r => 
          r.id === reportId ? { ...r, status: 'dismissed' } : r
        ));
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error dismissing report:', error);
      alert('Failed to dismiss report');
    } finally {
      setProcessingId(null);
    }
  };

  const handleResolveReport = async (reportId: number, targetType: string, targetId: number) => {
    const action = targetType === 'post' ? 'remove video' : 'delete comment';
    if (!confirm(`Resolve this report by ${action}? This action cannot be undone.`)) return;

    setProcessingId(reportId);
    try {
      console.log('Resolving report:', { reportId, targetType, targetId });

      // Handle the content removal based on type
      if (targetType === 'post') {
        const removeResponse = await fetch('/api/moderator/reject-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: targetId, reason: 'Reported content - removed' }),
        });

        const result = await removeResponse.json();
        console.log('Remove post result:', result);

        if (!result.success) {
          alert(`Failed to remove post: ${result.message}`);
          return;
        }
      } else if (targetType === 'comment') {
        console.log('Deleting comment:', targetId);
        
        const deleteResponse = await fetch('/api/moderator/delete-comment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commentId: targetId }),
        });

        const result = await deleteResponse.json();
        console.log('Delete comment result:', result);

        if (!result.success) {
          alert(`Failed to delete comment: ${result.message}`);
          return;
        }
      }

      // Then resolve the report
      const resolveResponse = await fetch('/api/moderator/resolve-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, action: 'investigate' }),
      });

      const resolveResult = await resolveResponse.json();
      console.log('Resolve report result:', resolveResult);

      if (resolveResult.success) {
        setReports(prev => prev.map(r => 
          r.id === reportId ? { ...r, status: 'resolved' } : r
        ));
        alert('Report resolved and content removed successfully');
      } else {
        alert(`Failed to resolve report: ${resolveResult.message}`);
      }
    } catch (error) {
      console.error('Error resolving report:', error);
      alert(`Failed to resolve report: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.target_type === filterType;
    
    // Optionally hide reports where content is deleted
    const contentExists = (report.target_type === 'post' && report.target_content?.post) ||
                         (report.target_type === 'comment' && report.target_content?.comment) ||
                         report.target_type === 'user';
    
    const deletedFilter = hideDeleted ? contentExists : true;
    
    return statusMatch && typeMatch && deletedFilter;
  });

  const getReasonBadgeColor = (reason: string) => {
    const reasonColors: Record<string, string> = {
      spam: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      inappropriate: 'bg-red-100 text-red-800 border-red-300',
      harassment: 'bg-red-100 text-red-800 border-red-300',
      violence: 'bg-red-100 text-red-800 border-red-300',
      misinformation: 'bg-orange-100 text-orange-800 border-orange-300',
      copyright: 'bg-purple-100 text-purple-800 border-purple-300',
      other: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return reasonColors[reason] || reasonColors.other;
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; text: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', text: 'Pending Review', icon: AlertTriangle },
      resolved: { color: 'bg-green-100 text-green-800 border-green-300', text: 'Resolved', icon: CheckCircle },
      dismissed: { color: 'bg-gray-100 text-gray-800 border-gray-300', text: 'Dismissed', icon: XCircle },
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {badge.text}
      </span>
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Content Reports</h1>
              <p className="mt-2 text-gray-600">
                Review and manage user-reported content
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCleanup}
                disabled={isCleaningUp}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Dismiss all reports for deleted content"
              >
                <Trash2 className="h-4 w-4" />
                <span>{isCleaningUp ? 'Cleaning...' : 'Clean Up'}</span>
              </button>
              
              <button
                onClick={loadReports}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="post">Videos</option>
                  <option value="comment">Comments</option>
                  <option value="user">Users</option>
                </select>
              </div>

              <div className="flex items-end space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideDeleted}
                    onChange={(e) => setHideDeleted(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Hide deleted content</span>
                </label>
                
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredReports.length}</span> of <span className="font-semibold">{reports.length}</span> reports
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Shield className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filterStatus === 'pending' 
                      ? 'All caught up! No pending reports to review.' 
                      : 'No reports match your current filters.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {report.target_type === 'post' && <Video className="h-5 w-5 text-purple-600 mt-1" />}
                      {report.target_type === 'comment' && <MessageCircle className="h-5 w-5 text-blue-600 mt-1" />}
                      {report.target_type === 'user' && <User className="h-5 w-5 text-orange-600 mt-1" />}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {report.target_type} Report #{report.id}
                          </h3>
                          {getStatusBadge(report.status)}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                          <Flag className="h-4 w-4" />
                          <span>Reported by @{report.reporter.username}</span>
                          <span>•</span>
                          <span>{new Date(report.created_at).toLocaleString()}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getReasonBadgeColor(report.reason)}`}>
                              {report.reason.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>

                          {report.description && (
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                              "{report.description}"
                            </p>
                          )}

                          {/* Show content preview if available */}
                          {report.target_content?.post && (
                            <div className="mt-3 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                              <p className="text-xs font-semibold text-purple-900 mb-2 uppercase tracking-wide">Reported Video:</p>
                              <div className="bg-white p-3 rounded-md border border-purple-200 mb-2">
                                <p className="text-sm text-gray-900 font-medium">
                                  {report.target_content.post.description || '(No description provided)'}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-purple-600">
                                <span>Post ID: #{report.target_content.post.id}</span>
                                <span>•</span>
                                <span>User: {report.target_content.post.user_id}</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Show if post was deleted */}
                          {report.target_type === 'post' && !report.target_content?.post && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                              <p className="text-xs text-gray-600 italic">
                                ⚠️ Video has been deleted or not found (ID: #{report.target_id})
                              </p>
                            </div>
                          )}

                          {report.target_content?.comment && (
                            <div className="mt-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                              <p className="text-xs font-semibold text-blue-900 mb-2 uppercase tracking-wide">Reported Comment:</p>
                              <div className="bg-white p-3 rounded-md border border-blue-200 mb-2">
                                <p className="text-sm text-gray-900 font-medium">
                                  "{report.target_content.comment.content}"
                                </p>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-blue-600">
                                <span>Comment ID: #{report.target_content.comment.id}</span>
                                <span>•</span>
                                <span>Post ID: #{report.target_content.comment.post_id}</span>
                                <span>•</span>
                                <span>User: {report.target_content.comment.user_id}</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Show if comment was deleted */}
                          {report.target_type === 'comment' && !report.target_content?.comment && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                              <p className="text-xs text-gray-600 italic">
                                ⚠️ Comment has been deleted or not found (ID: #{report.target_id})
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {report.status === 'pending' && (
                      <div className="flex flex-col space-y-2 ml-4 min-w-[180px]">
                        <button
                          onClick={() => handleDismissReport(report.id)}
                          disabled={processingId === report.id}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-800 border-2 border-green-300 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Keep content, mark report as invalid"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-medium">Not {report.reason.replace('_', ' ')}</span>
                        </button>
                        
                        <button
                          onClick={() => handleResolveReport(report.id, report.target_type, report.target_id)}
                          disabled={processingId === report.id}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                          title={`Delete this ${report.target_type} and resolve report`}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="font-medium">
                            {report.target_type === 'post' ? 'Remove Video' : 
                             report.target_type === 'comment' ? 'Delete Comment' : 
                             'Remove Content'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

