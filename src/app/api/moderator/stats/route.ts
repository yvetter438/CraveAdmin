import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const today = new Date().toISOString().split('T')[0];
    
    // Get pending posts count
    const { count: pendingPosts } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get total reports count
    const { count: totalReports } = await supabaseAdmin
      .from('reports')
      .select('*', { count: 'exact', head: true });

    // Get active users count (users who posted in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: activeUsers } = await supabaseAdmin
      .from('posts')
      .select('user', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())
      .eq('status', 'approved');

    // Get today's approved posts
    const { count: approvedToday } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`);

    // Get today's rejected posts
    const { count: rejectedToday } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'removed')
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lt('created_at', `${today}T23:59:59.999Z`);

    return NextResponse.json({
      pendingPosts: pendingPosts || 0,
      totalReports: totalReports || 0,
      activeUsers: activeUsers || 0,
      approvedToday: approvedToday || 0,
      rejectedToday: rejectedToday || 0,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
