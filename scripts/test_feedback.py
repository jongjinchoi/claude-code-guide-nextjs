import pandas as pd

df = pd.read_csv('/Users/jongjinchoi/Downloads/raw_events_rows.csv')
feedback_df = df[(df['event_category'] == 'feedback') & (df['event_name'] == 'feedback_submitted')]

print('전체 피드백:', len(feedback_df))
print('feedback_score 값들:', feedback_df['feedback_score'].value_counts().to_dict())
print('0점 개수:', len(feedback_df[feedback_df['feedback_score'] == 0]))
print('0점이 아닌 개수:', len(feedback_df[feedback_df['feedback_score'] != 0]))

# 0점이 아닌 것들만
non_zero_df = feedback_df[feedback_df['feedback_score'] != 0]
print('\n0점 제외 후:', len(non_zero_df))
print('점수 분포:', non_zero_df['feedback_score'].value_counts().to_dict())