import Link from 'next/link';
import { categories, getRecentPosts, getPostsByCategory } from '@/lib/posts';
import AdUnit from './AdUnit';

export default function Sidebar() {
  const recentPosts = getRecentPosts(5);

  // 각 카테고리별 글 개수 계산
  const categoryPostCounts = categories.reduce((acc, category) => {
    acc[category.slug] = getPostsByCategory(category.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="space-y-8">
      {/* 카테고리 */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            카테고리
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-300 group-hover:bg-blue-500 rounded-full mr-2.5"></span>
                    {category.name}
                    <span className="ml-1.5 text-xs text-gray-400">({categoryPostCounts[category.slug]})</span>
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
            <li className="pt-1 mt-1 border-t border-gray-100">
              <Link
                href="/recruitment"
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2.5"></span>
                  채용 공고 검색
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 최신 글 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">최신 글</h3>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">아직 글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/post/${post.id}`}
                  className="block group"
                >
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 사이드바 광고 */}
      <AdUnit adSlot="5331685161" adFormat="auto" className="rounded-xl overflow-hidden" />
    </aside>
  );
}
