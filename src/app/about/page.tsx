import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - 다루하루TV',
  description: '교직원 취업 정보와 AI 활용법을 공유하는 다루하루TV 소개',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <header className="text-center mb-12">
        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">D</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About 다루하루TV</h1>
        <p className="text-xl text-gray-600">
          교직원 취업 정보와 AI 활용법을 공유합니다
        </p>
      </header>

      {/* 소개 */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">블로그 소개</h2>
        <div className="text-gray-700 space-y-4 leading-relaxed">
          <p>
            안녕하세요! 다루하루TV에 오신 것을 환영합니다.
          </p>
          <p>
            이 블로그는 <strong>교직원 취업을 준비하는 분들</strong>과
            <strong> AI를 활용해 효율적으로 준비하고 싶은 분들</strong>을 위해 만들어졌습니다.
          </p>
          <p>
            저도 한때 교직원 취업을 준비했던 사람으로서, 정보를 찾는 것이 얼마나 어려운지 잘 알고 있습니다.
            그래서 제가 경험하고 알게 된 정보들을 이곳에 정리해서 공유하고 있습니다.
          </p>
        </div>
      </section>

      {/* 제공 콘텐츠 */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">제공하는 콘텐츠</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">교직원 취업 준비</h3>
            <p className="text-sm text-gray-600">
              채용 일정, 서류 준비, 면접 팁 등 실질적인 취업 정보
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">취업과 AI</h3>
            <p className="text-sm text-gray-600">
              AI 도구를 활용한 효율적인 취업 준비 방법
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">내 생각</h3>
            <p className="text-sm text-gray-600">
              취업 준비 과정에서의 인사이트와 개인적인 이야기
            </p>
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">연락하기</h2>
        <p className="text-gray-700 mb-4">
          궁금한 점이나 다루었으면 하는 주제가 있다면 언제든 연락주세요.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://www.youtube.com/@daruharutv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">더 많은 정보가 궁금하시다면?</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          블로그 글 보러가기
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
