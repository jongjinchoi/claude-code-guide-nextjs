import Script from 'next/script';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "최종진",
            "alternateName": "Jongjin Choi",
            "additionalName": "Jin",
            "url": "https://jongjinchoi.com",
            "image": "https://getclaudecode.com/src/images/profile.jpg",
            "email": "mailto:me@jongjinchoi.com",
            "sameAs": [
              "https://www.linkedin.com/in/jongjinchoi/",
              "https://x.com/jongjin_choi_kr",
              "https://jongjinchoi.com/forbes-featured-startup-founder-returns-to-business-after-parenting/"
            ],
            "jobTitle": "개발자",
            "knowsAbout": ["Claude Code", "AI 코딩 교육", "웹 개발", "초보자 코딩 교육"],
            "description": "Claude Code Guide 제작자. AI와 함께하는 코딩 교육에 관심이 많은 개발자입니다."
          })
        }}
      />
      {children}
    </>
  );
}