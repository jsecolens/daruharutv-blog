import { notFound } from 'next/navigation';
import PaginatedPostGrid from '@/components/PaginatedPostGrid';
import Sidebar from '@/components/Sidebar';
import { getPostsByCategory, getCategoryBySlug, getCategories } from '@/lib/posts';
import { t } from '@/lib/i18n';
import Link from 'next/link';

const LOCALE = 'en' as const;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCategories(LOCALE).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, LOCALE);

  if (!category) {
    return { title: 'Category not found' };
  }

  return {
    title: `${category.name} - DaruharuTV`,
    description: category.description,
    alternates: {
      canonical: `/en/category/${slug}`,
    },
  };
}

export default async function EnCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, LOCALE);

  if (!category) {
    notFound();
  }

  const labels = t(LOCALE);
  const categoryPosts = getPostsByCategory(slug, LOCALE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/en" className="hover:text-blue-600">
          {labels.breadcrumbHome}
        </Link>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">{labels.postsCount(categoryPosts.length)}</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PaginatedPostGrid posts={categoryPosts} locale={LOCALE} />
        </div>

        <div className="hidden lg:block w-80">
          <Sidebar locale={LOCALE} />
        </div>
      </div>
    </div>
  );
}
