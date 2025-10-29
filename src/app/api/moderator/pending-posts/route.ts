import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select(`
        id,
        created_at,
        description,
        video_url,
        status,
        user
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching pending posts:', error);
      return NextResponse.json({ message: 'Failed to fetch pending posts' }, { status: 500 });
    }

        // Transform the data to match our interface and generate signed URLs
        const transformedPosts = await Promise.all(
          (posts || []).map(async (post) => {
            // Generate signed URL for private video access
            const { data: signedUrlData } = await supabaseAdmin.storage
              .from('videos') // Replace 'videos' with your actual bucket name
              .createSignedUrl(post.video_url, 3600); // 1 hour expiry

            return {
              id: post.id,
              created_at: post.created_at,
              description: post.description,
              video_url: signedUrlData?.signedUrl || post.video_url, // Use signed URL or fallback
              status: post.status,
              user: {
                id: post.user,
                username: `user_${post.user}`,
                displayname: `User ${post.user}`
              },
              restaurant: undefined
            };
          })
        );

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error('Pending posts error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
