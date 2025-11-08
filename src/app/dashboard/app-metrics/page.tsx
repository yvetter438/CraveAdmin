'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Search, Star, Trophy, MessageSquare } from 'lucide-react';

export default function AppMetricsPage() {
  // 🎯 HARDCODED DATA - Update these values manually as needed
  const currentMetrics = {
    date: '2025-11-08',
    ranking_with_ads: 16,
    ranking_without_ads: 15,
    reviews: 1,
    keyword: 'Crave'
  };

  // Historical data for trend charts (newest first)
  const historicalData = [
    { date: '2025-11-08', with_ads: 16, without_ads: 15, reviews: 247 },
    { date: '2025-11-01', with_ads: 18, without_ads: 17, reviews: 232 },
    { date: '2025-10-25', with_ads: 21, without_ads: 19, reviews: 215 },
    { date: '2025-10-18', with_ads: 24, without_ads: 22, reviews: 198 },
    { date: '2025-10-11', with_ads: 27, without_ads: 25, reviews: 183 },
    { date: '2025-10-04', with_ads: 30, without_ads: 28, reviews: 165 },
  ];

  // Calculate changes
  const prevData = historicalData[1];
  const rankingChangeWithAds = prevData ? prevData.with_ads - currentMetrics.ranking_with_ads : 0;
  const rankingChangeWithoutAds = prevData ? prevData.without_ads - currentMetrics.ranking_without_ads : 0;
  const reviewChange = prevData ? currentMetrics.reviews - prevData.reviews : 0;

  // Best rankings
  const bestWithAds = Math.min(...historicalData.map(d => d.with_ads));
  const bestWithoutAds = Math.min(...historicalData.map(d => d.without_ads));

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">App Store Metrics</h1>
          <p className="mt-2 text-gray-600">
            Tracking keyword ranking for "<strong>{currentMetrics.keyword}</strong>" in the Apple App Store
          </p>
          <p className="mt-1 text-sm text-gray-500">
            💡 To update: Edit the values in <code className="bg-gray-100 px-2 py-0.5 rounded">src/app/dashboard/app-metrics/page.tsx</code>
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ranking (With Ads)</CardTitle>
              <Search className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">#{currentMetrics.ranking_with_ads}</div>
              {rankingChangeWithAds !== 0 && (
                <p className={`text-sm flex items-center mt-2 ${rankingChangeWithAds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rankingChangeWithAds > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Up {rankingChangeWithAds} spots
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 mr-1" />
                      Down {Math.abs(rankingChangeWithAds)} spots
                    </>
                  )}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ranking (No Ads)</CardTitle>
              <Search className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">#{currentMetrics.ranking_without_ads}</div>
              {rankingChangeWithoutAds !== 0 && (
                <p className={`text-sm flex items-center mt-2 ${rankingChangeWithoutAds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {rankingChangeWithoutAds > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Up {rankingChangeWithoutAds} spots
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 mr-1" />
                      Down {Math.abs(rankingChangeWithoutAds)} spots
                    </>
                  )}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{currentMetrics.reviews}</div>
              {reviewChange > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  +{reviewChange} new reviews
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Rankings</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">#{bestWithAds} / #{bestWithoutAds}</div>
              <p className="text-xs text-gray-600 mt-2">
                All-time best (ads/no ads)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ranking Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Ranking Trend</CardTitle>
              <CardDescription>Lower is better</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {historicalData.slice().reverse().map((data, index) => {
                  const maxRank = Math.max(...historicalData.map(d => Math.max(d.with_ads, d.without_ads)));
                  const heightWithAds = ((maxRank - data.with_ads + 1) / maxRank) * 100;
                  const heightWithoutAds = ((maxRank - data.without_ads + 1) / maxRank) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex items-end justify-center space-x-1 group relative">
                      {/* With Ads */}
                      <div
                        className="w-1/2 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm hover:from-purple-700 hover:to-purple-500 cursor-pointer transition-all"
                        style={{ height: `${heightWithAds}%`, minHeight: '20px' }}
                        title={`With Ads: #${data.with_ads}`}
                      />
                      {/* Without Ads */}
                      <div
                        className="w-1/2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-700 hover:to-blue-500 cursor-pointer transition-all"
                        style={{ height: `${heightWithoutAds}%`, minHeight: '20px' }}
                        title={`No Ads: #${data.without_ads}`}
                      />
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity z-10">
                        <div>With Ads: #{data.with_ads}</div>
                        <div>No Ads: #{data.without_ads}</div>
                        <div className="text-gray-300">{new Date(data.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                <div>
                  <span>{new Date(historicalData[historicalData.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
                    <span>With Ads</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                    <span>No Ads</span>
                  </div>
                </div>
                <div>
                  <span>{new Date(historicalData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
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
                {historicalData.slice().reverse().map((data, index) => {
                  const maxReviews = Math.max(...historicalData.map(d => d.reviews));
                  const height = (data.reviews / maxReviews) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm hover:from-green-700 hover:to-green-500 cursor-pointer transition-all"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      />
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity z-10">
                        {data.reviews} reviews<br/>
                        {new Date(data.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>{new Date(historicalData[historicalData.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span>{new Date(historicalData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historical Data</CardTitle>
            <CardDescription>All recorded metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">With Ads</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">No Ads</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">Reviews</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {historicalData.map((data, index) => {
                    const prevData = historicalData[index + 1];
                    const rankChangeWithAds = prevData ? prevData.with_ads - data.with_ads : 0;
                    const rankChangeNoAds = prevData ? prevData.without_ads - data.without_ads : 0;
                    const revChange = prevData ? data.reviews - prevData.reviews : 0;
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(data.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className="font-semibold text-purple-700">#{data.with_ads}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className="font-semibold text-blue-700">#{data.without_ads}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">
                          {data.reviews}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col space-y-1">
                            {rankChangeWithAds !== 0 && (
                              <span className={`text-xs ${rankChangeWithAds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                Ads: {rankChangeWithAds > 0 ? `↑ ${rankChangeWithAds}` : `↓ ${Math.abs(rankChangeWithAds)}`}
                              </span>
                            )}
                            {rankChangeNoAds !== 0 && (
                              <span className={`text-xs ${rankChangeNoAds > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                No Ads: {rankChangeNoAds > 0 ? `↑ ${rankChangeNoAds}` : `↓ ${Math.abs(rankChangeNoAds)}`}
                              </span>
                            )}
                            {revChange > 0 && (
                              <span className="text-xs text-blue-600">
                                +{revChange} reviews
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
