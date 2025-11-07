import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { commentId } = await request.json();

    console.log('Delete comment request:', { commentId });

    if (!commentId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Comment ID is required' 
      }, { status: 400 });
    }

    // First check if comment exists
    const { data: existingComment, error: fetchError } = await supabaseAdmin
      .from('comments')
      .select('id')
      .eq('id', commentId)
      .single();

    if (fetchError || !existingComment) {
      console.error('Comment not found:', { commentId, error: fetchError });
      return NextResponse.json({ 
        success: false, 
        message: `Comment not found (ID: ${commentId})` 
      }, { status: 404 });
    }

    // Delete the comment
    const { error: deleteError } = await supabaseAdmin
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      console.error('Comment deletion failed:', { commentId, error: deleteError.message });
      return NextResponse.json({ 
        success: false, 
        message: `Failed to delete comment: ${deleteError.message}` 
      }, { status: 500 });
    }

    console.log('Comment deleted successfully:', { commentId });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Comment deleted successfully' 
    });
  } catch (error) {
    console.error('Comment deletion error:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

