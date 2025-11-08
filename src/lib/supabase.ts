import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client for user operations (available on both client and server)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export the URL for building video URLs (available on both client and server)
export { supabaseUrl };

// Server-side only admin client
export function getSupabaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdmin can only be called on the server side');
  }
  
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Types for moderation data
export interface PendingPost {
  id: number;
  created_at: string;
  description: string;
  video_url: string;
  status: string;
  user: {
    id: string;
    username: string;
    displayname: string;
  };
  restaurant?: {
    name: string;
  };
}

export interface Report {
  id: number;
  target_type: 'post' | 'comment' | 'user';
  target_id: number;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
  reporter: {
    username: string;
  };
  target_content?: {
    post?: {
      id: number;
      description?: string;
      video_url?: string;
      user_id: string;
    };
    comment?: {
      id: number;
      content: string;
      post_id: number;
      user_id: string;
    };
  };
}

export interface ModerationStats {
  pendingPosts: number;
  totalReports: number;
  activeUsers: number;
  approvedToday: number;
  rejectedToday: number;
}
