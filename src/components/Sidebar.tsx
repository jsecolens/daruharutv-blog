import Link from 'next/link';
import { categories, getRecentPosts, getPostsByCategory } from '@/lib/posts';

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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">카테고리</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>{category.name} ({categoryPostCounts[category.slug]})</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/recruitment"
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span>채용 공고 검색</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        </ul>
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

      {/* 광고 영역 - 애드센스 승인 후 활성화 예정 */}
      {/* <div className="bg-gray-100 rounded-xl p-6 text-center">
        <p className="text-gray-500 text-sm">광고 영역</p>
        <p className="text-gray-400 text-xs mt-1">300 x 250</p>
      </div> */}
    </aside>
  );
}
