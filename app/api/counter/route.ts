import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('counters')
      .select('value')
      .eq('name', 'visitors')
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ count: data?.value || 0 });
  } catch (error) {
    console.error('Error fetching counter:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const { data, error } = await supabase
      .rpc('increment_counter', { counter_name: 'visitors' });
      
    if (error) throw error;
    
    return NextResponse.json({ count: data });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 });
  }
}