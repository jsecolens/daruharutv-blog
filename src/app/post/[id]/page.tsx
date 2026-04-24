import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostById, getPostsByCategory, getPostsBySlugs, getAllPostIds } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import AdUnit from '@/components/AdUnit';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return { title: '글을 찾을 수 없습니다' };
  }

  return {
    title: `${post.title} - 다루하루TV`,
    description: post.description,
    alternates: {
      canonical: `/post/${id}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `/post/${id}`,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  // 큐레이션된 관련 글 (frontmatter에서 지정)
  const curatedRelatedPosts = post.relatedPosts ? getPostsBySlugs(post.relatedPosts) : [];

  // 자동 관련 글 (같은 카테고리에서 현재 글 및 큐레이션 글 제외)
  const curatedIds = new Set(curatedRelatedPosts.map((p) => p.id));
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.id !== post.id && !curatedIds.has(p.id))
    .slice(0, 3);

  // 본문을 <hr> 기준으로 분할하여 중간에 광고 삽입
  const contentHtml = post.contentHtml || '';
  const sections = contentHtml.split(/<hr\s*\/?>/);
  const midpoint = Math.ceil(sections.length / 2);
  const firstHalf = sections.slice(0, midpoint).join('<hr>');
  const secondHalf = sections.slice(midpoint).join('<hr>');
  const hasEnoughSections = sections.length >= 3;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/category/${post.category}`} className="hover:text-blue-600">
          {post.categoryName}
        </Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* 글 헤더 */}
      <header className="mb-8">
        <Link
          href={`/category/${post.category}`}
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
          <span>{post.readTime} 읽기</span>
        </div>
      </header>

      {/* 썸네일 이미지 */}
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

      {/* 본문 시작 직전 광고 */}
      <AdUnit adSlot="8294951272" adFormat="auto" className="mb-8" />

      {/* 본문 - HTML로 렌더링 */}
      {hasEnoughSections ? (
        <>
          <div
            className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: firstHalf }}
          />
          {/* 포스트 중간 광고 */}
          <AdUnit adSlot="2326647252" adFormat="auto" className="my-8" />
          <div
            className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: secondHalf }}
          />
        </>
      ) : (
        <div
          className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}

      {/* 큐레이션된 관련 글 카드 */}
      {curatedRelatedPosts.length > 0 && (
        <div className="mb-8 max-w-3xl mx-auto space-y-3">
          <p className="text-sm font-semibold text-gray-500 mb-4">함께 읽으면 좋은 글</p>
          {curatedRelatedPosts.map((related) => (
            <Link
              key={related.id}
              href={`/post/${related.id}`}
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
                <div className="text-xs font-semibold text-blue-600 mb-1">📄 관련 글</div>
                <div className="text-base font-bold text-gray-900 mb-1 leading-tight">{related.title}</div>
                <div className="text-sm text-gray-500 leading-snug line-clamp-2">{related.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 유튜브 영상 */}
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

      {/* 포스트 하단 광고 */}
      <AdUnit adSlot="7982007036" adFormat="auto" className="mb-8" />

      {/* 관련 글 */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">관련 글</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
