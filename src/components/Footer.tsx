'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { detectLocaleFromPath, t, localePrefix } from '@/lib/i18n';

const koFooterCategories = [
  { name: '교직원 취업 준비', slug: 'edu-career' },
  { name: '취업과 AI', slug: 'ai-job' },
  { name: 'TOEIC 공부', slug: 'toeic-study' },
];

const enFooterCategories = [
  { name: 'Korean University Life', slug: 'korean-university-life' },
  { name: 'Study in Korea', slug: 'study-in-korea' },
  { name: 'Korean Culture 101', slug: 'korean-culture-101' },
];

export default function Footer() {
  const pathname = usePathname() ?? '/';
  const locale = detectLocaleFromPath(pathname);
  const labels = t(locale);
  const prefix = localePrefix(locale);
  const footerCategories = locale === 'en' ? enFooterCategories : koFooterCategories;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 블로그 소개 */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold text-white">{labels.siteTitle}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{labels.siteIntro}</p>
          </div>

          {/* 카테고리 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{labels.categories}</h3>
            <ul className="space-y-2">
              {footerCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`${prefix}/category/${category.slug}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${prefix}/about`}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {labels.about}
                </Link>
              </li>
              {locale === 'ko' && (
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {labels.privacy}
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="https://www.youtube.com/@daruharutv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center"
                >
                  {labels.youtube}
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 다루하루TV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
