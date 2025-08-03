import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드 - Claude Code Guide',
  description: 'Claude Code Guide 관리자 대시보드',
  robots: 'noindex, nofollow', // 검색 엔진에서 숨기기
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 대시보드는 네비게이션 없이 표시 */}
      {children}
    </>
  );
}