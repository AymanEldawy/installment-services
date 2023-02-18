import React from 'react';

export const BarsIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7H21"
        stroke={color ? color : '#5E452A'}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3 12H21"
        stroke={color ? color : '#5E452A'}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3 17H21"
        stroke={color ? color : '#5E452A'}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
