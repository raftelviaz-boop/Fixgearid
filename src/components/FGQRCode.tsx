import React from 'react';

interface FGQRCodeProps {
  size?: number | string;
  className?: string;
  riderId?: string;
}

export const FGQRCode: React.FC<FGQRCodeProps> = ({
  size = '100%',
  className = '',
  riderId = 'FGM-2503127',
}) => {
  return (
    <div
      className={`relative inline-block select-none overflow-hidden bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${className}`}
      style={{ width: size, maxWidth: '100%', aspectRatio: '1/1' }}
      title={`Rider Verification QR: ${riderId}`}
    >
      <svg
        viewBox="0 0 220 220"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
      >
        {/* White Canvas Background */}
        <rect width="220" height="220" fill="#ffffff" />

        {/* QR DATA MODULE MATRIX */}
        <g fill="#000000">
          {/* Top-Left Finder Pattern (7x7 module at pos 16,16) */}
          <rect x="16" y="16" width="48" height="48" />
          <rect x="23" y="23" width="34" height="34" fill="#ffffff" />
          <rect x="30" y="30" width="20" height="20" />

          {/* Top-Right Finder Pattern (7x7 module at pos 156,16) */}
          <rect x="156" y="16" width="48" height="48" />
          <rect x="163" y="23" width="34" height="34" fill="#ffffff" />
          <rect x="170" y="30" width="20" height="20" />

          {/* Bottom-Left Finder Pattern (7x7 module at pos 16,156) */}
          <rect x="16" y="156" width="48" height="48" />
          <rect x="23" y="163" width="34" height="34" fill="#ffffff" />
          <rect x="30" y="170" width="20" height="20" />

          {/* Top Row Data Blocks */}
          <rect x="72" y="16" width="7" height="7" />
          <rect x="86" y="16" width="14" height="7" />
          <rect x="107" y="16" width="7" height="14" />
          <rect x="121" y="16" width="21" height="7" />
          <rect x="149" y="16" width="7" height="7" />

          {/* Row 2 */}
          <rect x="72" y="28" width="14" height="7" />
          <rect x="93" y="28" width="7" height="14" />
          <rect x="128" y="28" width="14" height="7" />
          <rect x="149" y="28" width="7" height="7" />

          {/* Row 3 */}
          <rect x="79" y="42" width="7" height="14" />
          <rect x="100" y="42" width="14" height="7" />
          <rect x="121" y="42" width="7" height="14" />
          <rect x="142" y="42" width="7" height="7" />

          {/* Timing Pattern Horizontal */}
          <rect x="70" y="56" width="7" height="7" />
          <rect x="84" y="56" width="7" height="7" />
          <rect x="98" y="56" width="7" height="7" />
          <rect x="112" y="56" width="7" height="7" />
          <rect x="126" y="56" width="7" height="7" />
          <rect x="140" y="56" width="7" height="7" />

          {/* Timing Pattern Vertical */}
          <rect x="56" y="70" width="7" height="7" />
          <rect x="56" y="84" width="7" height="7" />
          <rect x="56" y="98" width="7" height="7" />
          <rect x="56" y="112" width="7" height="7" />
          <rect x="56" y="126" width="7" height="7" />
          <rect x="56" y="140" width="7" height="7" />

          {/* Left Column Data */}
          <rect x="16" y="72" width="14" height="7" />
          <rect x="37" y="72" width="7" height="14" />
          <rect x="16" y="86" width="7" height="14" />
          <rect x="30" y="86" width="14" height="7" />
          <rect x="16" y="107" width="28" height="7" />
          <rect x="37" y="121" width="7" height="14" />
          <rect x="16" y="135" width="14" height="14" />
          <rect x="37" y="142" width="14" height="7" />

          {/* Right Column Data */}
          <rect x="156" y="72" width="14" height="14" />
          <rect x="177" y="72" width="7" height="7" />
          <rect x="191" y="72" width="14" height="7" />
          <rect x="170" y="86" width="14" height="14" />
          <rect x="191" y="93" width="14" height="7" />
          <rect x="156" y="107" width="21" height="7" />
          <rect x="184" y="107" width="7" height="14" />
          <rect x="198" y="114" width="7" height="14" />
          <rect x="156" y="121" width="14" height="14" />
          <rect x="177" y="135" width="28" height="7" />
          <rect x="163" y="142" width="7" height="14" />

          {/* Center Surrounding Matrix */}
          <rect x="70" y="70" width="14" height="7" />
          <rect x="91" y="70" width="14" height="14" />
          <rect x="119" y="70" width="7" height="14" />
          <rect x="133" y="70" width="14" height="7" />

          <rect x="70" y="84" width="7" height="21" />
          <rect x="133" y="84" width="14" height="14" />

          <rect x="70" y="119" width="14" height="14" />
          <rect x="140" y="112" width="7" height="21" />

          <rect x="77" y="140" width="14" height="7" />
          <rect x="98" y="133" width="21" height="7" />
          <rect x="126" y="140" width="14" height="7" />

          {/* Bottom Area Data */}
          <rect x="72" y="156" width="14" height="7" />
          <rect x="93" y="156" width="7" height="14" />
          <rect x="107" y="156" width="21" height="7" />
          <rect x="135" y="156" width="14" height="14" />
          <rect x="156" y="156" width="14" height="7" />
          <rect x="177" y="156" width="7" height="14" />
          <rect x="191" y="156" width="14" height="7" />

          <rect x="72" y="170" width="7" height="14" />
          <rect x="86" y="170" width="14" height="7" />
          <rect x="114" y="170" width="7" height="21" />
          <rect x="156" y="170" width="7" height="14" />
          <rect x="170" y="177" width="14" height="7" />
          <rect x="191" y="170" width="7" height="21" />

          <rect x="72" y="191" width="28" height="14" />
          <rect x="107" y="198" width="21" height="7" />
          <rect x="135" y="184" width="14" height="21" />
          <rect x="156" y="191" width="21" height="7" />
          <rect x="184" y="198" width="21" height="7" />
        </g>

        {/* CENTER FG EMBLEM BADGE */}
        {/* Outer White Mask Ring */}
        <circle cx="110" cy="110" r="32" fill="#ffffff" />
        
        {/* Red Circle Center */}
        <circle cx="110" cy="110" r="27" fill="#ef1020" />

        {/* Stylized FG Logo in Center (Speed / Track Italic Racing Cut) */}
        <g transform="translate(110, 110)">
          {/* Stylized 'F' */}
          <path
            d="M -16 8 L -11 -8 L -1 -8 L -2 -4 L -8 -4 L -9 0 L -4 0 L -5 4 L -10 4 L -11 8 Z"
            fill="#ffffff"
          />
          {/* Stylized 'G' */}
          <path
            d="M 1 -8 L 16 -8 L 14 -4 L 6 -4 L 4 4 L 12 4 L 11 1 L 7 1 L 6 -2 L 14 -2 L 12 8 L -1 8 Z"
            fill="#ffffff"
          />
        </g>
      </svg>
    </div>
  );
};
