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
    // 오늘 날짜 (YYYYMMDD 형식)
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    // 마지막 리셋 날짜 확인
    const { data: resetData, error: resetError } = await supabase
      .from('counters')
      .select('value')
      .eq('name', 'visitors_today_last_reset')
      .single();
      
    if (resetError) throw resetError;
    
    const lastReset = resetData?.value || '0';
    
    // 날짜가 바뀌었으면 오늘 카운터 리셋
    if (lastReset !== today) {
      // visitors_today를 0으로 리셋
      await supabase
        .from('counters')
        .update({ value: 0, updated_at: new Date().toISOString() })
        .eq('name', 'visitors_today');
        
      // last_reset 날짜 업데이트
      await supabase
        .from('counters')
        .update({ value: today, updated_at: new Date().toISOString() })
        .eq('name', 'visitors_today_last_reset');
    }
    
    // 전체 방문자 증가
    const { data: totalData, error: totalError } = await supabase
      .rpc('increment_counter', { counter_name: 'visitors' });
      
    if (totalError) throw totalError;
    
    // 오늘 방문자 증가
    await supabase
      .rpc('increment_counter', { counter_name: 'visitors_today' });
    
    return NextResponse.json({ count: totalData });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 });
  }
}