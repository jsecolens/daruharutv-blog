import Link from 'next/link';
import { Post, type Locale } from '@/lib/posts';
import { t, localePrefix } from '@/lib/i18n';

interface Props {
  posts: Post[];
  currentId: string;
  seriesName: string;
  locale?: Locale;
}

export default function SeriesNav({ posts, currentId, seriesName, locale = 'ko' }: Props) {
  if (posts.length < 2) return null;
  const labels = t(locale);
  const prefix = localePrefix(locale);

  return (
    <section
      aria-label={`${seriesName} ${labels.seriesLabel}`}
      className="mb-8 bg-blue-50/60 border border-blue-100 rounded-xl p-5"
    >
      <div className="flex items-center mb-4">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 text-white rounded-lg mr-3 text-lg"
        >
          📚
        </span>
        <div>
          <p className="text-xs text-blue-600 font-semibold tracking-wide mb-0.5">
            {labels.seriesLabel}
          </p>
          <p className="text-base font-bold text-gray-900">
            {seriesName}{' '}
            <span className="text-gray-500 font-normal text-sm">
              {labels.seriesEpisodeCount(posts.length)}
            </span>
          </p>
        </div>
      </div>

      <ol className="space-y-1.5">
        {posts.map((post, idx) => {
          const isCurrent = post.id === currentId;
          const orderNum = post.series?.order ?? idx + 1;

          if (isCurrent) {
            return (
              <li key={post.id}>
                <div className="flex items-start gap-3 py-2.5 px-3 bg-white rounded-lg border border-blue-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-md flex items-center justify-center mt-0.5">
                    {orderNum}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">
                      {labels.seriesCurrent}
                    </p>
                  </div>
                </div>
              </li>
            );
          }

          return (
            <li key={post.id}>
              <Link
                href={`${prefix}/post/${post.id}`}
                className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors group"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 text-xs font-bold rounded-md flex items-center justify-center mt-0.5 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {orderNum}
                </span>
                <p className="flex-1 text-sm text-gray-700 group-hover:text-blue-700 leading-snug">
                  {post.title}
                </p>
                <svg
                  className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
