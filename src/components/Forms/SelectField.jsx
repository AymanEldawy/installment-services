import { PropTypes } from "prop-types";
import React from "react";

import { ChevronIcon } from "./../Icons/ChevronIcon";

export const SelectField = ({
  name,
  search_key,
  id_key,
  label,
  handleChange,
  value,
  list,
  required,
  ...selectProps
}) => {
  return (
    <div className="mb-4">
      {label ? (
        <label className="flex items-center justify-between mb-2">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          className="border border-gray-300 w-full p-3 rounded-md appearance-none"
          name={name}
          onChange={handleChange}
          value={value}
          required={required}
          {...selectProps}
        >
          <option>....</option>
          {list &&
            list?.map((item) => (
              <option key={item[id_key]} value={item[id_key]}>
                {item[search_key]}
              </option>
            ))}
        </select>
        <span className="-rotate-90 absolute left-3 top-3 scale-50 bg-white flex items-center justify-center z-10 w-8 h-8">
          <ChevronIcon />
        </span>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  required: PropTypes.bool,
  errors: PropTypes.array,
  onBlur: PropTypes.func,
};
