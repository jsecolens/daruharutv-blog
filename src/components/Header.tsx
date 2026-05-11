'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { detectLocaleFromPath, t, localePrefix } from '@/lib/i18n';
import type { Locale } from '@/lib/posts';

const koCategories = [
  { name: '교직원 취업 준비', slug: 'edu-career' },
  { name: '대학교 부서와 하는 일', slug: 'university-departments' },
  { name: '취업과 AI', slug: 'ai-job' },
  { name: '회사 생활', slug: 'office-life' },
  { name: 'TOEIC 공부', slug: 'toeic-study' },
  { name: '자격증', slug: 'certification' },
];

const enCategories = [
  { name: 'Korean University Life', slug: 'korean-university-life' },
  { name: 'Study in Korea', slug: 'study-in-korea' },
  { name: 'Korean Culture 101', slug: 'korean-culture-101' },
  { name: 'Working in Korea', slug: 'working-in-korea' },
];

export default function Header() {
  const pathname = usePathname() ?? '/';
  const locale: Locale = detectLocaleFromPath(pathname);
  const labels = t(locale);
  const prefix = localePrefix(locale);
  const categories = locale === 'en' ? enCategories : koCategories;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryTimerRef = useRef<NodeJS.Timeout | null>(null);

  const homeHref = prefix === '' ? '/' : prefix;
  const aboutHref = `${prefix}/about`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href={homeHref} className="flex items-center">
            <span className="text-xl font-bold text-gray-900">{labels.siteTitle}</span>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={homeHref}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {labels.home}
            </Link>

            {locale === 'ko' && (
              <>
                <Link
                  href="/notice"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {labels.notice}
                </Link>

                <Link
                  href="/recruitment"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {labels.recruitment}
                </Link>
              </>
            )}

            {/* 카테고리 드롭다운 (hover) */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (categoryTimerRef.current) {
                  clearTimeout(categoryTimerRef.current);
                }
                setIsCategoryOpen(true);
              }}
              onMouseLeave={() => {
                categoryTimerRef.current = setTimeout(() => {
                  setIsCategoryOpen(false);
                }, 200);
              }}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {labels.categories}
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`${prefix}/category/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={aboutHref}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {labels.about}
            </Link>

            {/* 언어 토글 (PC) */}
            <LanguageToggle locale={locale} />
          </nav>

          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href={homeHref}
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {labels.home}
              </Link>

              {locale === 'ko' && (
                <>
                  <Link
                    href="/notice"
                    className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {labels.notice}
                  </Link>

                  <Link
                    href="/recruitment"
                    className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {labels.recruitment}
                  </Link>
                </>
              )}

              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                {labels.categories}
              </div>

              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`${prefix}/category/${category.slug}`}
                  className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}

              <Link
                href={aboutHref}
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {labels.about}
              </Link>

              <div className="px-4 pt-3 mt-2 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  {labels.languageLabel}
                </div>
                <LanguageToggle locale={locale} onNavigate={() => setIsMenuOpen(false)} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function LanguageToggle({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate?: () => void;
}) {
  const baseClasses = 'px-2 py-1 text-sm transition-colors';
  const activeClasses = 'font-semibold text-gray-900';
  const inactiveClasses = 'text-gray-500 hover:text-blue-600';

  return (
    <div className="flex items-center text-sm">
      <Link
        href="/"
        onClick={onNavigate}
        className={`${baseClasses} ${locale === 'ko' ? activeClasses : inactiveClasses}`}
        aria-current={locale === 'ko' ? 'true' : undefined}
      >
        한국어
      </Link>
      <span className="text-gray-300">|</span>
      <Link
        href="/en"
        onClick={onNavigate}
        className={`${baseClasses} ${locale === 'en' ? activeClasses : inactiveClasses}`}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        English
      </Link>
    </div>
  );
}
