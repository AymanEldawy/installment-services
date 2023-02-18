import { fetchWord } from '@/lang/fetchWord';
import Image from 'next/image';
import React, { useContext } from 'react';

import { LanguageContext } from './../../context/LangContext';
import { PrimaryButton } from './../Global/PrimaryButton/PrimaryButton';
import { CartIcon } from './../Icons/CartIcon';
import { CloseIcon } from './../Icons/CloseIcon';

export const ProductItemRow = ({ product }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="p-4 flex items-center border-b">
      <div className="flex-1">
        <div className="flex gap-4">
          <figure>
            <Image
              src={product?.img}
              alt={product?.title}
              height={180}
              width={150}
            />
          </figure>
          <div>
            <h4 className="capitalize text-lg font-medium mb-2">
              {product?.title}
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                {fetchWord('product_code', lang)}: <span>47536</span>
              </li>
              <li>
                {fetchWord('category', lang)}:
                <span>{product?.category?.name}</span>
              </li>
              <li>
                {fetchWord('Size', lang)}: <span>{product?.size}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-1/5">
        <h4 className="capitalize text-lg font-normal">{product?.price}$</h4>
      </div>
      <div className="w-1/5 ">
        <h4 className="capitalize text-lg font-normal">
          {product?.in_stock ? 'In Stock' : "Item isn't available"}
        </h4>
      </div>
      <div className="w-1/5 flex gap-2 justify-end">
        <button>
          <CloseIcon />
        </button>
        <PrimaryButton
          classes="flex gap-1 items-center !py-1 px-2"
          text={fetchWord('add_to_cart', lang)}
          icon={<CartIcon color="white" style={{ transform: 'scale(.7)' }} />}
        />
      </div>
    </div>
  );
};
