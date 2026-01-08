import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "다루하루TV - 교직원 취업 정보 & AI 활용",
  description: "교직원 취업 정보와 AI 활용법을 공유하는 블로그입니다. 채용 정보, 면접 팁, AI 도구 활용법을 확인하세요.",
  keywords: "교직원 취업, 교사 채용, AI 활용, 취업 준비, 면접 팁, 다루하루TV",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "다루하루TV",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
