import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getPostById,
  getPostsByCategory,
  getPostsBySlugs,
  getAllPostIds,
  getSeriesPosts,
} from '@/lib/posts';
import PostCard from '@/components/PostCard';
import AdUnit from '@/components/AdUnit';
import SeriesNav from '@/components/SeriesNav';
import { t } from '@/lib/i18n';

const LOCALE = 'en' as const;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllPostIds(LOCALE).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id, LOCALE);

  if (!post) {
    return { title: 'Post not found' };
  }

  return {
    title: `${post.title} - DaruharuTV`,
    description: post.description,
    alternates: {
      canonical: `/en/post/${id}`,
      languages: {
        en: `/en/post/${id}`,
        'x-default': `/en/post/${id}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/en/post/${id}`,
      locale: 'en_US',
      siteName: 'DaruharuTV',
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    other: {
      'content-language': 'en',
    },
  };
}

export default async function EnPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id, LOCALE);

  if (!post) {
    notFound();
  }

  const labels = t(LOCALE);
  const seriesPosts = post.series?.name ? getSeriesPosts(post.series.name, LOCALE) : [];
  const curatedRelatedPosts = post.relatedPosts ? getPostsBySlugs(post.relatedPosts, LOCALE) : [];
  const curatedIds = new Set(curatedRelatedPosts.map((p) => p.id));
  const relatedPosts = getPostsByCategory(post.category, LOCALE)
    .filter((p) => p.id !== post.id && !curatedIds.has(p.id))
    .slice(0, 3);

  const contentHtml = post.contentHtml || '';
  const sections = contentHtml.split(/<hr\s*\/?>/);
  const isLongPost = sections.length >= 7;
  const hasEnoughSections = sections.length >= 3;

  let firstPart = '';
  let secondPart = '';
  let thirdPart = '';

  if (isLongPost) {
    const firstSplit = Math.floor(sections.length / 3);
    const secondSplit = Math.floor((sections.length * 2) / 3);
    firstPart = sections.slice(0, firstSplit).join('<hr>');
    secondPart = sections.slice(firstSplit, secondSplit).join('<hr>');
    thirdPart = sections.slice(secondSplit).join('<hr>');
  } else if (hasEnoughSections) {
    const midpoint = Math.ceil(sections.length / 2);
    firstPart = sections.slice(0, midpoint).join('<hr>');
    secondPart = sections.slice(midpoint).join('<hr>');
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      <aside className="hidden xl:block absolute top-8 right-4 w-[160px]">
        <AdUnit adSlot="5272739095" adFormat="auto" />
      </aside>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/en" className="hover:text-blue-600">
            {labels.breadcrumbHome}
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/en/category/${post.category}`} className="hover:text-blue-600">
            {post.categoryName}
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 truncate max-w-xs">{post.title}</span>
        </nav>

        <header className="mb-8">
          <Link
            href={`/en/category/${post.category}`}
            className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4 hover:bg-blue-200 transition-colors"
          >
            {post.categoryName}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">{post.description}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>{post.date}</span>
            <span className="mx-2">·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {post.thumbnail && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {seriesPosts.length >= 2 && post.series && (
          <SeriesNav
            posts={seriesPosts}
            currentId={post.id}
            seriesName={post.series.name}
            locale={LOCALE}
          />
        )}

        <AdUnit adSlot="8294951272" adFormat="auto" className="mb-8" />

        {isLongPost ? (
          <>
            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: firstPart }}
            />
            <AdUnit adSlot="2326647252" adFormat="auto" className="my-8" />
            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: secondPart }}
            />
            <AdUnit adSlot="6825268570" adFormat="auto" className="my-8 hidden md:block" />
            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: thirdPart }}
            />
          </>
        ) : hasEnoughSections ? (
          <>
            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: firstPart }}
            />
            <AdUnit adSlot="2326647252" adFormat="auto" className="my-8" />
            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: secondPart }}
            />
          </>
        ) : (
          <div
            className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        {curatedRelatedPosts.length > 0 && (
          <div className="mb-8 max-w-3xl mx-auto space-y-3">
            <p className="text-sm font-semibold text-gray-500 mb-4">{labels.relatedPostsCurated}</p>
            {curatedRelatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/en/post/${related.id}`}
                className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl no-underline text-inherit hover:bg-gray-100 hover:border-gray-300 transition-all"
              >
                {related.thumbnail && (
                  <Image
                    src={related.thumbnail}
                    alt={related.title}
                    width={140}
                    height={90}
                    className="rounded-lg object-cover flex-shrink-0"
                    style={{ width: 140, height: 90, margin: 0 }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-blue-600 mb-1">{labels.relatedTag}</div>
                  <div className="text-base font-bold text-gray-900 mb-1 leading-tight">{related.title}</div>
                  <div className="text-sm text-gray-500 leading-snug line-clamp-2">{related.description}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {post.youtube && (
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src={post.youtube}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        )}

        <AdUnit adSlot="7982007036" adFormat="auto" className="mb-8" />

        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{labels.relatedPosts}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} locale={LOCALE} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
