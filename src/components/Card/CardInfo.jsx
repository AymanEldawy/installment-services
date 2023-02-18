import React from 'react';
import { CardRate } from './CardRate';

export const CardInfo = ({ title, category, rating }) => {
  return (
    <>
      <div className="flex">
        <p className='text-xs mx-[1px]'>{category}</p>
        <CardRate rating={rating} />
      </div>
      <h3 className='text-sm font-medium'>{title}</h3>
    </>
  );
};
