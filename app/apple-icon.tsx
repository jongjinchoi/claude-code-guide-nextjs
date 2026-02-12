import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#CC785C',
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Antenna */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 82,
            width: 16,
            height: 20,
            background: 'white',
            borderRadius: 3,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 78,
            width: 24,
            height: 24,
            background: 'white',
            borderRadius: 12,
            display: 'flex',
          }}
        />
        {/* Head */}
        <div
          style={{
            width: 100,
            height: 68,
            background: 'white',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            marginTop: 20,
          }}
        >
          {/* Eyes */}
          <div
            style={{
              width: 20,
              height: 20,
              background: '#CC785C',
              borderRadius: 10,
              display: 'flex',
            }}
          />
          <div
            style={{
              width: 20,
              height: 20,
              background: '#CC785C',
              borderRadius: 10,
              display: 'flex',
            }}
          />
        </div>
        {/* Body */}
        <div
          style={{
            width: 76,
            height: 46,
            background: 'white',
            borderRadius: 6,
            marginTop: 8,
            display: 'flex',
            position: 'relative',
          }}
        />
        {/* Left Arm */}
        <div
          style={{
            position: 'absolute',
            left: 22,
            top: 112,
            width: 26,
            height: 10,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
          }}
        />
        {/* Right Arm */}
        <div
          style={{
            position: 'absolute',
            right: 22,
            top: 112,
            width: 26,
            height: 10,
            background: 'white',
            borderRadius: 4,
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
