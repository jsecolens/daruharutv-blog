import type { Locale } from './posts';

export const labels = {
  ko: {
    home: '홈',
    categories: '카테고리',
    about: 'About',
    notice: '공지사항',
    recruitment: '채용 공고 검색',
    recentPosts: '최신 글',
    moreLink: '더보기',
    relatedPosts: '관련 글',
    relatedPostsCurated: '함께 읽으면 좋은 글',
    relatedTag: '📄 관련 글',
    prev: '← 이전',
    next: '다음 →',
    noPostsYet: '아직 작성된 글이 없습니다.',
    noPostsInRecent: '아직 글이 없습니다.',
    breadcrumbHome: '홈',
    siteTitle: '다루하루TV 블로그',
    siteTagline: '공공기관, 교직원 취업 준비 정보',
    siteIntro:
      '공공기관, 교직원 취업 준비에 필요한 정보와 AI를 활용한 효율적인 준비 방법을 공유하는 블로그입니다. 함께 성장하는 커리어를 응원합니다.',
    privacy: '개인정보처리방침',
    youtube: 'YouTube',
    languageLabel: 'Language',
    postsCount: (n: number) => `${n}개의 글`,
    postsCountInline: (n: number) => `(${n})`,
    seriesLabel: '시리즈',
    seriesEpisodeCount: (n: number) => `· 전 ${n}편`,
    seriesCurrent: '현재 글',
  },
  en: {
    home: 'Home',
    categories: 'Categories',
    about: 'About',
    notice: 'Notice',
    recruitment: 'Job Listings',
    recentPosts: 'Recent Posts',
    moreLink: 'See more',
    relatedPosts: 'Related Posts',
    relatedPostsCurated: 'You may also like',
    relatedTag: '📄 Related',
    prev: '← Prev',
    next: 'Next →',
    noPostsYet: 'No posts yet.',
    noPostsInRecent: 'No posts yet.',
    breadcrumbHome: 'Home',
    siteTitle: 'DaruharuTV',
    siteTagline: 'Korean university life & culture, decoded',
    siteIntro:
      'A friendly guide to Korean university life, study-abroad logistics, K-culture context, and the small everyday details that travel guides skip.',
    privacy: 'Privacy Policy',
    youtube: 'YouTube',
    languageLabel: 'Language',
    postsCount: (n: number) => `${n} ${n === 1 ? 'post' : 'posts'}`,
    postsCountInline: (n: number) => `(${n})`,
    seriesLabel: 'Series',
    seriesEpisodeCount: (n: number) => `· ${n} parts`,
    seriesCurrent: 'You are here',
  },
} as const;

export function t(locale: Locale) {
  return labels[locale];
}

export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '/en' : '';
}

export function detectLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}
