import { notFound } from 'next/navigation';
import PaginatedPostGrid from '@/components/PaginatedPostGrid';
import Sidebar from '@/components/Sidebar';
import { getPostsByCategory, getCategoryBySlug, categories } from '@/lib/posts';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: '카테고리를 찾을 수 없습니다' };
  }

  return {
    title: `${category.name} - 다루하루TV`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = getPostsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* 카테고리 헤더 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">{categoryPosts.length}개의 글</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          <PaginatedPostGrid posts={categoryPosts} />
        </div>

        {/* 사이드바 */}
        <div className="hidden lg:block w-80">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
