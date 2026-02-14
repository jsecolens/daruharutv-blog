import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
          borderRadius: '36px',
        }}
      >
        <span
          style={{
            fontSize: '110px',
            fontWeight: 700,
            color: 'white',
          }}
        >
          다
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
