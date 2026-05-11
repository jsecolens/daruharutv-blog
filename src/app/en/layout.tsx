import type { Metadata } from 'next';
import HtmlLangSetter from '@/components/HtmlLangSetter';

export const metadata: Metadata = {
  metadataBase: new URL('https://daruharutv.com'),
  title: 'DaruharuTV — Korean university life & culture, decoded',
  description:
    'A friendly guide to Korean university life, study-abroad logistics, K-culture context, and the small everyday details that travel guides skip.',
  keywords:
    'Korean university, study in Korea, Korean culture, working in Korea, KGSP',
  alternates: {
    canonical: '/en',
    languages: {
      ko: '/',
      en: '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DaruharuTV',
    url: 'https://daruharutv.com/en',
    title: 'DaruharuTV — Korean university life & culture, decoded',
    description:
      'A friendly guide to Korean university life, study-abroad logistics, K-culture context, and the small everyday details that travel guides skip.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DaruharuTV — Korean university life & culture, decoded',
    description:
      'A friendly guide to Korean university life, study-abroad logistics, and K-culture context.',
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLangSetter lang="en" />
      {children}
    </>
  );
}
