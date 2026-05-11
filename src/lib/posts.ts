import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';

export type Locale = 'ko' | 'en';

const postsDirByLocale: Record<Locale, string> = {
  ko: path.join(process.cwd(), 'content/posts'),
  en: path.join(process.cwd(), 'content/posts-en'),
};

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  category: string;
  categoryName: string;
  date: string;
  readTime: string;
  thumbnail?: string;
  youtube?: string;
  featured?: boolean;
  relatedPosts?: string[];
  series?: {
    name: string;
    order: number;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
}

const koreanCategories: Category[] = [
  { name: '교직원 취업 준비', slug: 'edu-career', description: '채용 정보, 서류 준비, 면접 팁' },
  { name: '대학교 부서와 하는 일', slug: 'university-departments', description: '대학교 주요 부서의 역할과 업무' },
  { name: '취업과 AI', slug: 'ai-job', description: 'AI 도구 활용법, 효율적인 준비' },
  { name: '회사 생활', slug: 'office-life', description: '직장 생활 팁, MBTI, 조직 문화' },
  { name: 'TOEIC 공부', slug: 'toeic-study', description: '토익 공부법, 고득점 전략' },
  { name: '자격증', slug: 'certification', description: '자격증 시험 정보, 합격 전략' },
];

const englishCategories: Category[] = [
  {
    name: 'Korean University Life',
    slug: 'korean-university-life',
    description: 'Admissions, course registration, MT, clubs, and the Korean campus year',
  },
  {
    name: 'Study in Korea',
    slug: 'study-in-korea',
    description: 'A practical guide for international students: applications, KGSP, exchange programs',
  },
  {
    name: 'Korean Culture 101',
    slug: 'korean-culture-101',
    description: 'Honorifics, hoesik, drinking culture, holidays, and everyday Korean manners',
  },
  {
    name: 'Working in Korea',
    slug: 'working-in-korea',
    description: 'First impressions, hierarchy, and commute culture in Korean offices',
  },
];

const categoriesByLocale: Record<Locale, Category[]> = {
  ko: koreanCategories,
  en: englishCategories,
};

const categoryNameMapByLocale: Record<Locale, Record<string, string>> = {
  ko: {
    'edu-career': '교직원 취업 준비',
    'ai-job': '취업과 AI',
    'notice': '공지사항',
    'university-departments': '대학교 부서와 하는 일',
    'office-life': '회사 생활',
    'toeic-study': 'TOEIC 공부',
    'certification': '자격증',
  },
  en: Object.fromEntries(englishCategories.map((c) => [c.slug, c.name])),
};

const defaultCategoryByLocale: Record<Locale, string> = {
  ko: 'edu-career',
  en: 'korean-university-life',
};

// Backwards-compatible export (Korean)
export const categories = koreanCategories;

export function getCategories(locale: Locale = 'ko'): Category[] {
  return categoriesByLocale[locale];
}

function formatReadTime(content: string, locale: Locale): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return locale === 'en' ? `${minutes} min read` : `${minutes}분 읽기`;
}

function categoryNameFor(locale: Locale, slug: string): string {
  return categoryNameMapByLocale[locale][slug] || categoriesByLocale[locale][0].name;
}

export function getAllPosts(locale: Locale = 'ko'): Post[] {
  const dir = postsDirByLocale[locale];
  if (!fs.existsSync(dir)) {
    return [];
  }

  const fileNames = fs.readdirSync(dir);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const categorySlug = data.category || defaultCategoryByLocale[locale];

      return {
        id,
        title: data.title || (locale === 'en' ? 'Untitled' : '제목 없음'),
        description: data.excerpt || data.description || '',
        content,
        category: categorySlug,
        categoryName: categoryNameFor(locale, categorySlug),
        date: data.date || new Date().toISOString().split('T')[0],
        readTime: formatReadTime(content, locale),
        thumbnail: data.image || data.thumbnail,
        youtube: data.youtube,
        featured: data.featured || false,
        relatedPosts: data.relatedPosts || undefined,
        series: data.series || undefined,
      } as Post;
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostById(id: string, locale: Locale = 'ko'): Promise<Post | null> {
  try {
    const dir = postsDirByLocale[locale];
    const fullPath = path.join(dir, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(gfm).use(html, { sanitize: false }).process(content);
    const contentHtml = processedContent.toString();
    const categorySlug = data.category || defaultCategoryByLocale[locale];

    return {
      id,
      title: data.title || (locale === 'en' ? 'Untitled' : '제목 없음'),
      description: data.excerpt || data.description || '',
      content,
      contentHtml,
      category: categorySlug,
      categoryName: categoryNameFor(locale, categorySlug),
      date: data.date || new Date().toISOString().split('T')[0],
      readTime: formatReadTime(content, locale),
      thumbnail: data.image || data.thumbnail,
      youtube: data.youtube,
      featured: data.featured || false,
      relatedPosts: data.relatedPosts || undefined,
      series: data.series || undefined,
    };
  } catch {
    return null;
  }
}

export function getSeriesPosts(seriesName: string, locale: Locale = 'ko'): Post[] {
  return getAllPosts(locale)
    .filter((p) => p.series?.name === seriesName)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));
}

export function getPostsByCategory(categorySlug: string, locale: Locale = 'ko'): Post[] {
  return getAllPosts(locale).filter((post) => post.category === categorySlug);
}

export function getPostsBySlugs(slugs: string[], locale: Locale = 'ko'): Post[] {
  const allPosts = getAllPosts(locale);
  return slugs
    .map((slug) => allPosts.find((post) => post.id === slug))
    .filter((post): post is Post => post !== undefined);
}

export function getRecentPosts(limit: number = 5, locale: Locale = 'ko'): Post[] {
  return getAllPosts(locale).slice(0, limit);
}

export function getCategoryBySlug(slug: string, locale: Locale = 'ko'): Category | undefined {
  return categoriesByLocale[locale].find((cat) => cat.slug === slug);
}

export function getAllPostIds(locale: Locale = 'ko'): string[] {
  const dir = postsDirByLocale[locale];
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
