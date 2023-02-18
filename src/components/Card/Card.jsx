import React from 'react';
import { CardSale } from './CardSale';
import { CardWishlist } from './CardWishlist';
import { CardImg } from './CardImg';
import { CardRate } from './CardRate';
import { CardInfo } from './CardInfo';
import { CardPrice } from './CardPrice';
import { PrimaryButton } from './../Global/PrimaryButton/PrimaryButton';
import { CartIcon } from './../Icons/CartIcon';
import { AddToCardButton } from './AddToCardButton';

export const Card = ({ item, inCategory }) => {
  return (
    <div className={`bg-bgprimary w-full max-w-[288px] relative `}>
      <CardSale sale="sale" />
      <CardWishlist inWishlist={item?.inWishlist} />
      <CardImg
        src={item?.img}
        alt={item?.title}
        id={item?.id}
        inCategory={inCategory}
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <CardInfo
          rating={item?.rating}
          title={item?.title}
          category={item?.category?.name}
          inCategory={inCategory}
        />
        <CardPrice price={item?.price} discount={item?.discount} />
        <AddToCardButton />
      </div>
    </div>
  );
};
