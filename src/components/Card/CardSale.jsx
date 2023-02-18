import React, { useContext } from 'react';
import { fetchWord } from '@/lang/fetchWord';
import { LanguageContext } from './../../context/LangContext';

export const CardSale = ({ sale }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <span className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bg-[#D13B3B] text-white rounded-br-xl rtl:rounded-br-none rtl:rounded-bl-xl w-10 h-10 flex items-center justify-center text-xs">
      {fetchWord('sale', lang)}
    </span>
  );
};
