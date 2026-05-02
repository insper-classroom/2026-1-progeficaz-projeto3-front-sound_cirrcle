import React from "react";

function Logo({ size = 40, color = "#0f172a", circleColor = "#10b981" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo externo */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke={circleColor}
        strokeWidth="4"
        fill="none"
      />
      
      {/* Círculo interno sutil */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke={circleColor}
        strokeWidth="1.5"
        opacity="0.25"
        fill="none"
      />

      {/* Nota musical (semínima/colcheia estilizada) */}
      <g transform="translate(50, 50)">
        {/* Haste da nota */}
        <line
          x1="6"
          y1="-14"
          x2="6"
          y2="14"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Cabeça da nota (oval inclinada) */}
        <ellipse
          cx="-2"
          cy="14"
          rx="9"
          ry="7"
          fill={color}
          transform="rotate(-15, -2, 14)"
        />
        
        {/* Plica (flag) da colcheia */}
        <path
          d="M 6 -14 Q 18 -8, 18 2 Q 18 8, 6 4"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export default Logo;