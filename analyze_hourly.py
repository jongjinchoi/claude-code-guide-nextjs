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

supabase: Client = create_client(url, key)

print("=== 8월 2일 시간대별 상세 분석 ===\n")

try:
    # 세션 데이터 가져오기
    response = supabase.table('guide_sessions').select("*").execute()
    sessions = pd.DataFrame(response.data)
    
    # 한국 시간으로 변환
    sessions['created_at'] = pd.to_datetime(sessions['created_at'])
    sessions['created_at_kst'] = sessions['created_at'].dt.tz_convert('Asia/Seoul')
    sessions['date_kst'] = sessions['created_at_kst'].dt.date
    sessions['hour_kst'] = sessions['created_at_kst'].dt.hour
    sessions['minute_kst'] = sessions['created_at_kst'].dt.minute
    
    # 8월 2일 데이터만 필터링
    aug2 = sessions[sessions['date_kst'].astype(str) == '2025-08-02'].copy()
    
    print("1. 8월 2일 시간대별 세부 현황")
    print("-" * 60)
    
    # 00:30 이전과 이후로 구분
    aug2['is_after_fix'] = (aug2['hour_kst'] > 0) | ((aug2['hour_kst'] == 0) & (aug2['minute_kst'] >= 30))
    
    before_fix = aug2[~aug2['is_after_fix']]
    after_fix = aug2[aug2['is_after_fix']]
    
    print(f"\n수정 전 (00:00 ~ 00:29):")
    print(f"  - 총 세션: {len(before_fix)}")
    print(f"  - 완료: {before_fix['is_completed'].sum()} ({before_fix['is_completed'].sum()/len(before_fix)*100:.1f}%)" if len(before_fix) > 0 else "  - 데이터 없음")
    
    print(f"\n수정 후 (00:30 ~ 23:59):")
    print(f"  - 총 세션: {len(after_fix)}")
    print(f"  - 완료: {after_fix['is_completed'].sum()} ({after_fix['is_completed'].sum()/len(after_fix)*100:.1f}%)" if len(after_fix) > 0 else "  - 데이터 없음")
    
    print("\n\n2. 시간대별 상세 분석")
    print("-" * 60)
    
    # 시간대별 그룹화
    hourly = aug2.groupby('hour_kst').agg({
        'session_id': 'count',
        'is_completed': ['sum', lambda x: (x.sum()/len(x)*100) if len(x) > 0 else 0],
        'highest_step_reached': ['mean', lambda x: (x == 6).sum()]
    }).round(1)
    
    hourly.columns = ['세션수', '완료수', '완료율(%)', '평균도달단계', '6단계도달']
    
    for hour in hourly.index:
        print(f"{hour:02d}시: 세션 {hourly.loc[hour, '세션수']:3.0f}, "
              f"완료 {hourly.loc[hour, '완료수']:2.0f} ({hourly.loc[hour, '완료율(%)']:5.1f}%), "
              f"평균 {hourly.loc[hour, '평균도달단계']:3.1f}단계, "
              f"6단계 도달 {hourly.loc[hour, '6단계도달']:2.0f}명")
    
    print("\n\n3. 최근 7일 추세")
    print("-" * 60)
    
    # 최근 7일 데이터
    recent_7days = sessions[sessions['date_kst'] >= pd.Timestamp.now().date() - pd.Timedelta(days=7)]
    daily_trend = recent_7days.groupby('date_kst').agg({
        'session_id': 'count',
        'is_completed': ['sum', lambda x: (x.sum()/len(x)*100) if len(x) > 0 else 0]
    })
    daily_trend.columns = ['세션수', '완료수', '완료율(%)']
    
    print(daily_trend.sort_index())
    
except Exception as e:
    import traceback
    print(f"오류 발생: {str(e)}")
    traceback.print_exc()