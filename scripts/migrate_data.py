#!/usr/bin/env python3
"""
기존 CSV 데이터를 새로운 Supabase 테이블 구조로 마이그레이션하는 스크립트
"""

import pandas as pd
import json
from datetime import datetime
from collections import defaultdict
from urllib.parse import urlparse

def extract_path(url_or_path):
    """URL에서 경로만 추출 (50자 제한)"""
    if not url_or_path:
        return '/guide'
    
    # URL인 경우 경로만 추출
    if url_or_path.startswith('http'):
        parsed = urlparse(url_or_path)
        path = parsed.path
        # 쿼리 파라미터가 있으면 축약
        if parsed.query:
            # 중요한 파라미터만 유지
            if 'current=' in parsed.query:
                current = parsed.query.split('current=')[1].split('&')[0]
                path = f"{path}?current={current}"
        return path[:50]  # 50자로 제한
    else:
        return url_or_path[:50]  # 50자로 제한

def process_csv_to_sessions(csv_path):
    """CSV 파일을 읽어서 guide_sessions 테이블 형식으로 변환"""
    
    # CSV 읽기
    df = pd.read_csv(csv_path)
    
    # guide 관련 이벤트만 필터링
    guide_df = df[df['event_category'] == 'guide'].copy()
    
    # 세션별로 그룹화
    sessions = {}
    
    for session_id, group in guide_df.groupby('session_id'):
        session = {
            'session_id': session_id,
            'os': normalize_os(group.iloc[0]['os']),
            'browser': group.iloc[0]['browser'],
            'device_category': group.iloc[0]['device_category'],
            'user_fingerprint': group.iloc[0]['user_id'],  # user_id를 fingerprint로 사용
            'device_type': group.iloc[0]['device_category'] if pd.notna(group.iloc[0]['device_category']) else 'Unknown',
            'referrer_source': group.iloc[0]['referrer_source'] if pd.notna(group.iloc[0]['referrer_source']) else 'direct',
            # landing_page는 50자 제한이 있으므로 URL을 경로만 추출
            'landing_page': extract_path(group.iloc[0]['page_path']) if pd.notna(group.iloc[0]['page_path']) else '/guide'
        }
        
        # 시작 시간
        started_events = group[group['event_name'] == 'guide_started']
        if not started_events.empty:
            session['started_at'] = started_events.iloc[0]['timestamp']
        else:
            session['started_at'] = group.iloc[0]['timestamp']
        
        # 완료 여부 및 시간
        completed_events = group[group['event_name'] == 'guide_completed']
        session['is_completed'] = not completed_events.empty
        if session['is_completed']:
            session['completed_at'] = completed_events.iloc[0]['timestamp']
            total_time = completed_events.iloc[0]['total_time_minutes']
            # CSV에는 분 단위로 저장되어 있으므로 초로 변환
            session['total_time_seconds'] = (total_time * 60) if pd.notna(total_time) else 0
        
        # 최고 도달 단계
        step_completed = group[group['event_name'] == 'step_completed']
        if not step_completed.empty:
            session['highest_step_reached'] = int(step_completed['guide_step_number'].max())
            session['current_step'] = session['highest_step_reached']
        else:
            session['highest_step_reached'] = 0
            session['current_step'] = 0
        
        # 단계별 소요 시간 (빈 객체로 초기화)
        session['step_times'] = {}
        
        # 에러 정보 (빈 배열로 초기화)
        session['errors'] = []
        
        sessions[session_id] = session
    
    return list(sessions.values())

