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
            console.log('Processing post:', post.id, 'video_url:', post.video_url);
            
            // Extract the file path from the video_url
            let filePath = post.video_url;
            
            // If it's a full URL, extract just the path part
            if (filePath.includes('storage/v1/object/public/videos/')) {
              filePath = filePath.split('storage/v1/object/public/videos/')[1];
            } else if (filePath.includes('videos/')) {
              filePath = filePath.split('videos/')[1];
            }
            
            console.log('Extracted file path:', filePath);
            
            // Generate signed URL for private video access
            const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
              .from('videos')
              .createSignedUrl(filePath, 3600); // 1 hour expiry

            if (signedUrlError) {
              console.error('Signed URL error for post', post.id, ':', signedUrlError);
            } else {
              console.log('Generated signed URL for post', post.id, ':', signedUrlData?.signedUrl);
            }

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
