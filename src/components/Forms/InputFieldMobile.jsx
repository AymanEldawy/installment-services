import React from 'react';

export const InputFieldMobile = ({
  name,
  type,
  label,
  handleChange,
  value,
  errors,
  ...inputProps
}) => {
  return (
    <div
      className="mb-4 w-full relative flex flex-col bg-white rounded-md shadow-md p-3"
      style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}
    >
      <label className="capitalize text-[11px] font-normal text-[#9B9B9B]">{label}</label>
      <input
        className="bg-none p-1 rounded-md"
        type={type}
        name={name}
        onChange={handleChange}
        value={value}
        {...inputProps}
      />
    </div>
  );
};
