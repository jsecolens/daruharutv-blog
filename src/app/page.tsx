import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import AdUnit from '@/components/AdUnit';
import { getAllPosts, categories, getPostById } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const posts = getAllPosts();
  // 교무처 글을 히어로 섹션에 고정
  const featuredPost = await getPostById('academic-affairs-office');
  const recentPosts = posts.slice(0, 4);

  // 글이 있는 카테고리만 필터링 후 전반/후반 분리 (중간 광고용)
  const activeCategories = categories.filter(
    (cat) => posts.some((p) => p.category === cat.slug)
  );
  const midPoint = Math.ceil(activeCategories.length / 2);
  const firstHalfCategories = activeCategories.slice(0, midPoint);
  const secondHalfCategories = activeCategories.slice(midPoint);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 히어로 섹션 */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            교직원 취업 정보 & AI 활용 블로그
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            교직원 취업 준비에 필요한 정보와 AI를 활용한 효율적인 준비 방법을 공유합니다.
          </p>
        </div>

        {/* 피처드 포스트 */}
        {featuredPost && <PostCard post={featuredPost} featured />}
      </section>

      {/* 히어로 아래 광고 */}
      <AdUnit adSlot="4569267834" className="mb-12" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          {/* 카테고리별 미리보기 - 전반부 */}
          {firstHalfCategories.map((category) => {
            const categoryPosts = posts.filter((p) => p.category === category.slug).slice(0, 2);
            return (
              <section key={category.slug} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                  </div>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    더보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* 카테고리 중간 광고 */}
          {secondHalfCategories.length > 0 && (
            <AdUnit adSlot="2326647252" className="mb-12" />
          )}

          {/* 카테고리별 미리보기 - 후반부 */}
          {secondHalfCategories.map((category) => {
            const categoryPosts = posts.filter((p) => p.category === category.slug).slice(0, 2);
            return (
              <section key={category.slug} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                  </div>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    더보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* 최신 글 */}
          {recentPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">최신 글</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* 하단 광고 */}
          <AdUnit adSlot="7982007036" className="mt-12" />
        </div>

        {/* 사이드바 (PC에서만 표시) */}
        <div className="hidden lg:block w-80">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
