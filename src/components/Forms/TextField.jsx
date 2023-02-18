import { PropTypes } from 'prop-types';
import React from 'react';

export const TextField = ({
  label,
  handleChange,
  value,
  style,
  resize,
  placeholder,
  classes,
}) => {
  return (
    <div className="mb-4" style={style}>
      {label ? <label className="flex items-center justify-between mb-2">{label}</label> : null}
      <textarea
        placeholder={placeholder}
        className={`border border-gray-300 w-full p-2 rounded-md h-28 ${classes}`}
        onChange={handleChange}
        value={value}
        style={{ resize: resize ? resize : 'none' }}
      ></textarea>
    </div>
  );
};
