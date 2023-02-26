import React from "react";
import { NavLink } from "react-router-dom";

import { BarsIcon } from "./../Icons/BarsIcon";
import { SearchIcon } from "./../Icons/SearchIcon";

export const MenuMobile = ({ openMenu, setOpenedSearch }) => {
  return (
    <div className="bg-indigo-600 text-white">
      <div className="container !py-4 !md:px-4">
        <ul className="flex items-center md:gap-6 text-sm md:text-lg w-full justify-center">
          <li className="">
            <NavLink
              to="/"
              className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 "
            >
              الفهرس
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="orders"
              className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 "
            >
              الطلبات
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/collecting"
              className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 "
            >
              التحصيلات
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/daily-collect"
              className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 whitespace-nowrap"
            >
              التحصيل اليومي
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
