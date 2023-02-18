import React, { useContext } from 'react';
import { fetchWord } from '@/lang/fetchWord';
import { LanguageContext } from './../../context/LangContext';

export const OrderStatusBar = ({ status, method }) => {
  const { lang } = useContext(LanguageContext);
  const statusContent = (status) => {
    switch (status) {
      case 'Completed':
        return 1;
      case 'Delivered':
        return 2;
      case 'Pending':
        return 3;
      case 'Canceled':
        return 0;
    }
  };
  return (
    <div className="flex items-center">
      <div className=" border-b-4 font-medium text-lg text-primary pb-2 flex-1 text-center border-primary ">
        {fetchWord('Completed', lang)}
      </div>
      <div className=" border-b-2 font-medium text-lg text-[#989898] border-[#A3A3A3] pb-2 flex-1 text-center  ">
        {fetchWord('Delivered', lang)}
      </div>
      <div className=" border-b-2 font-medium text-lg text-[#989898] border-[#A3A3A3] pb-2 flex-1 text-center  ">
        {fetchWord('Pending', lang)}
      </div>
      <div className=" border-b-2 font-medium text-lg text-[#989898] border-[#A3A3A3] pb-2 flex-1 text-center  ">
        {fetchWord('Canceled', lang)}
      </div>
    </div>
  );
};
