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

print("=== 날짜별 시도자 및 완료자 현황 ===\n")

try:
    # 세션 데이터 가져오기
    response = supabase.table('guide_sessions').select("*").execute()
    sessions = pd.DataFrame(response.data)
    
    # 한국 시간으로 변환
    sessions['created_at'] = pd.to_datetime(sessions['created_at'])
    sessions['date_kst'] = sessions['created_at'].dt.tz_convert('Asia/Seoul').dt.date
    
    # 날짜별 집계
    daily_stats = sessions.groupby('date_kst').agg({
        'session_id': 'count',
        'is_completed': 'sum'
    }).rename(columns={
        'session_id': '시도자',
        'is_completed': '완료자'
    })
    
    # 완료율 계산
    daily_stats['완료율(%)'] = (daily_stats['완료자'] / daily_stats['시도자'] * 100).round(1)
    
    # 최근 날짜순으로 정렬
    daily_stats = daily_stats.sort_index(ascending=False)
    
    print("날짜         시도자  완료자  완료율")
    print("-" * 40)
    
    # 전체 합계
    total_attempts = 0
    total_completions = 0
    
    for date, row in daily_stats.iterrows():
        print(f"{date}    {int(row['시도자']):4d}    {int(row['완료자']):3d}   {row['완료율(%)']:5.1f}%")
        total_attempts += row['시도자']
        total_completions += row['완료자']
    
    print("-" * 40)
    print(f"전체         {int(total_attempts):4d}    {int(total_completions):3d}   {(total_completions/total_attempts*100):5.1f}%")
    
    # 추가 분석: 주요 날짜 하이라이트
    print("\n\n주요 날짜 분석:")
    print("-" * 40)
    
    # 8월 1일 이전 (마이그레이션 데이터)
    pre_aug1 = daily_stats[daily_stats.index < pd.to_datetime('2025-08-01').date()]
    if len(pre_aug1) > 0:
        print(f"8월 1일 이전: 총 {pre_aug1['시도자'].sum()}명 시도, {pre_aug1['완료자'].sum()}명 완료")
    
    # 8월 1일 이후 (실제 라이브 데이터)
    post_aug1 = daily_stats[daily_stats.index >= pd.to_datetime('2025-08-01').date()]
    if len(post_aug1) > 0:
        print(f"8월 1일 이후: 총 {post_aug1['시도자'].sum()}명 시도, {post_aug1['완료자'].sum()}명 완료")
        print(f"8월 1일 이후 평균 완료율: {(post_aug1['완료자'].sum()/post_aug1['시도자'].sum()*100):.1f}%")
    
except Exception as e:
    import traceback
    print(f"오류 발생: {str(e)}")
    traceback.print_exc()