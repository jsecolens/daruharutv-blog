import { MetadataRoute } from 'next';
import { getAllPosts, getCategories } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://daruharutv.com';

  // 한국어 정적 페이지
  const koStaticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notice`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/university-departments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 한국어 카테고리 페이지
  const koCategoryPages: MetadataRoute.Sitemap = getCategories('ko').map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 한국어 포스트 페이지
  const koPostPages: MetadataRoute.Sitemap = getAllPosts('ko').map((post) => ({
    url: `${baseUrl}/post/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 영문 정적 페이지
  const enStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 영문 카테고리 페이지
  const enCategoryPages: MetadataRoute.Sitemap = getCategories('en').map((category) => ({
    url: `${baseUrl}/en/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 영문 포스트 페이지
  const enPostPages: MetadataRoute.Sitemap = getAllPosts('en').map((post) => ({
    url: `${baseUrl}/en/post/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...koStaticPages,
    ...koCategoryPages,
    ...koPostPages,
    ...enStaticPages,
    ...enCategoryPages,
    ...enPostPages,
  ];
}
