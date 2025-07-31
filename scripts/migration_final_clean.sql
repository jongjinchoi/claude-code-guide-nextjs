-- Claude Code Guide 데이터 마이그레이션
-- 생성일: 2025-08-01 02:42:07
-- 원본 파일: /Users/jongjinchoi/Downloads/raw_events_rows.csv

-- 통계:
-- - 총 세션 수: 368
-- - 완료된 세션: 81
-- - 피드백 수: 5

-- Guide Sessions 데이터 삽입
-- 총 368 개의 세션

INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753243178304-lf3ctibjq',
    'user_1752730637360_3i9bc1iya',
    '2025-07-23 21:59:38+09',
    '2025-07-23 21:59:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Unknown',
    'other',
    '/guide',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753243312996-n8hrum5ee',
    'user_1753242661673_clikhfrnies_rwozoz',
    '2025-07-23 22:01:52+09',
    '2025-07-23 22:23:47+09',  -- last_activity_at
    '2025-07-23 22:23:47+09',
    0,
    0,
    true,
    'mac',
    'Unknown',
    'Unknown',
    'other',
    '/guide',
    1320.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753257903638-az2ag0257',
    'user_1753257903636_gbat8t22qfg_gq4dd2',
    '2025-07-24 02:05:03+09',
    '2025-07-24 02:05:03+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Unknown',
    'Unknown',
    'other',
    '/guide',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753269163293-fc8rhuof9',
    'user_1753253390520_y9o8c6bz3zj_djleqw',
    '2025-07-23 20:27:53.321+09',
    '2025-07-23 20:27:53.321+09',  -- last_activity_at
    '2025-07-23 20:27:53.321+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753272761908-jl9kwzz9p',
    'user_1753246265904_6vbbloscs1j_d0oadd',
    '2025-07-23 21:17:29.617+09',
    '2025-07-23 21:17:29.617+09',  -- last_activity_at
    '2025-07-23 21:17:29.617+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    300.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753274552834-4h2c20zeq',
    'user_1753274552796_husa2csktki_mu5vgx',
    '2025-07-23 21:42:32.835+09',
    '2025-07-23 21:42:32.835+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753279212117-9a1ve0mu8',
    'user_1753279212113_7gk6h87ej3g_a4i4ce',
    '2025-07-23 23:00:12.117+09',
    '2025-07-23 23:00:12.117+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753279862947-1uhh2tqt1',
    'user_1753242661673_clikhfrnies_rwozoz',
    '2025-07-23 23:11:02.947+09',
    '2025-07-23 23:11:02.947+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753305937212-ay1rqw4kw',
    'user_1753305937209_c2b4u0qdcfq_1svizb',
    '2025-07-24 06:25:37.216+09',
    '2025-07-24 06:42:29.062+09',  -- last_activity_at
    '2025-07-24 06:42:29.062+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    1020.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753319125087-f3urf0b8i',
    'user_1753319125085_riasb25jsbe_hcrpeo',
    '2025-07-24 10:05:25.092+09',
    '2025-07-24 10:05:25.092+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    '1753319141910-pkwfsx8ud',
    'user_1753319141901_efdiq822apd_yq6h10',
    '2025-07-24 10:05:41.91+09',
    '2025-07-24 10:05:41.91+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752799008057_epfi3x76g',
    'user_1752743392546_mp7owvxlc',
    '2025-07-18 18:36:55+09',
    '2025-07-18 18:37:06+09',  -- last_activity_at
    '2025-07-18 18:37:06+09',
    6,
    6,
    true,
    'mac',
    'Chrome',
    'Unknown',
    'Direct',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752802470409_dcjkqq87y',
    'user_1752802426202_jj8lhny7n',
    '2025-07-18 19:34:31+09',
    '2025-07-18 19:34:31+09',  -- last_activity_at
    NULL,
    5,
    5,
    false,
    'mac',
    'Chrome',
    'Unknown',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752804035665_hcwlehhb3',
    'user_1752804019174_o3naer9ve',
    '2025-07-18 20:00:37+09',
    '2025-07-18 20:00:37+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Unknown',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752804514087_mxp3mcbx4',
    'user_1752804488477_lekkjwh1a',
    '2025-07-18 20:08:39+09',
    '2025-07-18 20:08:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Unknown',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752805147955_vugpgds38',
    'user_1752801951160_0wmbe4rnw',
    '2025-07-18 20:19:09+09',
    '2025-07-18 20:19:09+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Unknown',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752805797548_g8v330jmuwv',
    'user_1752743392546_mp7owvxlc',
    '2025-07-18 20:29:59+09',
    '2025-07-18 20:29:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752807139237_vxrt74p65hi',
    'user_1752807134361_3936d4coddt_gq4dd2',
    '2025-07-18 20:52:19+09',
    '2025-07-18 20:52:49+09',  -- last_activity_at
    '2025-07-18 20:52:49+09',
    6,
    6,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752807140363_n7ut3rmwris',
    'user_1752807140363_qh3k0f4jb6p_j7a2i8',
    '2025-07-18 20:52:27+09',
    '2025-07-18 20:52:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'google',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752807381872_tnezqnvj1de',
    'user_1752743392546_mp7owvxlc',
    '2025-07-18 20:56:30+09',
    '2025-07-18 20:56:30+09',  -- last_activity_at
    NULL,
    1,
    1,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752808684056_o8gmo0yr8b',
    'user_1752808665984_g51xqif98j_tfjqz1',
    '2025-07-18 21:18:05+09',
    '2025-07-18 21:18:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752809409846_s3fdgn28yp',
    'user_1752809362194_ehcfm7cuqlq_czy51k',
    '2025-07-18 21:30:11+09',
    '2025-07-18 21:30:11+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752809418238_e606cq7jyyb',
    'user_1752809418238_t728n3rm5i_yvr22o',
    '2025-07-18 21:30:25+09',
    '2025-07-18 21:30:25+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'google',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752811362819_wqei0hkp68',
    'user_1752811354999_5r6xw3n32p4_gc3ajt',
    '2025-07-18 22:02:39+09',
    '2025-07-18 22:02:39+09',  -- last_activity_at
    NULL,
    2,
    2,
    false,
    'windows',
    'Firefox',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752811911559_dhnwwa2mytm',
    'user_1752811907599_8wrhoqxbv56_o2ygvy',
    '2025-07-18 22:11:53+09',
    '2025-07-18 22:11:53+09',  -- last_activity_at
    NULL,
    4,
    4,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752811928546_mj210gy957',
    'user_1752811912162_zlnumw765cp_80qm9g',
    '2025-07-18 22:12:10+09',
    '2025-07-18 22:12:10+09',  -- last_activity_at
    NULL,
    1,
    1,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752813452131_qfjy2b7l8vd',
    'user_1752811354999_5r6xw3n32p4_gc3ajt',
    '2025-07-18 22:37:28+09',
    '2025-07-18 22:37:28+09',  -- last_activity_at
    NULL,
    4,
    4,
    false,
    'windows',
    'Firefox',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752815067775_iqeuniscasq',
    'user_1752815041686_j3rkgqpy3hf_149q7i',
    '2025-07-18 23:04:28+09',
    '2025-07-18 23:04:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752816894698_7cn88yulo2t',
    'user_1752816894699_sqncq4r4wg9_qsabhp',
    '2025-07-18 23:34:55+09',
    '2025-07-18 23:34:55+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'Direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752816907701_duoqtk7wzru',
    'user_1752816894699_sqncq4r4wg9_qsabhp',
    '2025-07-18 23:50:52+09',
    '2025-07-18 23:50:52+09',  -- last_activity_at
    NULL,
    4,
    4,
    false,
    'mac',
    'Safari',
    'Desktop',
    'Direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752829059506_s59cwkml6dq',
    'user_1752829053413_1p8nrmfrpw3_karzi6',
    '2025-07-19 02:57:40+09',
    '2025-07-19 02:57:40+09',  -- last_activity_at
    NULL,
    5,
    5,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752830939319_4p8x56yiinj',
    'user_1752830929184_oz3d6mg0t2f_j7a2i8',
    '2025-07-19 03:28:59+09',
    '2025-07-19 03:28:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752832934196_iiwdfz0dkw',
    'user_1752832856230_yyhx3l5soc_y6xjyb',
    '2025-07-19 04:02:14+09',
    '2025-07-19 04:02:14+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752838059576_gttbdm0u2bs',
    'user_1752835538821_nrtbbute69_d0oadd',
    '2025-07-19 05:27:40+09',
    '2025-07-19 05:27:40+09',  -- last_activity_at
    NULL,
    1,
    1,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752838687512_dggfqjcxu0v',
    'user_1752838684748_0nv9s2pb7zom_17li3i',
    '2025-07-19 05:38:08+09',
    '2025-07-19 05:38:08+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752845193584_pfkevasbk1f',
    'user_1752843567659_khp4j4gfwa_hcrpeo',
    '2025-07-19 07:26:34+09',
    '2025-07-19 07:26:34+09',  -- last_activity_at
    NULL,
    5,
    5,
    false,
    'mac',
    'Chrome',
    'Mobile',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752849023228_lizty2pb3v',
    'user_1752848993472_u36131h8lc_8ycec2',
    '2025-07-19 08:30:23+09',
    '2025-07-19 08:30:23+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752852645396_lvmknszm9q9',
    'user_1752852640202_ydzmeb6ql4_1s7k5s',
    '2025-07-19 09:30:45+09',
    '2025-07-19 09:30:45+09',  -- last_activity_at
    NULL,
    1,
    1,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'referral',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752901837253_etstb49lad7',
    'user_1752838684748_0nv9s2pb7zom_17li3i',
    '2025-07-19 23:10:37+09',
    '2025-07-19 23:42:09+09',  -- last_activity_at
    '2025-07-19 23:42:09+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752902576026_7ujjrwvoq0p',
    'user_1752808759190_8w839o26m7k_7nczfy',
    '2025-07-19 23:22:56+09',
    '2025-07-19 23:22:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752904944250_x4aiu4nyeeb',
    'user_1752808759190_8w839o26m7k_7nczfy',
    '2025-07-20 00:24:10+09',
    '2025-07-20 00:24:10+09',  -- last_activity_at
    '2025-07-20 00:24:10+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html?current=6',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905057883_ck8jnras2o',
    'user_1752904985309_vydo68d7vfp_8re78z',
    '2025-07-20 00:04:18+09',
    '2025-07-20 00:04:18+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905330796_sv48701scoq',
    'user_1752905327172_0z2kuxkxmocl_aul05k',
    '2025-07-20 00:08:51+09',
    '2025-07-20 00:08:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905344282_nph68fbgjw8',
    'user_1752905327172_0z2kuxkxmocl_aul05k',
    '2025-07-20 00:46:09+09',
    '2025-07-20 00:46:09+09',  -- last_activity_at
    '2025-07-20 00:46:09+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905399456_w2645aylnb',
    'user_1752905356783_chu5xf0mg3n_jdhf0d',
    '2025-07-20 00:09:59+09',
    '2025-07-20 00:09:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905446562_sc2c8tik1k',
    'user_1752905427133_q5etzuznjx_jhk9vk',
    '2025-07-20 00:10:47+09',
    '2025-07-20 00:10:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752905877653_ckk2eg6381o',
    'user_1752905848937_hr5ba44pfgl_l0vge0',
    '2025-07-20 00:17:58+09',
    '2025-07-20 00:17:58+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752906045317_i5zumdiq3gk',
    'user_1752905371849_ehopfw026q_a4i4ce',
    '2025-07-20 00:20:45+09',
    '2025-07-20 00:20:45+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752907650581_qn539yhctb',
    'user_1752907647698_34bkudzwlei_dfjy66',
    '2025-07-20 00:47:31+09',
    '2025-07-20 00:47:31+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752909085120_exelno8ygmq',
    'user_1752808759190_8w839o26m7k_7nczfy',
    '2025-07-20 01:11:25+09',
    '2025-07-20 01:11:45+09',  -- last_activity_at
    '2025-07-20 01:11:45+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752910015561_ts6dlu6ybmp',
    'user_1752905356783_chu5xf0mg3n_jdhf0d',
    '2025-07-20 01:26:56+09',
    '2025-07-20 01:26:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752910285556_rrtq3jddb2',
    'user_1752905371849_ehopfw026q_a4i4ce',
    '2025-07-20 01:31:26+09',
    '2025-07-20 01:31:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752914691232_3ibbgsiocae',
    'user_1752905371849_ehopfw026q_a4i4ce',
    '2025-07-20 02:44:51+09',
    '2025-07-20 02:44:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752918519519_2i2wdw7xzpv',
    'user_1752918508319_6248m6onvsj_gq4dd2',
    '2025-07-20 03:48:40+09',
    '2025-07-20 03:48:40+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752923016389_n54q61jqlt',
    'user_1752746866921_xn30fljee',
    '2025-07-20 05:03:36+09',
    '2025-07-20 05:23:34+09',  -- last_activity_at
    '2025-07-20 05:23:34+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752931113550_6du7l019859',
    'user_1752931113550_idnp17v15o8_qdm2y3',
    '2025-07-20 07:18:34+09',
    '2025-07-20 07:18:34+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752943828944_uorz7fgiidi',
    'user_1752933950174_3wte4htj2z3_1twm35',
    '2025-07-20 10:50:29+09',
    '2025-07-20 10:50:29+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752972130969_hta8ytv72x5',
    'user_1752972130969_9ugyyxn52r_5y4c02',
    '2025-07-20 18:42:11+09',
    '2025-07-20 18:42:11+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752981032601_io4109n5qxb',
    'user_1752746866921_xn30fljee',
    '2025-07-20 21:10:33+09',
    '2025-07-20 21:10:33+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752982518707_iluiemuhvjk',
    'user_1752746866921_xn30fljee',
    '2025-07-20 21:35:19+09',
    '2025-07-20 21:35:19+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752982848725_3g5y4cizpci',
    'user_1752982848747_rfh2r938nj_g4oi9n',
    '2025-07-20 21:40:49+09',
    '2025-07-20 21:40:49+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752983710470_6qeker8cmr',
    'user_1752983710472_2sp4u46f8l9_it9dlx',
    '2025-07-20 21:55:10+09',
    '2025-07-20 21:55:10+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752983746761_7nluidez6va',
    'user_1752746866921_xn30fljee',
    '2025-07-20 21:55:47+09',
    '2025-07-20 21:55:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752984047203_m2r5qdmztef',
    'user_1752984047205_9n2ilo3y93_glsibl',
    '2025-07-20 22:00:47+09',
    '2025-07-20 22:00:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752984408008_lzd9gnh44ls',
    'user_1752984408009_6r1p9wwav5w_tlva2e',
    '2025-07-20 22:06:48+09',
    '2025-07-20 22:06:48+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752984654056_gir54esqr3u',
    'user_1752984654056_99t2ob7oaok_8fpzwd',
    '2025-07-20 22:10:54+09',
    '2025-07-20 22:10:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752984680921_c99y3eepre6',
    'user_1752984680921_yjayecftrpm_bvw4e3',
    '2025-07-20 22:11:21+09',
    '2025-07-20 22:11:21+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752985514058_tqb8svzi64a',
    'user_1752985514060_vdwntpyh4bh_smy8rf',
    '2025-07-20 22:25:14+09',
    '2025-07-20 22:25:14+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752985869831_bti7ppdgdec',
    'user_1752985869832_kxmhq5gygu_feh21x',
    '2025-07-20 22:31:10+09',
    '2025-07-20 22:31:10+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752985877509_wwn6ek4928',
    'user_1752985869832_kxmhq5gygu_feh21x',
    '2025-07-20 22:31:18+09',
    '2025-07-20 22:31:18+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986175295_dxm0qbsh70r',
    'user_1752986175312_b75bv8q62cf_icnjo6',
    '2025-07-20 22:36:15+09',
    '2025-07-20 22:36:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986183321_iwqvt4y1t1',
    'user_1752986183322_ce9vje76ay_44ks59',
    '2025-07-20 22:36:23+09',
    '2025-07-20 22:36:23+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986198317_i6sp3qal8x',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-20 22:36:38+09',
    '2025-07-20 22:36:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986415627_7yzf7mfqnz',
    'user_1752986415654_r0mrs8mmm5_j7a2i8',
    '2025-07-20 22:40:16+09',
    '2025-07-20 22:40:16+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986699860_o534xitwcjr',
    'user_1752986699860_ywnetj57y5b_m2mth3',
    '2025-07-20 22:45:00+09',
    '2025-07-20 22:45:00+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986731763_bdov2mmean',
    'user_1752986699860_ywnetj57y5b_m2mth3',
    '2025-07-20 22:46:49+09',
    '2025-07-20 22:46:49+09',  -- last_activity_at
    '2025-07-20 22:46:49+09',
    0,
    0,
    true,
    'linux',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html?current=6',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752986934650_d1n11jdt5lp',
    'user_1752986934737_w7r4ebayjvb_yad0xl',
    '2025-07-20 22:48:55+09',
    '2025-07-20 22:48:55+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752987686227_8por3tgb6u6',
    'user_1752987686228_qxgdv5u2oo_ch0p98',
    '2025-07-20 23:01:26+09',
    '2025-07-20 23:01:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752988367089_0d55nrtwvarj',
    'user_1752988367089_grelbn9lu0p_tv37rm',
    '2025-07-20 23:12:47+09',
    '2025-07-20 23:12:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752989111182_y3axbmp84',
    'user_1752989111182_u8bm31veby_lxackc',
    '2025-07-20 23:25:11+09',
    '2025-07-20 23:25:11+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752989669438_wk5dxc7hf8m',
    'user_1752852640202_ydzmeb6ql4_1s7k5s',
    '2025-07-20 23:34:29+09',
    '2025-07-20 23:41:27+09',  -- last_activity_at
    '2025-07-20 23:41:27+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752991094483_k15o6ma2fsg',
    'user_1752991094483_y2fyfmdhabf_x2g9aq',
    '2025-07-20 23:58:14+09',
    '2025-07-20 23:58:14+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752991908897_p5tri9x3gz',
    'user_1752991908898_nbf7rxr9u1g_jvfr3h',
    '2025-07-21 00:11:49+09',
    '2025-07-21 00:11:49+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752992877981_niostk5dxyr',
    'user_1752992877982_3jfb7w8w6v9_dd2eg7',
    '2025-07-21 00:27:58+09',
    '2025-07-21 00:27:58+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752992978785_dtco27se5u',
    'user_1752992972883_y8kxvxlh8yn_lpma8m',
    '2025-07-21 00:29:39+09',
    '2025-07-21 00:29:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752993432444_kifke4tr2rk',
    'user_1752993432465_x9o3shti5vc_9fuze3',
    '2025-07-21 00:37:12+09',
    '2025-07-21 00:37:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752994313662_8frg00qjei3',
    'user_1752994313662_kj9kknuih6f_w5s5kd',
    '2025-07-21 00:51:54+09',
    '2025-07-21 00:51:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752994358832_agajws68t7s',
    'user_1752994313662_kj9kknuih6f_w5s5kd',
    '2025-07-21 00:52:39+09',
    '2025-07-21 00:52:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752995585183_gju18ssgpgb',
    'user_1752995585183_gk1jf0ug6zu_smy8rf',
    '2025-07-21 01:13:05+09',
    '2025-07-21 01:13:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752996124542_x7b6mby4ayj',
    'user_1752985117489_wc7hdmj9qz_hcrpeo',
    '2025-07-21 01:22:05+09',
    '2025-07-21 01:22:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752996181597_vbrzkere3i',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-21 01:23:02+09',
    '2025-07-21 01:23:02+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752998127711_zru0weqcphl',
    'user_1752998096292_p9mz1frlmpo_tcc49s',
    '2025-07-21 01:55:28+09',
    '2025-07-21 01:55:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752998139377_is7vd5ll58i',
    'user_1752998134806_5p1242udu1f_d0oadd',
    '2025-07-21 01:55:39+09',
    '2025-07-21 02:11:33+09',  -- last_activity_at
    '2025-07-21 02:11:33+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1752999110047_oy5xl0nsxkb',
    'user_1752743392546_mp7owvxlc',
    '2025-07-21 02:13:04+09',
    '2025-07-21 02:13:04+09',  -- last_activity_at
    '2025-07-21 02:13:04+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753004235235_enrw7jja6gu',
    'user_1752985838162_r78sdwptmc_5jyv82',
    '2025-07-21 03:37:15+09',
    '2025-07-21 03:37:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753005412671_tt89hqrznb',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-21 03:56:53+09',
    '2025-07-21 03:56:53+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753006219013_ll8xa5a39vg',
    'user_1753006219033_2jitu8lj51z_mwyumt',
    '2025-07-21 04:10:19+09',
    '2025-07-21 04:10:19+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753007519045_jnh1qpzjmj',
    'user_1753007519046_cxea3xxk25w_6lnq53',
    '2025-07-21 04:31:59+09',
    '2025-07-21 04:31:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753008382933_3joku2e12ho',
    'user_1753008382959_jstirxdy1_wlz8fx',
    '2025-07-21 04:46:23+09',
    '2025-07-21 04:46:23+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753008875554_s6h69lb6jq',
    'user_1753008875555_yw18361atgn_ydximu',
    '2025-07-21 04:54:36+09',
    '2025-07-21 04:54:36+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753008931534_0we3024rf6xo',
    'user_1753008875555_yw18361atgn_ydximu',
    '2025-07-21 04:55:32+09',
    '2025-07-21 04:55:32+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753010413296_mq73iv0waag',
    'user_1752835538821_nrtbbute69_d0oadd',
    '2025-07-21 05:20:13+09',
    '2025-07-21 05:20:13+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753010414546_pteg33gtoh',
    'user_1753010414547_l0wn2toi8so_sh3d0z',
    '2025-07-21 05:20:15+09',
    '2025-07-21 05:20:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753010507429_akuphzkous',
    'user_1752998096292_p9mz1frlmpo_tcc49s',
    '2025-07-21 05:21:47+09',
    '2025-07-21 05:21:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753013046333_4u0pus6p2z5',
    'user_1753013046334_0vnsrx16t6xj_d0oadd',
    '2025-07-21 06:04:06+09',
    '2025-07-21 06:04:06+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753013806790_bgmth5a4utt',
    'user_1753013806790_1oa2zxod3vm_ve2l3v',
    '2025-07-21 06:16:47+09',
    '2025-07-21 06:16:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753013807822_3xiic1rly9i',
    'user_1752933950174_3wte4htj2z3_1twm35',
    '2025-07-21 06:16:48+09',
    '2025-07-21 06:16:48+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753015705024_q112ok2sri',
    'user_1753015696534_c6vjmp50u5a_6z5e3i',
    '2025-07-21 06:48:25+09',
    '2025-07-21 06:48:25+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753016679184_cff9j45ait8',
    'user_1753016679188_80w4xt17t2y_xz692x',
    '2025-07-21 07:04:39+09',
    '2025-07-21 07:04:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753017491512_w5vvuvxvfb8',
    'user_1753017491512_3s9ztyu8acd_dd2eg7',
    '2025-07-21 07:18:12+09',
    '2025-07-21 07:18:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753018080089_ljmxzckyupd',
    'user_1753018080089_uup00x3n5o_5ja8gw',
    '2025-07-21 07:28:00+09',
    '2025-07-21 07:28:00+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753018429462_idzmcdcp7mg',
    'user_1753018429462_e6fcopv1grf_62kbwh',
    '2025-07-21 07:33:49+09',
    '2025-07-21 07:33:49+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753019003937_rithd0mbqui',
    'user_1753019003937_128bb742n2cj_lxbmor',
    '2025-07-21 07:43:24+09',
    '2025-07-21 07:43:24+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753019022952_77z90p8nom2',
    'user_1753019022953_8njg7w2y19l_r8hrq9',
    '2025-07-21 07:43:43+09',
    '2025-07-21 07:43:43+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753019587053_5yd3ntqt8st',
    'user_1753019587053_9gbef0luvg_s8nm1x',
    '2025-07-21 07:53:07+09',
    '2025-07-21 07:53:07+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753022078247_4wv17cjqbiq',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-21 08:34:38+09',
    '2025-07-21 08:34:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753025144040_p45e6jmgcpa',
    'user_1753025144041_n6c6pfdhke_dlmd6x',
    '2025-07-21 09:25:44+09',
    '2025-07-21 09:25:44+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753033035064_eqkxmbi33oj',
    'user_1753033035084_dalmvwre7q_c43tfv',
    '2025-07-21 11:37:15+09',
    '2025-07-21 11:37:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753048985251_bh1065ag0o9',
    'user_1753048985252_o8h5jbq228t_ln6rqf',
    '2025-07-21 16:03:05+09',
    '2025-07-21 16:03:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753048996333_04imokv3do5h',
    'user_1753048996338_bl0v1kdeu49_itdc62',
    '2025-07-21 16:03:16+09',
    '2025-07-21 16:03:16+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753049232091_gfb84y5rv7q',
    'user_1753049232123_areo1p8bpl_q61dp2',
    '2025-07-21 16:07:12+09',
    '2025-07-21 16:07:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753052193288_gswnv2ajbg9',
    'user_1753052190558_89brkf83w7w_d0oadd',
    '2025-07-21 16:56:33+09',
    '2025-07-21 16:56:33+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753055471605_i7vzzty7efr',
    'user_1753055471605_ayla8jzen8r_vf7io5',
    '2025-07-21 17:51:12+09',
    '2025-07-21 17:51:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753055486243_ar46t2oacz6',
    'user_1753055486243_yg2hiiazk3s_vf7io5',
    '2025-07-21 17:51:26+09',
    '2025-07-21 17:51:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753055504600_mtslyd5gjtg',
    'user_1753055486243_yg2hiiazk3s_vf7io5',
    '2025-07-21 17:54:00+09',
    '2025-07-21 17:54:00+09',  -- last_activity_at
    '2025-07-21 17:54:00+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=6',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753056607113_exy0kn5c85',
    'user_1753056588004_wwf9p0tfzwb_j7a2i8',
    '2025-07-21 18:10:07+09',
    '2025-07-21 18:10:07+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753057582052_gzlip9srfe6',
    'user_1753057582053_kcstknfetr_g7mwvk',
    '2025-07-21 18:26:22+09',
    '2025-07-21 18:26:22+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753058413426_2cpmufidjnk',
    'user_1753058413433_10728k0g48vb_j7a2i8',
    '2025-07-21 18:40:13+09',
    '2025-07-21 18:40:13+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753058882562_38dgx9vlc96',
    'user_1753058882564_5q9crq438ht_r0wrqf',
    '2025-07-21 18:48:03+09',
    '2025-07-21 18:48:03+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753060220388_gtt1lsn1cul',
    'user_1752804019174_o3naer9ve',
    '2025-07-21 19:10:20+09',
    '2025-07-21 20:27:42+09',  -- last_activity_at
    '2025-07-21 20:27:42+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753061113228_7apweq3r0q',
    'user_1753061105440_4yiwtq6gqzv_8ycec2',
    '2025-07-21 19:25:13+09',
    '2025-07-21 19:26:31+09',  -- last_activity_at
    '2025-07-21 19:26:31+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753061119847_imn4cs156v8',
    'user_1753061113377_v773giqdrzn_3xen0v',
    '2025-07-21 19:25:20+09',
    '2025-07-21 19:26:51+09',  -- last_activity_at
    '2025-07-21 19:26:51+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753061134280_5vw4ddizrq6',
    'user_1753061128175_yd6qz2fvorf_d0nndu',
    '2025-07-21 19:25:34+09',
    '2025-07-21 19:25:34+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753061814773_ebqty6tr1e',
    'user_1753055486243_yg2hiiazk3s_vf7io5',
    '2025-07-21 19:36:55+09',
    '2025-07-21 19:36:55+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753062389549_11c0f2h1b3xe',
    'user_1753062373993_hfav5ne4j2_prkqe3',
    '2025-07-21 19:46:30+09',
    '2025-07-21 19:47:33+09',  -- last_activity_at
    '2025-07-21 19:47:33+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753062488467_hx4hei6ri3f',
    'user_1753062481581_o9jy9xl607k_rr5wa8',
    '2025-07-21 19:48:08+09',
    '2025-07-21 19:48:08+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Firefox',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753062708066_apq7g0rneqw',
    'user_1753062695351_c44c928gfg9_72n0qg',
    '2025-07-21 19:51:48+09',
    '2025-07-21 19:53:37+09',  -- last_activity_at
    '2025-07-21 19:53:37+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753062917184_7esuzjphsxx',
    'user_1753062844603_gzogbvm1r2k_h8ut47',
    '2025-07-21 19:55:17+09',
    '2025-07-21 19:55:17+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753063386007_cbgp24ixfz',
    'user_1753063299005_7fh4zq2tucq_z31eq7',
    '2025-07-21 20:03:06+09',
    '2025-07-21 20:03:06+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Firefox',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753064058570_36zk3inmom',
    'user_1753064022833_3et88dfxppw_x96tvh',
    '2025-07-21 20:14:19+09',
    '2025-07-21 20:14:19+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753064248064_7f80l7cyejj',
    'user_1753064241915_k40z60kv4mf_x96tvh',
    '2025-07-21 20:17:28+09',
    '2025-07-21 20:17:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753065530382_56zi57vonew',
    'user_1753065523964_cmvjcrbys25_lxylc9',
    '2025-07-21 20:38:50+09',
    '2025-07-21 20:38:50+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753066984476_0zy1ph3rvy9',
    'user_1753066971343_0hglx45mlju8_5jyv82',
    '2025-07-21 21:03:04+09',
    '2025-07-21 21:03:04+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753069140978_kiqvva4s36',
    'user_1753069141001_73anukv04pq_mu5vgx',
    '2025-07-21 21:39:01+09',
    '2025-07-21 21:39:01+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753070435182_0tn87q66dewn',
    'user_1753070419304_49t7giwwnzs_fhtzij',
    '2025-07-21 22:00:35+09',
    '2025-07-21 22:00:35+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753071626804_b6u99om7phl',
    'user_1753071617633_ay24kbafrcb_9gtktr',
    '2025-07-21 22:20:27+09',
    '2025-07-21 22:20:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075169803_qjntl6ayhm',
    'user_1753075153492_jj1axejk3bf_s7ign4',
    '2025-07-21 23:19:30+09',
    '2025-07-21 23:19:30+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075718158_ittg8fh77b9',
    'user_1752746866921_xn30fljee',
    '2025-07-21 23:28:38+09',
    '2025-07-21 23:28:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075804704_xqobo8h5eqj',
    'user_1753075804705_6zkf9v9idt9_j7a2i8',
    '2025-07-21 23:30:05+09',
    '2025-07-21 23:30:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075815029_52fu1v8j3lr',
    'user_1753075815030_4fzt38tztox_karzi6',
    '2025-07-21 23:30:15+09',
    '2025-07-21 23:30:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075842204_gtvudrhvewb',
    'user_1753075842205_uqvumagun_7c7gdx',
    '2025-07-21 23:30:42+09',
    '2025-07-21 23:30:42+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753075885716_b3xcfy65y3',
    'user_1753075885717_dlrh5iuel4_mklwj1',
    '2025-07-21 23:31:26+09',
    '2025-07-21 23:31:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076076523_nxkurguv49',
    'user_1753076076524_t89ssie0c4m_2ip1i6',
    '2025-07-21 23:34:37+09',
    '2025-07-21 23:34:37+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076244233_b0ecuptvzzm',
    'user_1753076244238_g1rcowtnqm_jhk9vk',
    '2025-07-21 23:37:24+09',
    '2025-07-21 23:37:24+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076467639_pdrf4scs1hd',
    'user_1753076467639_4istkqpm8m4_yo205x',
    '2025-07-21 23:41:08+09',
    '2025-07-21 23:41:08+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076605782_p1d19izpya',
    'user_1753076605789_zzupyl3ofus_tfkotn',
    '2025-07-21 23:43:26+09',
    '2025-07-21 23:43:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076640844_dma065r8caw',
    'user_1753076640845_531p7gbktin_j7a2i8',
    '2025-07-21 23:44:01+09',
    '2025-07-21 23:44:01+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076649342_f9okpck56fo',
    'user_1753076649355_rl3z065fy6q_h8mh0h',
    '2025-07-21 23:44:09+09',
    '2025-07-21 23:44:09+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076674123_qecn5uh21s',
    'user_1753076674124_h4n4ximpdet_8hpb86',
    '2025-07-21 23:44:34+09',
    '2025-07-21 23:44:34+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Tablet',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076675102_8ov28wyzzkw',
    'user_1753076675102_erg4bxohroi_s7ign4',
    '2025-07-21 23:44:35+09',
    '2025-07-21 23:44:35+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753076954773_kzyacmqyzi',
    'user_1753076901380_k5gxqag1et_lpma8m',
    '2025-07-21 23:59:35+09',
    '2025-07-21 23:59:35+09',  -- last_activity_at
    '2025-07-21 23:59:35+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    660.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077076180_7st05uvzpra',
    'user_1753077076181_ck65ed03css_vkqg0t',
    '2025-07-21 23:51:16+09',
    '2025-07-21 23:51:16+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077097692_isp8zzedzzk',
    'user_1753077097692_frv2zf8u9p_djleqw',
    '2025-07-21 23:51:38+09',
    '2025-07-21 23:51:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077273354_5dh7iusq1n8',
    'user_1753077273357_f9xqzsf13y7_uaxcvs',
    '2025-07-21 23:54:33+09',
    '2025-07-21 23:54:33+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077566728_a3wwmrpej3',
    'user_1753077566734_seml2gijlwk_jhk9vk',
    '2025-07-21 23:59:27+09',
    '2025-07-21 23:59:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Tablet',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077580501_reiwh4s7g7',
    'user_1753077580501_yfekjpjywzl_uovfq9',
    '2025-07-21 23:59:41+09',
    '2025-07-21 23:59:41+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753077658847_bdxo60k5qig',
    'user_1753077658862_1e6o55r8xmt_9lttea',
    '2025-07-22 00:00:59+09',
    '2025-07-22 00:00:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753078162288_ry0q87aij2q',
    'user_1753078162288_e9v067l258_eunlkp',
    '2025-07-22 00:09:22+09',
    '2025-07-22 00:09:22+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753078212892_hu6dwrpxc78',
    'user_1753078212893_y3ws0eftk7_pwknvc',
    '2025-07-22 00:10:13+09',
    '2025-07-22 00:10:13+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753078766976_qizrwy71478',
    'user_1753078762347_bai3pisnsg_yvr22o',
    '2025-07-22 00:19:27+09',
    '2025-07-22 00:19:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753078876681_vh3zr3gfaq',
    'user_1753078866756_3a6205akutt_lxylc9',
    '2025-07-22 00:21:17+09',
    '2025-07-22 00:21:17+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753079022262_ev0fvfjgjdb',
    'user_1753079010007_vvpe25xp6h_5jyv82',
    '2025-07-22 00:23:42+09',
    '2025-07-22 00:26:55+09',  -- last_activity_at
    '2025-07-22 00:26:55+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    180.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753079237272_a4chay1rsye',
    'user_1753079010007_vvpe25xp6h_5jyv82',
    '2025-07-22 00:27:52+09',
    '2025-07-22 00:27:52+09',  -- last_activity_at
    '2025-07-22 00:27:52+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    240.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753079354571_pahveopfbus',
    'user_1753079354571_o5sjow37rkh_yo205x',
    '2025-07-22 00:29:15+09',
    '2025-07-22 00:29:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753079806555_in5idx7j8sp',
    'user_1753079803700_c0axbrh35ep_s7ign4',
    '2025-07-22 00:36:47+09',
    '2025-07-22 00:40:48+09',  -- last_activity_at
    '2025-07-22 00:40:48+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    240.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753080405423_zegqm8lbluk',
    'user_1753080405437_4jpcge2nltp_lydf4z',
    '2025-07-22 00:46:45+09',
    '2025-07-22 00:46:45+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753081606547_s208eep2nw',
    'user_1753081606547_zoh14vodi8_e7rk9k',
    '2025-07-22 01:06:47+09',
    '2025-07-22 01:06:47+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753082571468_5yn6t95zoc',
    'user_1753082571468_cegd5i2p3l_v0uoha',
    '2025-07-22 01:22:51+09',
    '2025-07-22 01:22:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753083532916_np311lcy3e',
    'user_1753083532917_jiwfqf5e01_karzi6',
    '2025-07-22 01:38:53+09',
    '2025-07-22 01:38:53+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753083837383_2y8guyo8e0h',
    'user_1753060960410_ctolix40n5g_prkqe3',
    '2025-07-22 01:43:57+09',
    '2025-07-22 01:52:59+09',  -- last_activity_at
    '2025-07-22 01:52:59+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    540.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753087017247_8an190r5wln',
    'user_1753087013367_sjg6gy1mw1_17li3i',
    '2025-07-22 02:36:57+09',
    '2025-07-22 02:36:57+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753087379227_02xtqdg9iom7',
    'user_1753087379227_69ov6gfga0b_qz97xi',
    '2025-07-22 02:42:59+09',
    '2025-07-22 02:42:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753087898480_fvw4aw1d50f',
    'user_1753087884901_nmeg286bagh_d2nef1',
    '2025-07-22 02:51:38+09',
    '2025-07-22 02:51:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753089306627_gen4cvuajak',
    'user_1752808759190_8w839o26m7k_7nczfy',
    '2025-07-22 03:15:07+09',
    '2025-07-22 03:15:07+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753091297393_jyutqjv76s',
    'user_1753091297411_ir8qzu0rmdd_56a2tu',
    '2025-07-22 03:48:17+09',
    '2025-07-22 03:48:17+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753093569384_7yxgtwndir',
    'user_1753093569398_hdaiuq6r2l6_grgzmr',
    '2025-07-22 04:26:09+09',
    '2025-07-22 04:26:09+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753097684204_4a6q5se0mpd',
    'user_1753078762347_bai3pisnsg_yvr22o',
    '2025-07-22 05:34:44+09',
    '2025-07-22 05:35:34+09',  -- last_activity_at
    '2025-07-22 05:35:34+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098748813_us0bzqqzv3h',
    'user_1753098748813_gqko78frbo_8d717z',
    '2025-07-22 05:52:29+09',
    '2025-07-22 05:52:29+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098787702_schpoq8br9i',
    'user_1753098787703_qovbmli7kn_y1df6h',
    '2025-07-22 05:53:08+09',
    '2025-07-22 05:53:08+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098852575_icxn9lsjt5a',
    'user_1753098852575_ionb3qax9x_k03ndz',
    '2025-07-22 05:54:13+09',
    '2025-07-22 05:54:13+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098878656_qvui3i6rft',
    'user_1753098878656_fcygwco0wxf_n6p6gv',
    '2025-07-22 05:54:39+09',
    '2025-07-22 05:54:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098951207_grq1v3rljv',
    'user_1753098951207_g7xlp2vwhrg_yjte30',
    '2025-07-22 05:55:51+09',
    '2025-07-22 05:55:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753098991960_kv2jq0j89bf',
    'user_1753098991961_1po55uu6aeq_tdwh9o',
    '2025-07-22 05:56:32+09',
    '2025-07-22 05:56:32+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753099077467_p1an8qz1mv',
    'user_1753099077479_myteoqal1zf_1svizb',
    '2025-07-22 05:57:57+09',
    '2025-07-22 05:57:57+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753099406959_47oiycoh5w9',
    'user_1753099406960_1yo20bff4m9_3w2t3k',
    '2025-07-22 06:03:27+09',
    '2025-07-22 06:03:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753100404108_0hgujhbzod5o',
    'user_1753100404108_n7ow502w2c8_i494xi',
    '2025-07-22 06:20:04+09',
    '2025-07-22 06:20:04+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753100425416_lp0gr7ku1kl',
    'user_1753100425417_ibtaydqredh_i494xi',
    '2025-07-22 06:20:25+09',
    '2025-07-22 06:20:25+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753102650079_m60kq9pjovs',
    'user_1753102650079_yaz95rll66m_g404ig',
    '2025-07-22 06:57:30+09',
    '2025-07-22 06:57:30+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753103371512_c4axmpcte6',
    'user_1753103365087_ryayirucjw_5jyv82',
    '2025-07-22 07:09:32+09',
    '2025-07-22 07:09:32+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753103444566_on4mytbtqgs',
    'user_1753103444566_3q863vrxczg_x96tvh',
    '2025-07-22 07:10:45+09',
    '2025-07-22 07:12:59+09',  -- last_activity_at
    '2025-07-22 07:12:59+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    120.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753105111610_4ckbxy1mscm',
    'user_1753105109577_j4hrgtr7kjk_srf3l8',
    '2025-07-22 07:38:32+09',
    '2025-07-22 07:39:14+09',  -- last_activity_at
    '2025-07-22 07:39:14+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753106451338_jgbgpx4qwgg',
    'user_1753106451338_6mljwru46ls_j7a2i8',
    '2025-07-22 08:00:51+09',
    '2025-07-22 08:00:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753106457741_hnhvptya13u',
    'user_1753106457762_yrzdwrvcws_a4i4ce',
    '2025-07-22 08:00:58+09',
    '2025-07-22 08:00:58+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753106462697_xeqcq1tgprj',
    'user_1753103444566_3q863vrxczg_x96tvh',
    '2025-07-22 08:01:03+09',
    '2025-07-22 08:01:33+09',  -- last_activity_at
    '2025-07-22 08:01:33+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753107635388_cxietddalw9',
    'user_1753107635388_og4xm2pigp_1svizb',
    '2025-07-22 08:20:35+09',
    '2025-07-22 08:21:29+09',  -- last_activity_at
    '2025-07-22 08:21:29+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753108706600_tc14159jiiq',
    'user_1753106943035_goe3hcgfy8o_zadwch',
    '2025-07-22 08:38:27+09',
    '2025-07-22 08:39:49+09',  -- last_activity_at
    '2025-07-22 08:39:49+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753114686143_vizo3zseov',
    'user_1753114686144_80e2jdbyun_7prx0e',
    '2025-07-22 10:18:06+09',
    '2025-07-22 10:18:06+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753130406895_yb1fh4o0ivn',
    'user_1753130386828_3y7m39mz24q_biooy8',
    '2025-07-22 14:40:07+09',
    '2025-07-22 14:40:07+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753130650995_j2nhb6vnpq',
    'user_1753106451338_6mljwru46ls_j7a2i8',
    '2025-07-22 14:44:11+09',
    '2025-07-22 14:44:11+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753133925711_k9bm21dhpo',
    'user_1753133925712_f9v0ltfgq7_nuvfmd',
    '2025-07-22 15:38:46+09',
    '2025-07-22 15:38:46+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753138641622_c5hy1zg4s0w',
    'user_1753138641622_sqojef9xpa9_2v22tf',
    '2025-07-22 16:57:22+09',
    '2025-07-22 16:57:22+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Unknown',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753139696444_j0xbshi3j7c',
    'user_1753139696444_96e5bo3wdww_drilus',
    '2025-07-22 17:14:56+09',
    '2025-07-22 17:14:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753146665228_zhgqqf6rr6',
    'user_1753076244238_g1rcowtnqm_jhk9vk',
    '2025-07-22 19:11:05+09',
    '2025-07-22 19:11:05+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753146715827_gavcz5g23w9',
    'user_1753076605789_zzupyl3ofus_tfkotn',
    '2025-07-22 19:11:56+09',
    '2025-07-22 19:11:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753146808445_tpmn29e7wf',
    'user_1753079803700_c0axbrh35ep_s7ign4',
    '2025-07-22 19:13:28+09',
    '2025-07-22 19:13:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753146940971_mecxvith98a',
    'user_1753146932733_u4st7f6wsxf_5jyv82',
    '2025-07-22 19:15:41+09',
    '2025-07-22 19:15:41+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753147690961_2drxdbrrbo',
    'user_1753147682753_icc8u54igf9_j7a2i8',
    '2025-07-22 19:28:11+09',
    '2025-07-22 19:28:11+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753148200020_9asty7mapfd',
    'user_1753148200020_mi27lwmv1_j7a2i8',
    '2025-07-22 19:36:40+09',
    '2025-07-22 19:37:29+09',  -- last_activity_at
    '2025-07-22 19:37:29+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753148379014_egum5iq5yst',
    'user_1753148370455_obuks9iqxr_9ncgck',
    '2025-07-22 19:39:39+09',
    '2025-07-22 19:39:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753149440019_olpqnmq2w5a',
    'user_1753149440019_tdyfnhqscro_rjk4u7',
    '2025-07-22 19:57:20+09',
    '2025-07-22 19:57:20+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753155054118_o2f76myyiyl',
    'user_1753155026671_0bs6gxrxf9r6_qzmykm',
    '2025-07-22 21:30:54+09',
    '2025-07-22 21:30:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753156328913_kylzqbhkxyg',
    'user_1753156286119_9xhgr0irlm_jhk9vk',
    '2025-07-22 21:52:09+09',
    '2025-07-22 21:52:39+09',  -- last_activity_at
    '2025-07-22 21:52:39+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753157477501_7aep2jrq4gj',
    'user_1753055486243_yg2hiiazk3s_vf7io5',
    '2025-07-22 22:11:18+09',
    '2025-07-22 22:11:18+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159063824_nlrur3o2zm',
    'user_1753159033160_wi46p358nmd_jdhf0d',
    '2025-07-22 22:37:44+09',
    '2025-07-22 22:37:44+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159156221_14p7uies85r',
    'user_1753159066579_ym5oevi77h_karzi6',
    '2025-07-22 22:39:16+09',
    '2025-07-22 22:39:16+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159201713_7lij7cdvmpx',
    'user_1753159192615_or2ve8ou68_lipqq5',
    '2025-07-22 22:40:02+09',
    '2025-07-22 22:40:02+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159227947_jyu4xx7tz7',
    'user_1753159033160_wi46p358nmd_jdhf0d',
    '2025-07-22 22:40:28+09',
    '2025-07-22 22:40:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159232274_97l1kan5meb',
    'user_1753159232274_izwm8la8679_5er66w',
    '2025-07-22 22:40:32+09',
    '2025-07-22 22:40:32+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159270025_tax8rw22kdj',
    'user_1753159232274_izwm8la8679_5er66w',
    '2025-07-22 22:41:10+09',
    '2025-07-22 22:41:10+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159371418_7kkpkk6pji',
    'user_1753159232274_izwm8la8679_5er66w',
    '2025-07-22 22:42:51+09',
    '2025-07-22 22:42:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159420402_dgvfr9e31dq',
    'user_1753159066184_vyh3y2kfax_fgay6c',
    '2025-07-22 22:43:40+09',
    '2025-07-22 22:43:40+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159521507_lpyzjaje3vb',
    'user_1753159066579_ym5oevi77h_karzi6',
    '2025-07-22 23:13:45+09',
    '2025-07-22 23:13:45+09',  -- last_activity_at
    '2025-07-22 23:13:45+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    1680.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159539004_v65r3mnejn',
    'user_1753159534521_m2jbxnp1j6_pkmdo7',
    '2025-07-23 00:03:49+09',
    '2025-07-23 00:03:49+09',  -- last_activity_at
    '2025-07-23 00:03:49+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html?current=6',
    4680.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159585529_9sy7fw1ww2',
    'user_1753159580701_us0kp1c9pbf_clcmg1',
    '2025-07-22 22:58:46+09',
    '2025-07-22 22:58:46+09',  -- last_activity_at
    '2025-07-22 22:58:46+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html?current=6',
    720.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159646937_vg8zx8p8f0d',
    'user_1753159646973_po6p66773yj_jdhf0d',
    '2025-07-22 22:47:27+09',
    '2025-07-22 22:47:27+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159648962_7yk1cctd7j',
    'user_1753159646973_po6p66773yj_jdhf0d',
    '2025-07-22 22:47:29+09',
    '2025-07-22 22:47:29+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159716254_56l6mhdlpvb',
    'user_1753159716298_k5htf2qhil_karzi6',
    '2025-07-22 22:48:36+09',
    '2025-07-22 22:48:36+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753159741492_90pf88hg6mh',
    'user_1753159159590_c5yggfnbgw_oytue3',
    '2025-07-22 23:26:14+09',
    '2025-07-22 23:26:14+09',  -- last_activity_at
    '2025-07-22 23:26:14+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    2460.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160131746_2psp3fs6p6o',
    'user_1753159035406_fkl2sm07u9p_karzi6',
    '2025-07-23 00:49:31+09',
    '2025-07-23 00:49:31+09',  -- last_activity_at
    '2025-07-23 00:49:31+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    6840.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160274374_rg1e141dmbe',
    'user_1753159646973_po6p66773yj_jdhf0d',
    '2025-07-22 22:57:54+09',
    '2025-07-22 22:57:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160304870_gvb8se7r4l',
    'user_1753159062431_kqk9fopsas7_h3j58t',
    '2025-07-22 23:34:10+09',
    '2025-07-22 23:34:10+09',  -- last_activity_at
    '2025-07-22 23:34:10+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html?current=6',
    2160.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160401961_kq17xi19xgp',
    'user_1753159120845_kaft318ln28_98qqjb',
    '2025-07-22 23:00:02+09',
    '2025-07-22 23:41:11+09',  -- last_activity_at
    '2025-07-22 23:41:11+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Tablet',
    'direct',
    '/guide.html?current=2',
    2460.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160419892_5fj81zhq24j',
    'user_1753159580701_us0kp1c9pbf_clcmg1',
    '2025-07-22 23:13:54+09',
    '2025-07-22 23:13:54+09',  -- last_activity_at
    '2025-07-22 23:13:54+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html?current=6',
    1620.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160513691_56elcxpvfv6',
    'user_1753160512111_rc19ynp0u88_ya8bih',
    '2025-07-22 23:01:54+09',
    '2025-07-22 23:01:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160553620_gmji4yj8s7f',
    'user_1753160538554_w57ouwikgoa_jdhf0d',
    '2025-07-22 23:02:34+09',
    '2025-07-22 23:02:34+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160739110_w7pcxj4hup',
    'user_1753159033160_wi46p358nmd_jdhf0d',
    '2025-07-22 23:05:39+09',
    '2025-07-22 23:05:39+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160756841_odgrss32fb8',
    'user_1753160756843_4ehep312jnt_jdhf0d',
    '2025-07-22 23:05:57+09',
    '2025-07-22 23:05:57+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160873740_n3i2x0ybvoo',
    'user_1753159646973_po6p66773yj_jdhf0d',
    '2025-07-22 23:07:54+09',
    '2025-07-22 23:07:54+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753160914689_0b87gzixbqsi',
    'user_1753160914689_cmrqpwrk4hn_karzi6',
    '2025-07-22 23:08:35+09',
    '2025-07-22 23:50:28+09',  -- last_activity_at
    '2025-07-22 23:50:28+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    2520.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161251084_nlboizizxi',
    'user_1753160994445_skgpb3kedqr_jdhf0d',
    '2025-07-22 23:14:11+09',
    '2025-07-22 23:51:13+09',  -- last_activity_at
    '2025-07-22 23:51:13+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    2220.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161410631_lpaif17zz3',
    'user_1753160538554_w57ouwikgoa_jdhf0d',
    '2025-07-22 23:31:23+09',
    '2025-07-22 23:31:23+09',  -- last_activity_at
    '2025-07-22 23:31:23+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    900.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161512091_z96fw6ji2m9',
    'user_1753159066184_vyh3y2kfax_fgay6c',
    '2025-07-22 23:18:32+09',
    '2025-07-22 23:18:32+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Tablet',
    'direct',
    '/guide.html?current=3',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161549531_iv729rc1j7s',
    'user_1753160756843_4ehep312jnt_jdhf0d',
    '2025-07-22 23:19:10+09',
    '2025-07-22 23:19:10+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161567672_x0p9kq38k3',
    'user_1753160756843_4ehep312jnt_jdhf0d',
    '2025-07-22 23:19:28+09',
    '2025-07-22 23:19:28+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161777820_1kjwif1fmsz',
    'user_1753159255614_5jb6qq3lje5_aqn00h',
    '2025-07-22 23:22:58+09',
    '2025-07-22 23:54:46+09',  -- last_activity_at
    '2025-07-22 23:54:46+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    1920.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753161832862_un3xrkfi2',
    'user_1753161830892_j0msgehgt3s_oz2mwj',
    '2025-07-22 23:23:53+09',
    '2025-07-22 23:23:53+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162028904_lql3w5luzf',
    'user_1753161737704_x7su6o24j4_884g09',
    '2025-07-23 13:33:39+09',
    '2025-07-23 13:33:39+09',  -- last_activity_at
    '2025-07-23 13:33:39+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Tablet',
    'other',
    '/guide.html?current=6',
    50820.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162236685_02x2o3bwnq8o',
    'user_1753162216307_ebqz0bcj1d_5k38mw',
    '2025-07-22 23:30:37+09',
    '2025-07-22 23:30:37+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162271815_7k5dloigww',
    'user_1753159033160_wi46p358nmd_jdhf0d',
    '2025-07-22 23:31:12+09',
    '2025-07-22 23:31:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162366985_juf749e9axq',
    'user_1753162366986_sur05rbwf7_jdhf0d',
    '2025-07-22 23:32:47+09',
    '2025-07-22 23:35:28+09',  -- last_activity_at
    '2025-07-22 23:35:28+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=4',
    180.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162796011_po5fsrz7wt',
    'user_1753162796012_m4la3gmr6c_b26pdv',
    '2025-07-22 23:39:56+09',
    '2025-07-22 23:39:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162796721_ajytiqzevif',
    'user_1753162796012_m4la3gmr6c_b26pdv',
    '2025-07-22 23:39:57+09',
    '2025-07-22 23:39:57+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162804190_qbthbgnj0hk',
    'user_1753162804242_z5gsdbonvbd_a4w4w2',
    '2025-07-22 23:40:04+09',
    '2025-07-22 23:40:04+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162954807_3meullel2ns',
    'user_1753159120845_kaft318ln28_98qqjb',
    '2025-07-22 23:42:35+09',
    '2025-07-23 00:06:34+09',  -- last_activity_at
    '2025-07-23 00:06:34+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    1440.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753162988652_kmnlaiyy6co',
    'user_1753162975605_hev8uppvezd_oz2mwj',
    '2025-07-22 23:43:09+09',
    '2025-07-23 00:01:17+09',  -- last_activity_at
    '2025-07-23 00:01:17+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    1080.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753163158316_w3u2jvdviq',
    'user_1753163107253_erttgmcjo14_hxgnbi',
    '2025-07-22 23:45:58+09',
    '2025-07-22 23:45:58+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753164839518_vtno3938p5m',
    'user_1753159646973_po6p66773yj_jdhf0d',
    '2025-07-23 00:13:59+09',
    '2025-07-23 00:13:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=2',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753167933784_1ogh9bhzqkr',
    'user_1753167927693_5cdpxz9yt7_80qm9g',
    '2025-07-23 01:05:33+09',
    '2025-07-23 04:06:15+09',  -- last_activity_at
    '2025-07-23 04:06:15+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    10860.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753167994816_coy6tr28rte',
    'user_1753167936299_vj9voti4yhm_mklwj1',
    '2025-07-23 01:06:34+09',
    '2025-07-23 01:07:18+09',  -- last_activity_at
    '2025-07-23 01:07:18+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753168801572_t6l2nx46kmk',
    'user_1753140018341_z1qsntnbjfd_4vkwo3',
    '2025-07-23 01:20:01+09',
    '2025-07-23 01:20:01+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753168958108_g9qt2o9mqc',
    'user_1753168958109_1k5l0svkzfsi_x96tvh',
    '2025-07-23 01:22:38+09',
    '2025-07-23 01:22:38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753169276442_v92pml66ene',
    'user_1753169276442_oqd2on2ivk_d0oadd',
    '2025-07-23 01:27:56+09',
    '2025-07-23 01:27:56+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753169538572_u2z0c7vlww8',
    'user_1753169538578_qaz5hnlim9_tni6b4',
    '2025-07-23 01:32:18+09',
    '2025-07-23 01:32:18+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753170926067_8so5c9yrzz6',
    'user_1753170926067_gfuedzib2jo_9gtktr',
    '2025-07-23 01:55:26+09',
    '2025-07-23 01:58:24+09',  -- last_activity_at
    '2025-07-23 01:58:24+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    180.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753171296925_mdefokdnwt',
    'user_1753170926067_gfuedzib2jo_9gtktr',
    '2025-07-23 02:01:36+09',
    '2025-07-23 02:17:10+09',  -- last_activity_at
    '2025-07-23 02:17:10+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    960.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753172091407_poig0zvqnxl',
    'user_1753172091501_n9db93seu7k_bnghxo',
    '2025-07-23 02:14:51+09',
    '2025-07-23 02:14:51+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753173946109_sb24rjuybzl',
    'user_1753173946109_00bldip7hxbnl_s7ign4',
    '2025-07-23 02:45:46+09',
    '2025-07-23 02:45:46+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753174857747_5sxajzb7c09',
    'user_1753174850650_8x9gbedcubm_j7a2i8',
    '2025-07-23 03:00:57+09',
    '2025-07-23 03:24:05+09',  -- last_activity_at
    '2025-07-23 03:24:05+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    1380.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753179195625_7fldt9pvzp4',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-23 04:13:15+09',
    '2025-07-23 04:13:15+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753182048146_ljjchi2vils',
    'user_1753182048146_zm4jhsfdsa_rwozoz',
    '2025-07-23 05:00:48+09',
    '2025-07-23 05:00:48+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753185945567_npwb3o2r6v',
    'user_1753185943005_iqtdf7da71_ep0tkx',
    '2025-07-23 06:11:30+09',
    '2025-07-23 06:11:30+09',  -- last_activity_at
    '2025-07-23 06:11:30+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html?current=6',
    360.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753191838929_9x9i9v1ku1u',
    'user_1752801951160_0wmbe4rnw',
    '2025-07-23 07:43:58+09',
    '2025-07-23 07:43:58+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753205712566_1gnxdx7vv6v',
    'user_1752986198317_e83ec1bait_ev18z',
    '2025-07-23 11:35:12+09',
    '2025-07-23 11:35:12+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753227143069_9fcri0xr0fl',
    'user_1753227143070_ypkxnezcm3t_yaugap',
    '2025-07-23 17:32:23+09',
    '2025-07-23 17:32:23+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753231045998_z9anj1ku6gr',
    'user_1753231034653_ubrtrjd87hh_s7ign4',
    '2025-07-23 18:37:26+09',
    '2025-07-23 18:37:26+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753231491160_jn42nrnna2c',
    'user_1753229299282_11gi09ctr2d_hcrpeo',
    '2025-07-23 18:44:51+09',
    '2025-07-23 19:10:35+09',  -- last_activity_at
    '2025-07-23 19:10:35+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html?current=6',
    1560.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753232542362_um28hmer5yf',
    'user_1753232534599_4r6onzjl92_s7ign4',
    '2025-07-23 19:02:22+09',
    '2025-07-23 19:02:22+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753233055982_dabwafbni7v',
    'user_1753229299282_11gi09ctr2d_hcrpeo',
    '2025-07-23 19:10:55+09',
    '2025-07-23 19:10:55+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753234079355_i2f9c3pjy9',
    'user_1753234079356_kdyz53ueho_ew580i',
    '2025-07-23 19:27:59+09',
    '2025-07-23 19:27:59+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'linux',
    'Chrome',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753322185971_2x4mt8du7ir',
    'user_1753322185971_8pemxaofec_mklwj1',
    '2025-07-24 10:56:57.049+09',
    '2025-07-24 11:41:42.374+09',  -- last_activity_at
    '2025-07-24 11:41:42.374+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    900.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753322479940_0btw2e0ozmjq',
    'user_1753252642795_z8k3uf7u8',
    '2025-07-24 13:01:25.468+09',
    '2025-07-24 13:01:25.468+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753322844029_e5kodj22o7f',
    'user_1753322844034_vmfdazigrq8_s7ign4',
    '2025-07-24 11:07:31.38+09',
    '2025-07-24 11:07:31.38+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753322871185_kaqbhaegsb',
    'user_1753322871189_6x0kzh66r7i_twe43j',
    '2025-07-24 11:07:54.043+09',
    '2025-07-24 11:07:54.043+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753323766099_u1r7sa6im1',
    'user_1753323762734_itdhftrg0wk_x96tvh',
    '2025-07-24 11:22:49.028+09',
    '2025-07-24 11:22:49.028+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753324020130_5i4ypwumiso',
    'user_1753324020131_qtcivb8tg1g_9ncgck',
    '2025-07-24 11:27:21.85+09',
    '2025-07-24 11:32:41.804+09',  -- last_activity_at
    '2025-07-24 11:32:41.804+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    300.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753324456004_j3qfa29kcxl',
    'user_1753322844034_vmfdazigrq8_s7ign4',
    '2025-07-24 11:34:31.374+09',
    '2025-07-24 11:37:01.212+09',  -- last_activity_at
    '2025-07-24 11:37:01.212+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    120.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753324696226_7i9hiwcat88',
    'user_1753324696226_sos25avlo4j_x96tvh',
    '2025-07-24 11:38:23.903+09',
    '2025-07-24 11:45:49.496+09',  -- last_activity_at
    '2025-07-24 11:45:49.496+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    420.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753332240217_t6o0wtgwfc8',
    'user_1753332215084_nx21o1uut7j_bnfsjp',
    '2025-07-24 13:44:07.681+09',
    '2025-07-24 13:46:42.377+09',  -- last_activity_at
    '2025-07-24 13:46:42.377+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    180.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753333519343_adq5tk20w8q',
    'user_1753333502821_10f2a4yfpi9m_rah05b',
    '2025-07-24 14:05:22.964+09',
    '2025-07-24 14:05:22.964+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753344921122_d0aq0bh82v6',
    'user_1753344921122_yif39x0ytc_j7a2i8',
    '2025-07-24 17:15:21.125+09',
    '2025-07-24 17:15:21.125+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753345102461_knhw6cyfsr',
    'user_1753258196076_kdargpiow08_j7a2i8',
    '2025-07-24 17:18:22.463+09',
    '2025-07-24 17:20:27.011+09',  -- last_activity_at
    '2025-07-24 17:20:27.011+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    120.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753356205155_1fqwolbpv4u',
    'user_1753356205155_fty6fpthpxh_8ycec2',
    '2025-07-24 20:23:25.156+09',
    '2025-07-24 20:23:25.156+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753356210194_jqx3x3qm3om',
    'user_1753356205155_fty6fpthpxh_8ycec2',
    '2025-07-24 20:23:30.196+09',
    '2025-07-24 20:23:30.196+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753356248324_599milne92',
    'user_1753356248324_xgtz1swosqr_hcrpeo',
    '2025-07-29 16:27:41.449+09',
    '2025-07-29 16:27:41.449+09',  -- last_activity_at
    '2025-07-29 16:27:41.449+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753369798014_ra7q3rbq5af',
    'user_1753369798014_zimdzxgg47i_9a032b',
    '2025-07-25 00:10:01.211+09',
    '2025-07-25 00:10:01.211+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Edge',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753370105399_ntpqjtpsae9',
    'user_1753369798014_zimdzxgg47i_9a032b',
    '2025-07-25 00:15:10.48+09',
    '2025-07-25 00:20:30.475+09',  -- last_activity_at
    '2025-07-25 00:20:30.475+09',
    0,
    0,
    true,
    'windows',
    'Edge',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    300.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753370609963_x0w8j0ugwxi',
    'user_1753370609963_9sashvsw2xv_bsjj7n',
    '2025-07-25 00:24:37.158+09',
    '2025-07-25 00:24:37.158+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753372707106_9e66z3acr8n',
    'user_1753372707106_3l80h92hdhj_c21532',
    '2025-07-25 00:58:35.985+09',
    '2025-07-25 00:58:35.985+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753375656378_3nddvjrodhc',
    'user_1753375656385_9qdzhbdz5',
    '2025-07-25 01:47:36.385+09',
    '2025-07-25 02:07:13.762+09',  -- last_activity_at
    '2025-07-25 02:07:13.762+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide',
    1200.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753377670832_0yd7xc9v58kg',
    'user_1753377670832_98mw79f1l2j_8wp4v3',
    '2025-07-25 02:21:10.835+09',
    '2025-07-25 02:21:10.835+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753401536156_ky11012ifgn',
    'user_1753352544449_po97bew11g_hxgnbi',
    '2025-07-25 08:59:21.628+09',
    '2025-07-25 08:59:21.628+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753404025204_2w4toovwa1n',
    'user_1753404025204_m61suxklsc9_yblshk',
    '2025-07-25 09:40:33.742+09',
    '2025-07-25 09:40:33.742+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753405425367_z02dk08uwgq',
    'user_1753404025204_m61suxklsc9_yblshk',
    '2025-07-25 10:03:45.368+09',
    '2025-07-25 10:19:18.279+09',  -- last_activity_at
    '2025-07-25 10:19:18.279+09',
    0,
    0,
    true,
    'windows',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    960.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753406657194_ejulz7d0ggl',
    'user_1753406657194_2714l4pne2z_x96tvh',
    '2025-07-25 11:36:50.699+09',
    '2025-07-25 12:17:49.158+09',  -- last_activity_at
    '2025-07-25 12:17:49.158+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    2460.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753407795366_mr4u5ghcf6',
    'user_1753407795366_bup2chpksr_tgzc1v',
    '2025-07-25 10:43:40.432+09',
    '2025-07-25 10:43:40.432+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753428199685_6k490vhbfgo',
    'user_1753428199685_lirzr76iltc_5jyv82',
    '2025-07-25 16:23:25.238+09',
    '2025-07-25 16:39:46.362+09',  -- last_activity_at
    '2025-07-25 16:39:46.362+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    960.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753432237992_yh7mozu0h9l',
    'user_1753432237993_jp1dcjdgg9b_k4z4o2',
    '2025-07-25 17:30:37.996+09',
    '2025-07-25 17:30:37.996+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753436950826_mc1v9k4f4r',
    'user_1753436911272_v3pnyceh9e8_9gtktr',
    '2025-07-25 18:49:10.839+09',
    '2025-07-25 18:49:10.839+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Edge',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753437465671_h5ts01e759o',
    'user_1753436911272_v3pnyceh9e8_9gtktr',
    '2025-07-25 18:57:45.673+09',
    '2025-07-25 19:15:19.306+09',  -- last_activity_at
    '2025-07-25 19:15:19.306+09',
    0,
    0,
    true,
    'windows',
    'Edge',
    'Desktop',
    'other',
    '/guide.html',
    1020.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753441580040_c27to4sxq1',
    'user_1753441580045_5f22i6w3qfn_e2gag5',
    '2025-07-25 20:07:17.72+09',
    '2025-07-25 20:07:17.72+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753509466669_4ix1whqh1pk',
    'user_1753319125085_riasb25jsbe_hcrpeo',
    '2025-07-26 14:57:46.671+09',
    '2025-07-26 14:58:02.215+09',  -- last_activity_at
    '2025-07-26 14:58:02.215+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753520704250_v0bdvfsdw9',
    'user_1753520704250_1559dqc95jm_6i42mz',
    '2025-07-26 18:05:04.252+09',
    '2025-07-26 18:05:04.252+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753540296179_7209ifj77ju',
    'user_1753540296179_yshah8337n_9ncgck',
    '2025-07-26 23:31:57.167+09',
    '2025-07-26 23:37:21.248+09',  -- last_activity_at
    '2025-07-26 23:37:21.248+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    300.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753591812120_3tny65szr',
    'user_1753591812120_0zohv5xas',
    '2025-07-27 13:50:13.95+09',
    '2025-07-27 13:50:13.95+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'direct',
    '/guide',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753639581214_mhh68x3en9d',
    'user_1753639581214_fdzr3h0hqh_a9zrk3',
    '2025-07-28 03:06:28.818+09',
    '2025-07-28 03:08:35.557+09',  -- last_activity_at
    '2025-07-28 03:08:35.557+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    120.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753664752586_q7qij475exr',
    'user_1753664752586_8cwq07ymgq8_9ncgck',
    '2025-07-28 10:05:56.417+09',
    '2025-07-28 10:13:05.088+09',  -- last_activity_at
    '2025-07-28 10:13:05.088+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    420.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753677640812_3x29hdnw9ky',
    'user_1753677640812_56c2j9xpvus_eunlkp',
    '2025-07-28 13:40:47.175+09',
    '2025-07-28 13:40:47.175+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753691451673_rcj2g6uwsj',
    'user_1753691451674_7vv6nxzgw76_1typmd',
    '2025-07-28 17:30:51.676+09',
    '2025-07-28 17:30:51.676+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753691524521_hued256zhrg',
    'user_1753691524521_dwg0yjywl1_j7a2i8',
    '2025-07-28 17:32:04.528+09',
    '2025-07-28 17:32:04.528+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753691672253_qlnrtcq5oll',
    'user_1753258196076_kdargpiow08_j7a2i8',
    '2025-07-28 17:38:28.291+09',
    '2025-07-28 17:38:28.291+09',  -- last_activity_at
    '2025-07-28 17:38:28.291+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'direct',
    '/guide.html',
    240.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753693867522_i6rfn9oxyxk',
    'user_1753693867522_iziosk3z1mn_558o1',
    '2025-07-28 18:11:48.713+09',
    '2025-07-28 18:11:48.713+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753708445579_ypbr65mkjqs',
    'user_1753708445579_hqhqvwt24nl_5jyv82',
    '2025-07-28 22:14:18.717+09',
    '2025-07-28 22:15:19.047+09',  -- last_activity_at
    '2025-07-28 22:15:19.047+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    60.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753715516512_49s2crx76f9',
    'user_1753715516512_02hn54cpqbfc_e78sfa',
    '2025-07-29 00:11:56.521+09',
    '2025-07-29 00:11:56.521+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753716342462_2f9mk3c6lam',
    'user_1753252689282_za00fbgh6o_nf9uum',
    '2025-07-29 00:25:42.465+09',
    '2025-07-29 00:25:42.465+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Mobile',
    'facebook',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753756958252_djldks120l',
    'user_1753246265904_6vbbloscs1j_d0oadd',
    '2025-07-29 11:42:40.587+09',
    '2025-07-29 11:42:40.587+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753766229636_eg7ghfsazmg',
    'user_1753766229637_0txaqsnxieb_oytue3',
    '2025-07-29 14:17:12.606+09',
    '2025-07-29 14:17:12.606+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753776957695_jopfi5n0pvq',
    'user_1753776957696_ig5edb8m2nc_j7a2i8',
    '2025-07-29 17:15:59.546+09',
    '2025-07-29 17:15:59.546+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753777692254_qkzbncewtul',
    'user_1753777692254_9jn4218cm8g_x96tvh',
    '2025-07-29 17:28:41.576+09',
    '2025-07-29 20:01:34.7+09',  -- last_activity_at
    '2025-07-29 20:01:34.7+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    9180.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753779440486_9z62e9c5vkq',
    'user_1753776957696_ig5edb8m2nc_j7a2i8',
    '2025-07-29 17:57:22.484+09',
    '2025-07-29 17:57:22.484+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753779897012_yp6cy4bon6',
    'user_1753776957696_ig5edb8m2nc_j7a2i8',
    '2025-07-29 18:04:58.724+09',
    '2025-07-29 18:04:58.724+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753833514914_pgjwl5wg8t',
    'user_1753776957696_ig5edb8m2nc_j7a2i8',
    '2025-07-30 08:58:36.638+09',
    '2025-07-30 08:58:36.638+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753840316076_jjlrao17ba',
    'user_1753840316076_0zg0oiu5sjib_gp45st',
    '2025-07-30 13:45:32.674+09',
    '2025-07-30 13:45:32.674+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753844357618_wi507uptijn',
    'user_1753844357618_f1shq9dq9zn_x96tvh',
    '2025-07-30 11:59:31.613+09',
    '2025-07-30 11:59:31.613+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753863256746_764q64rklxi',
    'user_1753840316076_0zg0oiu5sjib_gp45st',
    '2025-07-30 17:14:16.748+09',
    '2025-07-30 17:14:16.748+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753885426102_4i7nr5nllgw',
    'user_1753885426102_j9f8lb1cc_vtlks7',
    '2025-07-30 23:23:46.102+09',
    '2025-07-30 23:23:46.102+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753917135493_cwmht1sbf1',
    'user_1753917135494_51to6it8lz_l0jaup',
    '2025-07-31 08:12:15.501+09',
    '2025-07-31 08:12:15.501+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Other',
    'Mobile',
    'facebook',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753927808402_nrutyqfiv3r',
    'user_1753927807966_syw579icx',
    '2025-07-31 11:10:08.403+09',
    '2025-07-31 11:10:08.403+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753932202890_zrk03w39xnr',
    'user_1753322844034_vmfdazigrq8_s7ign4',
    '2025-07-31 12:23:24.732+09',
    '2025-07-31 12:23:24.732+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753937489925_ij7h2m0pvnj',
    'user_1753254542635_cdu3eqtss1g_yvr22o',
    '2025-07-31 13:51:32.243+09',
    '2025-07-31 13:51:32.243+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753948596283_fx19mk9vd4h',
    'user_1753840316076_0zg0oiu5sjib_gp45st',
    '2025-07-31 16:56:58.144+09',
    '2025-07-31 17:20:50.019+09',  -- last_activity_at
    '2025-07-31 17:20:50.019+09',
    0,
    0,
    true,
    'mac',
    'Safari',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    1440.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753960761529_95u1wpa0amc',
    'user_1753960761529_qjvqfy7ttl_vf7io5',
    '2025-07-31 21:12:54.74+09',
    '2025-07-31 21:12:54.74+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753968023665_uikkpv37t8',
    'user_1753639581214_fdzr3h0hqh_a9zrk3',
    '2025-07-31 22:27:40.603+09',
    '2025-07-31 22:27:40.603+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753968238835_0v8h7b9nn6o',
    'user_1753260992296_f743z5whrpt_1twm35',
    '2025-07-31 22:25:10.989+09',
    '2025-07-31 22:25:10.989+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Safari',
    'Mobile',
    'other',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969516817_4vtimsfmgng',
    'user_1753639581214_fdzr3h0hqh_a9zrk3',
    '2025-07-31 22:46:04.144+09',
    '2025-07-31 22:46:04.144+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969519969_vw215galf7',
    'user_1753969519969_nh6g20q2ij_8ycec2',
    '2025-07-31 22:45:34.103+09',
    '2025-07-31 22:45:34.103+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969529131_yby8fyuzo3',
    'user_1753969529136_l2mlxcs32lh_hcrpeo',
    '2025-07-31 22:45:35.737+09',
    '2025-07-31 22:45:35.737+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969532512_4x8pwulqgms',
    'user_1753969532513_grx92f4kfsi_5uxj3a',
    '2025-07-31 22:45:48.843+09',
    '2025-07-31 23:07:28.22+09',  -- last_activity_at
    '2025-07-31 23:07:28.22+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    1320.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969534317_l3v02qpx4j',
    'user_1753969534323_7iftr1pgdbj_gq4dd2',
    '2025-07-31 22:45:39.161+09',
    '2025-07-31 23:20:17.623+09',  -- last_activity_at
    '2025-07-31 23:20:17.623+09',
    0,
    0,
    true,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    2100.0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969548313_xdci2r2c8qq',
    'user_1753969548313_6348uch9oau_o4eg10',
    '2025-07-31 22:45:53.428+09',
    '2025-07-31 22:45:53.428+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969599555_k9g1lymtku',
    'user_1753969599555_iapkglr6koi_6z5e3i',
    '2025-07-31 22:46:46.37+09',
    '2025-07-31 22:46:46.37+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969756277_n4wjc75tkr',
    'user_1753969519969_nh6g20q2ij_8ycec2',
    '2025-07-31 22:52:34.333+09',
    '2025-07-31 22:52:34.333+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969895732_xu8jh5z9cz',
    'user_1753969562585_ojlttl8xy7_ongv2z',
    '2025-07-31 22:51:37.804+09',
    '2025-07-31 22:51:37.804+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969946152_1wv28g0lv53',
    'user_1753969529136_l2mlxcs32lh_hcrpeo',
    '2025-07-31 22:52:28.341+09',
    '2025-07-31 22:52:28.341+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753969984158_xmpts2z7oiq',
    'user_1753969552271_4s2hhnqmsrg_y6xjyb',
    '2025-07-31 22:53:06.692+09',
    '2025-07-31 22:53:06.692+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'windows',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753970004447_q9c5082547',
    'user_1753969562585_ojlttl8xy7_ongv2z',
    '2025-07-31 22:54:21.271+09',
    '2025-07-31 22:54:21.271+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753971656274_tb6wl6s2sq',
    'user_1753969519969_nh6g20q2ij_8ycec2',
    '2025-07-31 23:21:01.348+09',
    '2025-07-31 23:21:01.348+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753971770846_s42zm94q63r',
    'user_1753639581214_fdzr3h0hqh_a9zrk3',
    '2025-07-31 23:22:52.807+09',
    '2025-07-31 23:23:05.474+09',  -- last_activity_at
    '2025-07-31 23:23:05.474+09',
    0,
    0,
    true,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;


