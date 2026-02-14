import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = '다루하루TV - 교직원 취업 정보 & AI 활용';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'white',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-150px',
              left: '-50px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'white',
            }}
          />
        </div>

        {/* 로고 아이콘 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '30px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            다
          </span>
        </div>

        {/* 블로그 이름 */}
        <span
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-1px',
          }}
        >
          다루하루TV
        </span>

        {/* 태그라인 */}
        <span
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.85)',
            marginTop: '16px',
          }}
        >
          교직원 취업 정보 &amp; AI 활용 블로그
        </span>

        {/* URL */}
        <span
          style={{
            fontSize: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.6)',
            marginTop: '24px',
          }}
        >
          daruharutv.com
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
