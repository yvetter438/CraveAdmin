import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { transferVideoToPublicBucket } from '@/utils/videoTransfer';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ success: false, message: 'Post ID is required' }, { status: 400 });
    }

    // Get the post details
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

    if (post.status === 'approved') {
      return NextResponse.json({ 
        success: true, 
        message: 'Post is already approved' 
      });
    }

    // Transfer video to public bucket and get new URL
    const newVideoUrl = await transferVideoToPublicBucket(post.video_url, postId);

    // Update post with new URL and approved status
    const { error: updateError } = await supabaseAdmin
      .from('posts')
      .update({ 
        video_url: newVideoUrl,
        status: 'approved'
      })
      .eq('id', postId);

    if (updateError) {
      console.error('Post approval failed:', { postId, error: updateError.message });
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to update post status' 
      }, { status: 500 });
    }

    // Clean up private bucket
    if (!post.video_url.startsWith('http')) {
      try {
        await supabaseAdmin.storage.from('videos').remove([post.video_url]);
      } catch (cleanupError) {
        console.error('Video cleanup failed:', { postId, error: cleanupError instanceof Error ? cleanupError.message : 'Unknown error' });
        // Don't fail the approval if cleanup fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Post approved successfully' 
    });
  } catch (error) {
    console.error('Post approval error:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