INSERT INTO guide_sessions (
    session_id, user_fingerprint, started_at, last_activity_at, completed_at,
    current_step, highest_step_reached, is_completed, os, browser, 
    device_type, referrer_source, landing_page, total_time_seconds, 
    step_times, errors
) VALUES (
    'session_1753981545557_0fipf1qnchkg',
    'user_1753927807966_syw579icx',
    '2025-08-01 02:05:47.695+09',
    '2025-08-01 02:05:47.695+09',  -- last_activity_at
    NULL,
    0,
    0,
    false,
    'mac',
    'Chrome',
    'Desktop',
    'getclaudecode.com',
    '/guide.html',
    0,
    '{}',
    '[]'
) ON CONFLICT (session_id) DO NOTHING;



-- User Feedback 데이터 삽입
-- 총 5 개의 피드백

INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    'session_1753231491160_jn42nrnna2c',
    0,
    NULL,
    'bad',
    0,
    '/guide.html?current=6',
    '2025-07-23 19:10:38+09'
);


INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    'session_1753231491160_jn42nrnna2c',
    0,
    NULL,
    'bad',
    0,
    '/guide.html?current=6',
    '2025-07-23 19:10:37+09'
);


INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    'session_1753322185971_2x4mt8du7ir',
    3,
    NULL,
    'neutral',
    0,
    '/guide.html',
    '2025-07-24 11:41:49.87+09'
);


INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    'session_1753405425367_z02dk08uwgq',
    4,
    NULL,
    'good',
    0,
    '/guide.html',
    '2025-07-25 10:19:21.795+09'
);


INSERT INTO user_feedback (
    session_id, feedback_score, feedback_text, emoji, 
    completion_time_minutes, page_path, timestamp
) VALUES (
    'session_1753428199685_6k490vhbfgo',
    4,
    NULL,
    'good',
    0,
    '/guide.html',
    '2025-07-25 16:39:50.289+09'
);



-- 카운터는 기존 값 유지
-- counters 테이블의 visitors 값은 변경하지 않음
