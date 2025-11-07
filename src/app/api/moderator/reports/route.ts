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

    // Fetch related content for each report
    const transformedReports = await Promise.all(
      (reports || []).map(async (report) => {
        const baseReport = {
          id: report.id,
          target_type: report.target_type,
          target_id: report.target_id,
          reason: report.reason,
          description: report.description,
          status: report.status,
          created_at: report.created_at,
          reporter: {
            username: `user_${report.reporter_id}` || 'Unknown'
          },
          target_content: {} as any
        };

        // Fetch the actual content based on target_type
        if (report.target_type === 'post') {
          const { data: post } = await supabaseAdmin
            .from('posts')
            .select('id, description, video_url, user')
            .eq('id', report.target_id)
            .single();

          if (post) {
            baseReport.target_content.post = {
              id: post.id,
              description: post.description,
              video_url: post.video_url,
              user_id: post.user
            };
          }
        } else if (report.target_type === 'comment') {
          const { data: comment, error: commentError } = await supabaseAdmin
            .from('comments')
            .select('*')
            .eq('id', report.target_id)
            .single();

          if (commentError) {
            console.error(`Failed to fetch comment ${report.target_id}:`, commentError);
          }

          if (comment) {
            // Try different possible column names for comment text
            const commentText = comment.content || comment.text || comment.comment || comment.body || '(No comment text found)';
            
            baseReport.target_content.comment = {
              id: comment.id,
              content: commentText,
              post_id: comment.post_id || comment.post,
              user_id: comment.user_id || comment.user
            };
            
            console.log('Comment data:', comment); // Debug log
          }
        }

        return baseReport;
      })
    );

    return NextResponse.json({ reports: transformedReports });
  } catch (error) {
    console.error('Reports error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
