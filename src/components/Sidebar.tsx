import Link from 'next/link';
import { getCategories, getRecentPosts, getPostsByCategory, type Locale } from '@/lib/posts';
import { t, localePrefix } from '@/lib/i18n';
import AdUnit from './AdUnit';

interface Props {
  locale?: Locale;
}

export default function Sidebar({ locale = 'ko' }: Props) {
  const labels = t(locale);
  const prefix = localePrefix(locale);
  const categories = getCategories(locale);
  const recentPosts = getRecentPosts(5, locale);

  const categoryPostCounts = categories.reduce((acc, category) => {
    acc[category.slug] = getPostsByCategory(category.slug, locale).length;
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
            {labels.categories}
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`${prefix}/category/${category.slug}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-300 group-hover:bg-blue-500 rounded-full mr-2.5"></span>
                    {category.name}
                    <span className="ml-1.5 text-xs text-gray-400">
                      {labels.postsCountInline(categoryPostCounts[category.slug])}
                    </span>
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
            {locale === 'ko' && (
              <li className="pt-1 mt-1 border-t border-gray-100">
                <Link
                  href="/recruitment"
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2.5"></span>
                    {labels.recruitment}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* 최신 글 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{labels.recentPosts}</h3>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500 text-sm">{labels.noPostsInRecent}</p>
        ) : (
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`${prefix}/post/${post.id}`} className="block group">
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
