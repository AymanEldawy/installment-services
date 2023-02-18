import { PropTypes } from 'prop-types';
import React from 'react';

// import { ButtonLoading } from '../ButtonLoading/ButtonLoading';
// import Styles from './PrimaryButton.module.scss';

export const PrimaryButton = ({
  text,
  onClick,
  style,
  loading,
  icon,
  classes = '',
  ...btnProps
}) => {
  return (
    <button
      className={`bg-blue-600 text-white rounded-md px-4 py-2 ${classes} gap-2`}
      onClick={onClick}
      style={style}
      {...btnProps}
    >
      {icon ? icon : null}
      {/* {loading ? <ButtonLoading /> : null} */}
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  style: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
