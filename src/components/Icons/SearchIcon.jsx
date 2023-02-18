import React from 'react';

export const SearchIcon = ({ color }) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.9375"
        cy="11.9375"
        r="10.9375"
        stroke={color ? color : '#646464'}
        stroke-width="2"
      />
      <path
        d="M26 26L21.3125 21.3125"
        stroke={color ? color : '#646464'}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
