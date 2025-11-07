import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

// GET - Fetch all app store metrics
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    const { data: metrics, error } = await supabaseAdmin
      .from('app_store_metrics')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching metrics:', error);
      return NextResponse.json({ 
        success: false,
        message: 'Failed to fetch metrics' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      metrics: metrics || [] 
    });
  } catch (error) {
    console.error('Metrics fetch error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// POST - Add new app store metric
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { date, keyword_ranking, review_count, notes } = await request.json();

    if (!date || !keyword_ranking || !review_count) {
      return NextResponse.json({ 
        success: false,
        message: 'Date, keyword ranking, and review count are required' 
      }, { status: 400 });
    }

    // Check if entry for this date already exists
    const { data: existing } = await supabaseAdmin
      .from('app_store_metrics')
      .select('id')
      .eq('date', date)
      .single();

    if (existing) {
      // Update existing entry
      const { error: updateError } = await supabaseAdmin
        .from('app_store_metrics')
        .update({
          keyword_ranking,
          review_count,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('date', date);

      if (updateError) {
        console.error('Error updating metric:', updateError);
        return NextResponse.json({ 
          success: false,
          message: 'Failed to update metric' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true,
        message: 'Metric updated successfully' 
      });
    } else {
      // Create new entry
      const { error: insertError } = await supabaseAdmin
        .from('app_store_metrics')
        .insert({
          date,
          keyword_ranking,
          review_count,
          notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Error creating metric:', insertError);
        return NextResponse.json({ 
          success: false,
          message: 'Failed to create metric' 
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true,
        message: 'Metric added successfully' 
      });
    }
  } catch (error) {
    console.error('Metric creation error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// DELETE - Remove a metric
export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        success: false,
        message: 'Metric ID is required' 
      }, { status: 400 });
    }

    const { error: deleteError } = await supabaseAdmin
      .from('app_store_metrics')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting metric:', deleteError);
      return NextResponse.json({ 
        success: false,
        message: 'Failed to delete metric' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Metric deleted successfully' 
    });
  } catch (error) {
    console.error('Metric deletion error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

