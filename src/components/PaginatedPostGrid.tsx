'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import { Post, type Locale } from '@/lib/posts';
import { t } from '@/lib/i18n';

const POSTS_PER_PAGE = 10;

interface PaginatedPostGridProps {
  posts: Post[];
  locale?: Locale;
}

export default function PaginatedPostGrid({ posts, locale = 'ko' }: PaginatedPostGridProps) {
  const labels = t(locale);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <p className="text-gray-500">{labels.noPostsYet}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {labels.prev}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {labels.next}
          </button>
        </nav>
      )}
    </>
  );
}
