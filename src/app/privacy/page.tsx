import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 다루하루TV',
  description: '다루하루TV 블로그의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">개인정보처리방침</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
        <p className="text-gray-500 text-sm">최종 수정일: 2026년 1월 10일</p>
      </header>

      {/* 본문 */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 개인정보의 수집 및 이용</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            다루하루TV 블로그(daruharutv.com)는 별도의 회원가입 절차가 없으며,
            방문자의 개인정보를 수집하거나 저장하지 않습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            본 사이트는 단순히 정보를 제공하는 블로그이며,
            이메일 주소, 이름, 전화번호 등 어떠한 개인정보도 요구하거나 수집하지 않습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Google AdSense 광고</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 사이트는 Google AdSense를 통해 광고를 게재합니다.
            Google AdSense는 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 표시할 수 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Google의 광고 및 콘텐츠 개인 최적화, 광고 효과 측정, 잠재고객 통계를 위해
            쿠키 및 기타 기술이 사용될 수 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Google 광고 개인 최적화 설정은{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Google 광고 설정 페이지
            </a>
            에서 관리하실 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 쿠키(Cookie)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 사이트는 방문자의 편의를 위해 최소한의 쿠키를 사용할 수 있습니다.
            쿠키는 웹사이트가 사용자의 브라우저에 저장하는 작은 텍스트 파일입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            대부분의 웹 브라우저는 쿠키를 자동으로 허용하지만,
            브라우저 설정을 통해 쿠키를 차단하거나 삭제할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 외부 링크</h2>
          <p className="text-gray-700 leading-relaxed">
            본 사이트는 유튜브(YouTube) 등 외부 사이트로의 링크를 포함할 수 있습니다.
            외부 사이트의 개인정보 보호 정책은 해당 사이트의 정책을 따르며,
            본 사이트는 외부 사이트의 개인정보 처리에 대해 책임지지 않습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 정책 변경</h2>
          <p className="text-gray-700 leading-relaxed">
            본 개인정보처리방침은 법령 및 정책 변경에 따라 수정될 수 있으며,
            변경 시 본 페이지를 통해 공지됩니다.
          </p>
        </section>
      </div>

      {/* 돌아가기 버튼 */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
