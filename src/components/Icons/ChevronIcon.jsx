import React from 'react';

export const ChevronIcon = ({ color }) => {
  return (
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7508 20.9001L2.60078 12.7501C1.63828 11.7876 1.63828 10.2126 2.60078 9.2501L10.7508 1.1001"
        stroke={color ? color : '#363636'}
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
