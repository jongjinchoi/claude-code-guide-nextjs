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
      // visitors_today 리셋과 last_reset 업데이트를 병렬 실행
      await Promise.all([
        supabase
          .from('counters')
          .update({ value: 0, updated_at: new Date().toISOString() })
          .eq('name', 'visitors_today'),
        supabase
          .from('counters')
          .update({ value: today, updated_at: new Date().toISOString() })
          .eq('name', 'visitors_today_last_reset')
      ]);
    }

    // 전체 방문자와 오늘 방문자 증가를 병렬 실행
    const [{ data: totalData, error: totalError }] = await Promise.all([
      supabase.rpc('increment_counter', { counter_name: 'visitors' }),
      supabase.rpc('increment_counter', { counter_name: 'visitors_today' })
    ]);

    if (totalError) throw totalError;
    
    return NextResponse.json({ count: totalData });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json({ error: 'Failed to increment counter' }, { status: 500 });
  }
}