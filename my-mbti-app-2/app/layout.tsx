import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "내 IT 부캐 찾기 | MBTI 테스트",
  description:
    "출근길 내 모습으로 알아보는 'IT 부캐' 테스트! 협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는 IT 직무 페르소나를 확인해보세요.",
  openGraph: {
    title: "내 IT 부캐 찾기 | MBTI 테스트",
    description:
      "8개의 질문으로 알아보는 나의 IT 직장인 페르소나. 지금 바로 확인해보세요!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
