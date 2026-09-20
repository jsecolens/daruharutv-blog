'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  /** 'in-article' 로 지정하면 본문 흐름에 맞는 인아티클 광고로 렌더링 (adFormat 무시) */
  adLayout?: 'in-article';
  className?: string;
}

export default function AdUnit({ adSlot, adFormat = 'auto', adLayout, className = '' }: AdUnitProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  if (adLayout === 'in-article') {
    return (
      <div className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client="ca-pub-5871122852254069"
          data-ad-slot={adSlot}
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5871122852254069"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
