import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: reports, error } = await supabaseAdmin
      .from('reports')
      .select(`
        id,
        target_type,
        target_id,
        reason,
        description,
        status,
        created_at,
        reporter_id
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching reports:', error);
      return NextResponse.json({ message: 'Failed to fetch reports' }, { status: 500 });
    }

    // Transform the data
    const transformedReports = reports?.map(report => ({
      id: report.id,
      target_type: report.target_type,
      target_id: report.target_id,
      reason: report.reason,
      description: report.description,
      status: report.status,
      created_at: report.created_at,
      reporter: {
        username: `user_${report.reporter_id}` || 'Unknown'
      }
    })) || [];

    return NextResponse.json({ reports: transformedReports });
  } catch (error) {
    console.error('Reports error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
