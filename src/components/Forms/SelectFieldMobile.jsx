import React from 'react';
import { ChevronIcon } from './../Icons/ChevronIcon';

export const SelectFieldMobile = ({
  name,
  type,
  label,
  list,
  handleChange,
  value,
  errors,
  ...selectProps
}) => {
  return (
    <div
      className="mb-4 w-full relative flex flex-col bg-white rounded-md shadow-md p-3"
      style={{ boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.05)' }}
    >
      <label className="capitalize text-[11px] font-normal text-[#9B9B9B]">
        {label}
      </label>
      <select
        className="bg-none p-1 rounded-md"
        name={name}
        onChange={handleChange}
        value={value}
        defaultValue={list?.length ? list[0] : null}
        {...selectProps}
      >
        {list &&
          list?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}{' '}
            </option>
          ))}
      </select>
      {/* <span className="-rotate-90 absolute right-3 top-3 scale-50 bg-white flex items-center justify-center z-10 w-8 h-8">
        <ChevronIcon />
      </span> */}
    </div>
  );
};
