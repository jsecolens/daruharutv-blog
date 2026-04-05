import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

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
}

export const categories = [
  { name: '교직원 취업 준비', slug: 'edu-career', description: '채용 정보, 서류 준비, 면접 팁' },
  { name: '대학교 부서와 하는 일', slug: 'university-departments', description: '대학교 주요 부서의 역할과 업무' },
  { name: '취업과 AI', slug: 'ai-job', description: 'AI 도구 활용법, 효율적인 준비' },
  { name: '회사 생활', slug: 'office-life', description: '직장 생활 팁, MBTI, 조직 문화' },
  { name: 'TOEIC 공부', slug: 'toeic-study', description: '토익 공부법, 고득점 전략' },
  { name: '자격증', slug: 'certification', description: '자격증 시험 정보, 합격 전략' },
];

const categoryNameMap: Record<string, string> = {
  'edu-career': '교직원 취업 준비',
  'ai-job': '취업과 AI',
  'notice': '공지사항',
  'university-departments': '대학교 부서와 하는 일',
  'office-life': '회사 생활',
  'toeic-study': 'TOEIC 공부',
  'certification': '자격증',
};

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes}분`;
}

export function getAllPosts(): Post[] {
  // content/posts 폴더가 없으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id,
        title: data.title || '제목 없음',
        description: data.excerpt || data.description || '',
        content,
        category: data.category || 'edu-career',
        categoryName: categoryNameMap[data.category] || '교직원 취업 준비',
        date: data.date || new Date().toISOString().split('T')[0],
        readTime: calculateReadTime(content),
        thumbnail: data.image || data.thumbnail,
        youtube: data.youtube,
        featured: data.featured || false,
      } as Post;
    });

  // 날짜 기준 내림차순 정렬
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환 (sanitize: false로 HTML 태그 허용)
    const processedContent = await remark().use(html, { sanitize: false }).process(content);
    const contentHtml = processedContent.toString();

    return {
      id,
      title: data.title || '제목 없음',
      description: data.excerpt || data.description || '',
      content,
      contentHtml,
      category: data.category || 'edu-career',
      categoryName: categoryNameMap[data.category] || '교직원 취업 준비',
      date: data.date || new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(content),
      thumbnail: data.image || data.thumbnail,
      youtube: data.youtube,
      featured: data.featured || false,
    };
  } catch {
    return null;
  }
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === categorySlug);
}

export function getRecentPosts(limit: number = 5): Post[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
