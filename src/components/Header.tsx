'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  {
    name: '교직원 취업 준비',
    slug: 'edu-career',
    submenus: [
      { name: '대학교 부서와 하는 일', slug: 'university-departments' }
    ]
  },
  { name: '취업과 AI', slug: 'ai-job' },
  { name: '내 생각', slug: 'thoughts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">다루하루TV 블로그</span>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              홈
            </Link>

            <Link
              href="/notice"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              공지사항
            </Link>

            {/* 카테고리 드롭다운 (hover) */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => {
                setIsCategoryOpen(false);
                setActiveSubmenu(null);
              }}
            >
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                카테고리
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
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  {categories.map((category) => (
                    <div
                      key={category.slug}
                      onMouseEnter={() => setActiveSubmenu(category.slug)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                      className="relative"
                    >
                      <Link
                        href={`/category/${category.slug}`}
                        className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <span>{category.name}</span>
                        {category.submenus && category.submenus.length > 0 && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>

                      {/* 하위 메뉴 */}
                      {category.submenus && activeSubmenu === category.slug && (
                        <div className="absolute left-full top-0 ml-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                          {category.submenus.map((submenu) => (
                            <Link
                              key={submenu.slug}
                              href={`/${submenu.slug}`}
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {submenu.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
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
                href="/"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>

              <Link
                href="/notice"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </Link>

              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                카테고리
              </div>

              {categories.map((category) => (
                <div key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.submenus && category.submenus.map((submenu) => (
                    <Link
                      key={submenu.slug}
                      href={`/${submenu.slug}`}
                      className="px-10 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      └ {submenu.name}
                    </Link>
                  ))}
                </div>
              ))}

              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
