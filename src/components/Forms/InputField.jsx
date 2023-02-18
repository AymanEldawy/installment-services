import { PropTypes } from "prop-types";
import React from "react";

import { EyeSlashIcon } from "./../Icons/EyeSlashIcon";

export const InputField = ({
  name,
  type,
  label,
  handleChange,
  value,
  errors,
  ...inputProps
}) => {
  return (
    <div className="mb-4 w-full">
      {label ? (
        <label className="flex items-center justify-between mb-2">
          {label}
          {errors ? <span className="">{errors}</span> : null}
        </label>
      ) : null}
      <div className="relative">
        <input
          className="border border-gray-300 w-full p-3 rounded-md"
          type={type}
          name={name}
          onChange={handleChange}
          value={value}
          {...inputProps}
        />
        {type === "password" ? (
          <button className="absolute left-4 top-4 scale-90">
            <EyeSlashIcon />
          </button>
        ) : null}
      </div>
    </div>
  );
};
