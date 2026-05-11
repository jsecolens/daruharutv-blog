import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - DaruharuTV',
  description:
    'DaruharuTV explains Korean university life, study-abroad logistics, and K-culture context for a global audience.',
  alternates: {
    canonical: '/en/about',
  },
};

export default function EnAboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10">
        <p className="text-blue-600 text-sm font-medium tracking-wider uppercase mb-2">About</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DaruharuTV</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A friendly guide to Korean university life, study-abroad logistics, and K-culture
          context — written for the curious reader who wants the small, real details that
          travel guides skip.
        </p>
      </header>

      <section className="prose prose-lg max-w-none mb-12">
        <h2>What you&rsquo;ll find here</h2>
        <ul>
          <li>
            <strong>Korean University Life</strong> — admissions, course registration, MT, clubs,
            and the rhythm of the Korean campus year.
          </li>
          <li>
            <strong>Study in Korea</strong> — practical guides for international students:
            applications, KGSP scholarships, exchange programs, settling in.
          </li>
          <li>
            <strong>Korean Culture 101</strong> — honorifics, hoesik, drinking culture, holidays,
            and everyday Korean manners.
          </li>
          <li>
            <strong>Working in Korea</strong> — first impressions of a Korean office, hierarchy,
            commute culture, and what nobody tells you on day one.
          </li>
        </ul>

        <h2>Who runs this</h2>
        <p>
          DaruharuTV is the English companion to{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            다루하루TV
          </Link>
          , a Korean-language site about university administration and career preparation in
          Korea. The English side is written from the same perspective — inside Korean
          universities — but for readers who are coming to Korea or just curious about it.
        </p>

        <h2>Get in touch</h2>
        <p>
          Subscribe to{' '}
          <a
            href="https://www.youtube.com/@daruharutv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            our YouTube channel
          </a>{' '}
          for video versions of these stories.
        </p>
      </section>
    </div>
  );
}