def process_csv_to_feedback(csv_path):
    """CSV 파일을 읽어서 user_feedback 테이블 형식으로 변환"""
    
    df = pd.read_csv(csv_path)
    
    # feedback 관련 이벤트만 필터링 (0점은 버그로 간주하여 제외)
    feedback_df = df[
        (df['event_category'] == 'feedback') & 
        (df['event_name'] == 'feedback_submitted') &
        (df['feedback_score'].notna())
    ].copy()
    
    # 0점 제외
    feedback_df = feedback_df[feedback_df['feedback_score'] != 0]
    
    feedbacks = []
    
    for _, row in feedback_df.iterrows():
        score = int(row['feedback_score'])
        
        feedback = {
            'session_id': row['session_id'],
            'feedback_score': score,
            'feedback_text': row['feedback_text'] if pd.notna(row['feedback_text']) else None,
            'emoji': score_to_emoji(score),
            'completion_time_minutes': int(row['total_time_minutes']) if pd.notna(row['total_time_minutes']) else 0,
            'page_path': extract_path(row['page_path']) if pd.notna(row['page_path']) else '/guide',
            'timestamp': row['timestamp']
        }
        
        feedbacks.append(feedback)
    
    return feedbacks

def normalize_os(os_string):
    """OS 문자열을 정규화"""
    os_lower = str(os_string).lower()
    
    if os_lower in ['macos', 'mac']:
        return 'mac'
    elif os_lower == 'windows':
        return 'windows'
    elif os_lower == 'linux':
        return 'linux'
    else:
        return 'unknown'

def score_to_emoji(score):
    """점수를 이모지로 변환"""
    if score >= 4:
        return 'good'
    elif score == 3:
        return 'neutral'
    else:
        return 'bad'

def generate_sql_inserts(sessions, feedbacks):
    """SQL INSERT 문 생성"""
    
    print("-- Guide Sessions 데이터 삽입")
    print("-- 총 {} 개의 세션".format(len(sessions)))
    
    for session in sessions:
        print(f"""
INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '{session['session_id']}',
    '{session['user_fingerprint']}',
    '{session['started_at']}',
    '{session.get('completed_at', session['started_at'])}',  -- last_activity_at
    {f"'{session['completed_at']}'" if session.get('completed_at') else 'NULL'},
    {session.get('current_step', 0)},
    {session.get('highest_step_reached', 0)},
    {str(session.get('is_completed', False)).lower()},
    '{session['os']}',
    '{session['browser']}',
    '{session['device_type']}',
    '{session['referrer_source']}',
    '{session['landing_page']}',
    {session.get('total_time_seconds', 0)},
    '{json.dumps(session.get('step_times', {}))}',
    '{json.dumps(session.get('errors', []))}'
) ON CONFLICT (session_id) DO NOTHING;
""")
    
    print("\n\n-- User Feedback 데이터 삽입")
    print("-- 총 {} 개의 피드백".format(len(feedbacks)))
    
    for feedback in feedbacks:
        feedback_text = feedback['feedback_text'].replace("'", "''") if feedback['feedback_text'] else ''
        
        print(f"""
INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    '{feedback['session_id']}',
    {feedback['feedback_score']},
    {f"'{feedback_text}'" if feedback_text else 'NULL'},
    '{feedback['emoji']}',
    {feedback['completion_time_minutes']},
    '{feedback['page_path']}',
    '{feedback['timestamp']}'
);
""")

def main():
    csv_path = "/Users/jongjinchoi/Downloads/raw_events_rows.csv"
    
    print("-- Claude Code Guide 데이터 마이그레이션")
    print("-- 생성일:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print("-- 원본 파일:", csv_path)
    print()
    
    # 데이터 처리
    sessions = process_csv_to_sessions(csv_path)
    feedbacks = process_csv_to_feedback(csv_path)
    
    # 통계 출력
    print(f"-- 통계:")
    print(f"-- - 총 세션 수: {len(sessions)}")
    print(f"-- - 완료된 세션: {sum(1 for s in sessions if s.get('is_completed', False))}")
    print(f"-- - 피드백 수: {len(feedbacks)}")
    print()
    
    # SQL 생성
    generate_sql_inserts(sessions, feedbacks)
    
    # 카운터 업데이트 (방문자 수는 유지)
    print("\n\n-- 카운터는 기존 값 유지")
    print("-- counters 테이블의 visitors 값은 변경하지 않음")

if __name__ == "__main__":
    main()