import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { reportId, action } = await request.json();

    if (!reportId || !action) {
      return NextResponse.json({ 
        success: false, 
        message: 'Report ID and action are required' 
      }, { status: 400 });
    }

    if (!['dismiss', 'investigate'].includes(action)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Action must be either "dismiss" or "investigate"' 
      }, { status: 400 });
    }

    // Update report status
    const { error: updateError } = await supabaseAdmin
      .from('reports')
      .update({
        status: action === 'dismiss' ? 'dismissed' : 'resolved',
        resolved_at: new Date().toISOString(),
        resolved_action: action,
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to resolve report' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Report ${action === 'dismiss' ? 'dismissed' : 'resolved'} successfully` 
    });
  } catch (error) {
    console.error('Resolve report error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
