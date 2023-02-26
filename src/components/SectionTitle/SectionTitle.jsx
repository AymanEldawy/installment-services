import React from "react";

export const SectionTitle = ({ title, extraContent }) => {
  return (
    <div className="flex justify-between gap-2  md:items-center pb-4 border-b-2 mb-4">
      <h1 className="text-lg md:text-3xl">{title}</h1>
      <div className="flex flex-wrap justify-end gap-2">{extraContent}</div>
    </div>
  );
};
