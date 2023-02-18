import React, { useContext } from 'react';
import { products } from '@/data/cardData';
import { ProductItemRow } from './ProductItemRow';
import { LanguageContext } from './../../context/LangContext';
import { fetchWord } from '@/lang/fetchWord';

export const TableProducts = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="mb-8">
      <div className="bg-primary p-2 px-4 flex items-center">
        <div className="text-lg text-white flex-1">
          {fetchWord('product', lang)}
        </div>
        <div className="text-lg text-white w-1/5">
          {fetchWord('price', lang)}
        </div>
        <div className="text-lg text-white w-1/5">
          {fetchWord('Stock_Status', lang)}
        </div>
        <div className="text-lg text-white w-1/5 text-center">
          {fetchWord('Actions', lang)}{' '}
        </div>
      </div>
      <div className="mt-8">
        {products?.map((product) => (
          <ProductItemRow product={product} key={product?.id} />
        ))}
      </div>
    </div>
  );
};
