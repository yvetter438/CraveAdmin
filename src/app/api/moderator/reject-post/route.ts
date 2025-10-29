import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { postId, reason } = await request.json();

    if (!postId || !reason) {
      return NextResponse.json({ 
        success: false, 
        message: 'Post ID and reason are required' 
      }, { status: 400 });
    }

    // Get post details first
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('posts')
      .select('id, video_url, status')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ 
        success: false, 
        message: 'Post not found' 
      }, { status: 404 });
    }

    // Update post status to removed
    const { error: updateError } = await supabaseAdmin
      .from('posts')
      .update({
        status: 'removed'
      })
      .eq('id', postId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to reject post' 
      }, { status: 500 });
    }

    // Delete video from private bucket
    if (!post.video_url.startsWith('http')) {
      try {
        await supabaseAdmin.storage.from('videos').remove([post.video_url]);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
        // Don't fail the rejection if cleanup fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Post rejected successfully' 
    });
  } catch (error) {
    console.error('Reject post error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
