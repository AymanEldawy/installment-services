import React, { useContext } from 'react';

import { PrimaryButton } from './../Global/PrimaryButton/PrimaryButton';
import { OrdersEmptyIcon } from './../Icons/OrdersEmptyIcon';
import { fetchWord } from '@/lang/fetchWord';
import { LanguageContext } from './../../context/LangContext';

export const OrdersEmpty = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-fit gap-4 p-6">
      <OrdersEmptyIcon />
      <h3 className="text-2xl my-4  text-primary font-semibold text-center">
        {fetchWord('No order yet', lang)}
      </h3>
      <PrimaryButton classes=" w-96 !p-3" text={fetchWord('shop_now', lang)} />
    </div>
  );
};
