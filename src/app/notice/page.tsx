import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '공지사항 - 다루하루TV',
  description: '다루하루TV의 공지사항 및 업데이트 소식을 확인하세요.',
};

// 임시 공지사항 데이터
const notices = [
  {
    id: 1,
    title: '다루하루TV 블로그 오픈!',
    date: '2024-01-15',
    content: '교직원 취업 정보와 AI 활용법을 공유하는 블로그를 오픈했습니다. 많은 관심 부탁드립니다!',
    important: true,
  },
  {
    id: 2,
    title: '정기 업데이트 안내',
    date: '2024-01-10',
    content: '매주 화요일과 금요일에 새로운 글이 업데이트될 예정입니다.',
    important: false,
  },
];

export default function NoticePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <header className="mb-12">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">홈</Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">공지사항</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">공지사항</h1>
        <p className="text-gray-600">다루하루TV의 새로운 소식을 확인하세요</p>
      </header>

      {/* 공지사항 목록 */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <article
            key={notice.id}
            className={`bg-white rounded-xl p-6 shadow-sm border ${
              notice.important ? 'border-blue-300 bg-blue-50/30' : 'border-gray-100'
            } hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {notice.important && (
                  <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                    중요
                  </span>
                )}
                <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{notice.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{notice.content}</p>
          </article>
        ))}
      </div>

      {/* 빈 상태 */}
      {notices.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
        </div>
      )}

      {/* 돌아가기 버튼 */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
