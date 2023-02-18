import React from "react";
import { Link } from "react-router-dom";
export const CardImg = ({ id, src, alt = "alt", inCategory }) => {
  return (
    <figure className={`w-[300] h-[170] flex items-center justify-center `}>
      <Link to={`/products/${id}`}>
        <img src={src} alt={alt} />
      </Link>
    </figure>
  );
};
