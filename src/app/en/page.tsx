import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import AdUnit from '@/components/AdUnit';
import { getAllPosts, getCategories } from '@/lib/posts';
import { t } from '@/lib/i18n';

const LOCALE = 'en' as const;

export default async function EnHome() {
  const labels = t(LOCALE);
  const posts = getAllPosts(LOCALE);
  const recentPosts = posts.slice(0, 4);

  const allCategories = getCategories(LOCALE);
  const activeCategories = allCategories.filter((cat) =>
    posts.some((p) => p.category === cat.slug)
  );
  const midPoint = Math.ceil(activeCategories.length / 2);
  const firstHalfCategories = activeCategories.slice(0, midPoint);
  const secondHalfCategories = activeCategories.slice(midPoint);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="sr-only">{labels.siteTagline}</h1>
        <p className="sr-only">{labels.siteIntro}</p>

        <Link
          href="/en/category/study-in-korea"
          aria-label="Explore the Study in Korea category"
          className="block group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-[200px] md:h-80 lg:h-[400px]">
            <Image
              src="/images/hero-en-v3.jpg"
              alt="DaruharuTV — Korean university life and culture, decoded for a global audience."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1120px"
              className="object-cover object-[center_54%] group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </Link>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Empty state when there are no posts yet */}
          {posts.length === 0 && (
            <section className="bg-white rounded-xl p-12 text-center border border-gray-100 mb-12">
              <p className="text-gray-500">{labels.noPostsYet}</p>
            </section>
          )}

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
                    href={`/en/category/${category.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    {labels.moreLink}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} locale={LOCALE} />
                  ))}
                </div>
              </section>
            );
          })}

          {secondHalfCategories.length > 0 && (
            <AdUnit adSlot="2326647252" className="mb-12" />
          )}

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
                    href={`/en/category/${category.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    {labels.moreLink}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} locale={LOCALE} />
                  ))}
                </div>
              </section>
            );
          })}

          {recentPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.recentPosts}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} locale={LOCALE} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="hidden lg:block w-80">
          <Sidebar locale={LOCALE} />
        </div>
      </div>
    </div>
  );
}
