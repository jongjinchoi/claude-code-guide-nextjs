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

# 1. 일별 기본 통계
print("1. 일별 기본 통계")
print("-" * 50)

try:
    # 8월 1-2일 세션 데이터 가져오기
    response = supabase.table('guide_sessions').select("*").execute()
    sessions = pd.DataFrame(response.data)
    
    # 한국 시간으로 변환
    sessions['created_at'] = pd.to_datetime(sessions['created_at'])
    sessions['date_kst'] = sessions['created_at'].dt.tz_convert('Asia/Seoul').dt.date
    
    # 8월 1-2일 필터링 (2025년 8월 데이터)
    august_sessions = sessions[sessions['date_kst'].astype(str).isin(['2025-08-01', '2025-08-02'])]
    
    # 일별 통계 계산
    daily_stats = august_sessions.groupby('date_kst').agg({
        'session_id': 'count',
        'is_completed': ['sum', lambda x: (x.sum() / len(x) * 100).round(1)],
        'total_time_seconds': lambda x: (x[august_sessions['is_completed']].mean() / 60).round(1) if x[august_sessions['is_completed']].any() else 0
    })
    
    daily_stats.columns = ['총 세션', '완료 수', '완료율(%)', '평균 완료시간(분)']
    print(daily_stats)
    
    # 2. 단계별 이탈률 분석
    print("\n\n2. 8월 1일 vs 2일 - 6단계 분석")
    print("-" * 50)
    
    step6_analysis = august_sessions[august_sessions['highest_step_reached'] == 6].groupby(['date_kst', 'is_completed']).size().unstack(fill_value=0)
    step6_analysis['6단계 이탈률(%)'] = (step6_analysis[False] / (step6_analysis[False] + step6_analysis[True]) * 100).round(1)
    print(step6_analysis)
    
    # 3. 시간대별 패턴
    print("\n\n3. 시간대별 활동 패턴")
    print("-" * 50)
    
    august_sessions['hour_kst'] = august_sessions['created_at'].dt.tz_convert('Asia/Seoul').dt.hour
    hourly_pattern = august_sessions.groupby(['date_kst', 'hour_kst']).agg({
        'session_id': 'count',
        'is_completed': 'sum'
    })
    hourly_pattern.columns = ['세션 수', '완료 수']
    hourly_pattern['완료율(%)'] = (hourly_pattern['완료 수'] / hourly_pattern['세션 수'] * 100).round(1)
    
    # 가장 활발한 시간대 TOP 5
    top_hours = hourly_pattern.sort_values('세션 수', ascending=False).head(10)
    print("가장 활발한 시간대 TOP 10:")
    print(top_hours)
    
    # 4. OS별 성능
    print("\n\n4. OS별 성능 비교")
    print("-" * 50)
    
    os_performance = august_sessions.groupby(['date_kst', 'os']).agg({
        'session_id': 'count',
        'is_completed': ['sum', lambda x: (x.sum() / len(x) * 100).round(1)]
    })
    os_performance.columns = ['시도', '완료', '완료율(%)']
    print(os_performance)
    
    # 5. 전체 요약
    print("\n\n5. 전체 요약")
    print("-" * 50)
    
    aug1 = august_sessions[august_sessions['date_kst'].astype(str) == '2025-08-01']
    aug2 = august_sessions[august_sessions['date_kst'].astype(str) == '2025-08-02']
    
    print(f"8월 1일: 총 {len(aug1)}명 시작, {aug1['is_completed'].sum()}명 완료 ({(aug1['is_completed'].sum()/len(aug1)*100).round(1)}%)")
    print(f"8월 2일: 총 {len(aug2)}명 시작, {aug2['is_completed'].sum()}명 완료 ({(aug2['is_completed'].sum()/len(aug2)*100).round(1)}%)")
    
    # 6단계 이탈률 변화
    aug1_step6 = aug1[aug1['highest_step_reached'] == 6]
    aug2_step6 = aug2[aug2['highest_step_reached'] == 6]
    
    aug1_step6_abandon = len(aug1_step6[~aug1_step6['is_completed']]) / len(aug1_step6) * 100 if len(aug1_step6) > 0 else 0
    aug2_step6_abandon = len(aug2_step6[~aug2_step6['is_completed']]) / len(aug2_step6) * 100 if len(aug2_step6) > 0 else 0
    
    print(f"\n6단계 이탈률 변화:")
    print(f"8월 1일: {aug1_step6_abandon:.1f}%")
    print(f"8월 2일: {aug2_step6_abandon:.1f}%")
    print(f"개선: {(aug1_step6_abandon - aug2_step6_abandon):.1f}%p 감소")
    
except Exception as e:
    import traceback
    print(f"오류 발생: {str(e)}")
    print(f"오류 타입: {type(e)}")
    print("상세 오류:")
    traceback.print_exc()
    print("환경 변수를 확인해주세요:")
    print(f"NEXT_PUBLIC_SUPABASE_URL: {'설정됨' if url else '없음'}")
    print(f"NEXT_PUBLIC_SUPABASE_ANON_KEY: {'설정됨' if key else '없음'}")