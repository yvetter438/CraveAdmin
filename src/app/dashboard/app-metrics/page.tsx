'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  Star,
  Search,
  Calendar,
  Plus,
  Trash2,
  RefreshCw,
  MessageSquare,
  Trophy
} from 'lucide-react';

interface AppStoreMetric {
  id: number;
  date: string;
  keyword_ranking: number;
  review_count: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export default function AppMetricsPage() {
  const [metrics, setMetrics] = useState<AppStoreMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    keyword_ranking: '',
    review_count: '',
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/metrics/app-store');
      const data = await response.json();
      if (data.success) {
        setMetrics(data.metrics || []);
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/metrics/app-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date,
          keyword_ranking: parseInt(formData.keyword_ranking),
          review_count: parseInt(formData.review_count),
          notes: formData.notes || undefined
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setShowAddForm(false);
        setFormData({
          date: new Date().toISOString().split('T')[0],
          keyword_ranking: '',
          review_count: '',
          notes: ''
        });
        loadMetrics();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving metric:', error);
      alert('Failed to save metric');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this metric entry?')) return;

    try {
      const response = await fetch(`/api/metrics/app-store?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        loadMetrics();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting metric:', error);
      alert('Failed to delete metric');
    }
  };

  // Calculate stats
  const latestMetric = metrics[0];
  const previousMetric = metrics[1];
  const rankingChange = latestMetric && previousMetric 
    ? previousMetric.keyword_ranking - latestMetric.keyword_ranking 
    : 0;
  const reviewChange = latestMetric && previousMetric 
    ? latestMetric.review_count - previousMetric.review_count 
    : 0;

  // Get best ranking
  const bestRanking = metrics.length > 0 
    ? Math.min(...metrics.map(m => m.keyword_ranking))
    : 0;

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
              <h1 className="text-3xl font-bold text-gray-900">App Store Metrics</h1>
              <p className="mt-2 text-gray-600">
                Track your app's ranking and review count over time
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Entry</span>
              </button>
              
              <button
                onClick={loadMetrics}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle>Add New Metric Entry</CardTitle>
              <CardDescription>Record today's App Store ranking and review count</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keyword Ranking
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.keyword_ranking}
                      onChange={(e) => setFormData({ ...formData, keyword_ranking: e.target.value })}
                      placeholder="e.g., 16"
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.review_count}
                      onChange={(e) => setFormData({ ...formData, review_count: e.target.value })}
                      placeholder="e.g., 125"
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any observations or changes made today..."
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Entry'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Ranking</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{latestMetric?.keyword_ranking || '—'}</div>
              {rankingChange !== 0 && (
                <p className={`text-xs flex items-center ${rankingChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rankingChange > 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Up {rankingChange} positions
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Down {Math.abs(rankingChange)} positions
                    </>
                  )}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Review Count</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestMetric?.review_count || '—'}</div>
              {reviewChange !== 0 && (
                <p className={`text-xs ${reviewChange > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {reviewChange > 0 ? `+${reviewChange} new reviews` : 'No change'}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Ranking</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{bestRanking || '—'}</div>
              <p className="text-xs text-muted-foreground">
                All-time best
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.length}</div>
              <p className="text-xs text-muted-foreground">
                Days tracked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ranking Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Keyword Ranking Trend</CardTitle>
              <CardDescription>Lower is better</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {metrics.slice(0, 30).reverse().map((metric, index) => {
                  const maxRank = Math.max(...metrics.map(m => m.keyword_ranking));
                  const height = ((maxRank - metric.keyword_ranking + 1) / maxRank) * 100;
                  
                  return (
                    <div key={metric.id} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm transition-all hover:from-purple-700 hover:to-purple-500 cursor-pointer"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                        title={`${new Date(metric.date).toLocaleDateString()}: #${metric.keyword_ranking}`}
                      />
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                        #{metric.keyword_ranking}<br/>
                        {new Date(metric.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>{metrics[Math.min(29, metrics.length - 1)] ? new Date(metrics[Math.min(29, metrics.length - 1)].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                <span>{metrics[0] ? new Date(metrics[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
              </div>
            </CardContent>
          </Card>

          {/* Review Count Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Review Count Growth</CardTitle>
              <CardDescription>Total reviews over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {metrics.slice(0, 30).reverse().map((metric, index) => {
                  const maxReviews = Math.max(...metrics.map(m => m.review_count));
                  const height = (metric.review_count / maxReviews) * 100;
                  
                  return (
                    <div key={metric.id} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm transition-all hover:from-green-700 hover:to-green-500 cursor-pointer"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                        title={`${new Date(metric.date).toLocaleDateString()}: ${metric.review_count} reviews`}
                      />
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                        {metric.review_count} reviews<br/>
                        {new Date(metric.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>{metrics[Math.min(29, metrics.length - 1)] ? new Date(metrics[Math.min(29, metrics.length - 1)].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                <span>{metrics[0] ? new Date(metrics[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Data</CardTitle>
            <CardDescription>All recorded metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No data yet</h3>
                <p className="mt-1 text-sm text-gray-500">Add your first entry to start tracking</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Ranking</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reviews</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Change</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Notes</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {metrics.map((metric, index) => {
                      const prevMetric = metrics[index + 1];
                      const rankChange = prevMetric ? prevMetric.keyword_ranking - metric.keyword_ranking : 0;
                      const reviewChange = prevMetric ? metric.review_count - prevMetric.review_count : 0;
                      
                      return (
                        <tr key={metric.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {new Date(metric.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="font-semibold text-purple-700">#{metric.keyword_ranking}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {metric.review_count}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex flex-col space-y-1">
                              {rankChange !== 0 && (
                                <span className={`text-xs ${rankChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {rankChange > 0 ? `↑ ${rankChange}` : `↓ ${Math.abs(rankChange)}`} rank
                                </span>
                              )}
                              {reviewChange > 0 && (
                                <span className="text-xs text-blue-600">
                                  +{reviewChange} reviews
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                            {metric.notes || '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <button
                              onClick={() => handleDelete(metric.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete entry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

