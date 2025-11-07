import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    // Get all pending reports
    const { data: reports, error: reportsError } = await supabaseAdmin
      .from('reports')
      .select('id, target_type, target_id, status')
      .eq('status', 'pending');

    if (reportsError) {
      console.error('Error fetching reports:', reportsError);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to fetch reports' 
      }, { status: 500 });
    }

    let dismissedCount = 0;
    const reportsToDismiss: number[] = [];

    // Check each report to see if the content still exists
    for (const report of reports || []) {
      let contentExists = true;

      if (report.target_type === 'post') {
        const { data: post, error } = await supabaseAdmin
          .from('posts')
          .select('id')
          .eq('id', report.target_id)
          .single();
        
        contentExists = !!post && !error;
      } else if (report.target_type === 'comment') {
        const { data: comment, error } = await supabaseAdmin
          .from('comments')
          .select('id')
          .eq('id', report.target_id)
          .single();
        
        contentExists = !!comment && !error;
      }

      // If content doesn't exist, mark report for dismissal
      if (!contentExists) {
        reportsToDismiss.push(report.id);
      }
    }

    // Dismiss all reports for deleted content
    if (reportsToDismiss.length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('reports')
        .update({ 
          status: 'dismissed',
          resolved_at: new Date().toISOString(),
          resolved_action: 'auto_cleanup'
        })
        .in('id', reportsToDismiss);

      if (updateError) {
        console.error('Error dismissing reports:', updateError);
        return NextResponse.json({ 
          success: false, 
          message: 'Failed to dismiss reports' 
        }, { status: 500 });
      }

      dismissedCount = reportsToDismiss.length;
    }

    console.log(`Cleaned up ${dismissedCount} reports for deleted content`);

    return NextResponse.json({ 
      success: true, 
      message: `Cleaned up ${dismissedCount} report${dismissedCount !== 1 ? 's' : ''} for deleted content`,
      dismissedCount 
    });
  } catch (error) {
    console.error('Cleanup reports error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

