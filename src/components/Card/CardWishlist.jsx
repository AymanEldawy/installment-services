import React, { useState } from 'react';
import { HeartIcon } from './../Icons/HeartIcon';

export const CardWishlist = ({ inWishlist }) => {
  const [wishlist, setWishlist] = useState(inWishlist || null);
  return (
    <button
      className="absolute right-3 top-3 rtl:left-4 rtl:right-auto scale-75"
      onClick={() => setWishlist((prev) => !prev)}
    >
      <HeartIcon color={wishlist ? '#f00' : ''} />
    </button>
  );
};
