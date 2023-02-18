import React, { useContext } from 'react';
import { PrimaryButton } from './../Global/PrimaryButton/PrimaryButton';
import { CartIcon } from './../Icons/CartIcon';
import { fetchWord } from '@/lang/fetchWord';
import { LanguageContext } from './../../context/LangContext';

export const AddToCardButton = ({ handelClick, classes }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <PrimaryButton
      onClick={handelClick}
      classes={`flex items-center text-sm max-w-[90%] mb-4 ${classes}`}
      text={fetchWord('Add_to_Cart', lang)}
      icon={<CartIcon color="white" style={{ transform: 'scale(.5)' }} />}
    />
  );
};
