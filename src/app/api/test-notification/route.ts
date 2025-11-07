import { NextRequest, NextResponse } from 'next/server';
import { sendTestNotification, sendVideoUploadNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const { type, email } = await request.json();

    if (!email) {
      return NextResponse.json({ 
        error: 'Email address is required' 
      }, { status: 400 });
    }

    if (type === 'test') {
      // Send simple test email
      const result = await sendTestNotification(email);
      return NextResponse.json(result);
    } else {
      // Send sample video upload notification
      const result = await sendVideoUploadNotification({
        postId: 12345,
        userId: 'user_test_123',
        description: 'This is a test video upload notification',
        videoUrl: 'https://example.com/test-video.mp4',
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Test notification error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

