import { NextRequest, NextResponse } from 'next/server';
import { sendVideoUploadNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify webhook secret for security
    const webhookSecret = request.headers.get('x-webhook-secret');
    if (process.env.WEBHOOK_SECRET && webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.postId || !data.userId) {
      return NextResponse.json({ 
        error: 'Missing required fields: postId and userId' 
      }, { status: 400 });
    }

    // Send notification
    const result = await sendVideoUploadNotification({
      postId: data.postId,
      userId: data.userId,
      description: data.description,
      videoUrl: data.videoUrl,
      createdAt: data.createdAt || new Date().toISOString(),
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Notification sent successfully' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

