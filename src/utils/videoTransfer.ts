import { getSupabaseAdmin } from '@/lib/supabase';

export async function transferVideoToPublicBucket(videoUrl: string, postId: number): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  
  // If already a public URL, return as-is
  if (videoUrl.startsWith('http')) {
    return videoUrl;
  }

  // Generate new filename for public bucket
  const fileName = videoUrl.split('/').pop() || `video_${postId}.mp4`;
  const newVideoPath = fileName;

  // Get signed URL from private bucket
  const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
    .from('videos')
    .createSignedUrl(videoUrl, 3600);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    throw new Error('Failed to get signed URL');
  }

  // Download video
  const response = await fetch(signedUrlData.signedUrl);
  if (!response.ok) {
    throw new Error('Failed to download video');
  }
  const videoBlob = await response.blob();

  // Upload to public bucket
  const { error: uploadError } = await supabaseAdmin.storage
    .from('posts-videos')
    .upload(newVideoPath, videoBlob, {
      contentType: 'video/mp4',
      upsert: false,
    });

  if (uploadError) {
    throw new Error('Failed to upload to public bucket');
  }

  // Get public URL
  const { data: publicUrlData } = supabaseAdmin.storage
    .from('posts-videos')
    .getPublicUrl(newVideoPath);

  return publicUrlData.publicUrl;
}
