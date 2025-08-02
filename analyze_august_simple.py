import os
from supabase import create_client, Client
from datetime import datetime
import pandas as pd
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv('.env.local')

# Supabase 클라이언트 생성
url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not url or not key:
    print("Supabase 환경 변수가 설정되지 않았습니다.")
    exit(1)

supabase: Client = create_client(url, key)

print("=== Claude Code Guide - 8월 1-2일 데이터 분석 ===\n")

try:
    # 세션 데이터 가져오기
    response = supabase.table('guide_sessions').select("*").execute()
    sessions = pd.DataFrame(response.data)
    
    # 한국 시간으로 변환
    sessions['created_at'] = pd.to_datetime(sessions['created_at'])
    sessions['date_kst'] = sessions['created_at'].dt.tz_convert('Asia/Seoul').dt.date
    
    # 8월 1-2일 필터링
    august_sessions = sessions[sessions['date_kst'].astype(str).isin(['2025-08-01', '2025-08-02'])]
    
    if len(august_sessions) == 0:
        print("8월 1-2일 데이터가 없습니다.")
        # 전체 날짜 확인
        print("\n사용 가능한 날짜:")
        print(sessions['date_kst'].value_counts().sort_index().tail(10))
        exit(0)
    
    print("1. 일별 기본 통계")
    print("-" * 60)
    
    for date in ['2025-08-01', '2025-08-02']:
        day_data = august_sessions[august_sessions['date_kst'].astype(str) == date]
        if len(day_data) > 0:
            total = len(day_data)
            completed = day_data['is_completed'].sum()
            completion_rate = (completed / total * 100)
            
            # 완료한 세션들의 평균 시간
            completed_sessions = day_data[day_data['is_completed'] == True]
            avg_time = completed_sessions['total_time_seconds'].mean() / 60 if len(completed_sessions) > 0 else 0
            
            # 6단계 분석
            step6 = day_data[day_data['highest_step_reached'] == 6]
            step6_total = len(step6)
            step6_completed = step6['is_completed'].sum() if len(step6) > 0 else 0
            step6_abandon_rate = ((step6_total - step6_completed) / step6_total * 100) if step6_total > 0 else 0
            
            print(f"\n{date}:")
            print(f"  - 총 세션: {total}")
            print(f"  - 완료: {completed} ({completion_rate:.1f}%)")
            print(f"  - 평균 완료 시간: {avg_time:.1f}분")
            print(f"  - 6단계 도달: {step6_total}명")
            print(f"  - 6단계 이탈률: {step6_abandon_rate:.1f}%")
    
    print("\n\n2. 시간대별 활동 (가장 활발한 시간)")
    print("-" * 60)
    
    august_sessions['hour_kst'] = august_sessions['created_at'].dt.tz_convert('Asia/Seoul').dt.hour
    hourly = august_sessions.groupby(['date_kst', 'hour_kst']).size().reset_index(name='count')
    hourly_sorted = hourly.sort_values('count', ascending=False).head(10)
    
    for idx, row in hourly_sorted.iterrows():
        print(f"{row['date_kst']} {row['hour_kst']:02d}시: {row['count']}명")
    
    print("\n\n3. OS별 성능")
    print("-" * 60)
    
    for date in ['2025-08-01', '2025-08-02']:
        day_data = august_sessions[august_sessions['date_kst'].astype(str) == date]
        if len(day_data) > 0:
            print(f"\n{date}:")
            os_stats = day_data.groupby('os').agg({
                'session_id': 'count',
                'is_completed': 'sum'
            })
            
            for os in os_stats.index:
                total = os_stats.loc[os, 'session_id']
                completed = os_stats.loc[os, 'is_completed']
                rate = (completed / total * 100)
                print(f"  - {os}: {total}명 시도, {completed}명 완료 ({rate:.1f}%)")
    
    print("\n\n4. 변화 분석")
    print("-" * 60)
    
    day1 = august_sessions[august_sessions['date_kst'].astype(str) == '2025-08-01']
    day2 = august_sessions[august_sessions['date_kst'].astype(str) == '2025-08-02']
    
    if len(day1) > 0 and len(day2) > 0:
        rate1 = (day1['is_completed'].sum() / len(day1) * 100)
        rate2 = (day2['is_completed'].sum() / len(day2) * 100)
        
        print(f"완료율 변화: {rate1:.1f}% → {rate2:.1f}% ({rate2-rate1:+.1f}%p)")
        
        # 6단계 이탈률 변화
        step6_day1 = day1[day1['highest_step_reached'] == 6]
        step6_day2 = day2[day2['highest_step_reached'] == 6]
        
        if len(step6_day1) > 0 and len(step6_day2) > 0:
            abandon1 = (len(step6_day1) - step6_day1['is_completed'].sum()) / len(step6_day1) * 100
            abandon2 = (len(step6_day2) - step6_day2['is_completed'].sum()) / len(step6_day2) * 100
            print(f"6단계 이탈률 변화: {abandon1:.1f}% → {abandon2:.1f}% ({abandon2-abandon1:+.1f}%p)")
    
except Exception as e:
    import traceback
    print(f"오류 발생: {str(e)}")
    traceback.print_exc()