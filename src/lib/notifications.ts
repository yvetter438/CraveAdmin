import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface VideoUploadNotification {
  postId: number;
  userId: string;
  description?: string;
  videoUrl: string;
  createdAt: string;
}

export async function sendVideoUploadNotification(data: VideoUploadNotification) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping notification');
    return { success: false, message: 'Resend not configured' };
  }

  if (!process.env.ADMIN_EMAIL) {
    console.warn('ADMIN_EMAIL not configured, skipping notification');
    return { success: false, message: 'Admin email not configured' };
  }

  try {
    const adminUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const moderationUrl = `${adminUrl}/dashboard/moderation`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Crave Admin <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: '🎥 New Video Upload Pending Review',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .video-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed; }
              .button { display: inline-block; background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
              .button:hover { background: #6d28d9; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎥 New Video Upload</h1>
                <p>A new video has been uploaded and is awaiting your approval</p>
              </div>
              <div class="content">
                <div class="video-info">
                  <p><strong>Post ID:</strong> #${data.postId}</p>
                  <p><strong>User ID:</strong> ${data.userId}</p>
                  <p><strong>Uploaded:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
                  ${data.description ? `<p><strong>Description:</strong> ${data.description}</p>` : ''}
                </div>
                
                <p>This video is now pending review in your moderation queue.</p>
                
                <a href="${moderationUrl}" class="button">
                  Review Now →
                </a>
                
                <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
                  Click the button above to go directly to your moderation dashboard and review this video.
                </p>
              </div>
              <div class="footer">
                <p>Crave Admin Dashboard</p>
                <p>You're receiving this because you're an admin moderator</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, message: 'Notification sent successfully' };
  } catch (error) {
    console.error('Failed to send notification:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// For testing purposes
export async function sendTestNotification(adminEmail: string) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Crave Admin <onboarding@resend.dev>',
      to: adminEmail,
      subject: '✅ Crave Admin Notifications Test',
      html: `
        <h1>✅ Success!</h1>
        <p>Your Crave Admin notification system is working correctly.</p>
        <p>You will now receive email alerts when users upload new videos for moderation.</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Test notification failed:', error);
    return { success: false, error };
  }
}

