import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StatsLayout({ children }: Props) {
  // Stats 페이지는 독립적인 터미널 화면이므로 네비게이션 제외
  return <>{children}</>;
}