import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import AdUnit from '@/components/AdUnit';
import { getAllPosts, categories } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const posts = getAllPosts();
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
        {/* SEO·접근성용 헤딩 (이미지에 시각적 텍스트 포함) */}
        <h1 className="sr-only">취업 정보 & AI 활용 블로그</h1>
        <p className="sr-only">
          공공기관, 교직원 취업 준비에 필요한 정보와 AI를 활용한 효율적인 준비 방법을 공유합니다.
        </p>

        {/* 히어로 배너 - 교직원 취업 준비 카테고리로 연결 */}
        <Link
          href="/category/edu-career"
          aria-label="대학교 교직원 취업 준비 카테고리 보기"
          className="block group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-[200px] md:h-80 lg:h-[400px]">
            <Image
              src="/images/hero-main.jpg"
              alt="취업 정보 & AI 활용 블로그 — 공공기관, 교직원 취업 준비에 필요한 정보와 AI를 활용한 효율적인 준비 방법을 공유합니다."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1120px"
              className="object-cover object-[center_30%] group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </Link>
      </section>

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

        </div>

        {/* 사이드바 (PC에서만 표시) */}
        <div className="hidden lg:block w-80">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
