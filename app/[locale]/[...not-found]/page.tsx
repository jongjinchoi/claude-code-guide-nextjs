import { notFound } from 'next/navigation';

// 존재하지 않는 모든 경로를 캐치하여 not-found.tsx로 리다이렉트
export default function CatchAllPage() {
  notFound();
}