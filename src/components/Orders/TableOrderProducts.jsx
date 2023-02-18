import { products } from '@/data/cardData';
import React, { useContext } from 'react';

import { OrderProductRow } from './OrderProductRow';
import { orders } from '@/data/cardData';
import { LanguageContext } from './../../context/LangContext';
import { fetchWord } from '@/lang/fetchWord';

export const TableOrderProducts = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className=" mt-4 ">
      <div className="bg-primary p-2 px-4 flex items-center">
        <div className="text-lg text-white flex-1">
          {fetchWord('product', lang)}
        </div>
        <div className="text-lg text-white w-1/6">
          {fetchWord('Order_Date', lang)}
        </div>
        <div className="text-lg text-white w-1/6">
          {fetchWord('Order_Summary', lang)}
        </div>
        <div className="text-lg text-white w-1/6 text-center">
          {fetchWord('status', lang)}{' '}
        </div>
        <div className="text-lg text-white w-1/6 text-center">
          {fetchWord('Amount_total', lang)}
        </div>
      </div>
      <div className="mt-8 max-h-[600px] overflow-y-auto">
        {orders?.map((order) => (
          <OrderProductRow order={order} key={order?.id} />
        ))}
      </div>
    </div>
  );
};
