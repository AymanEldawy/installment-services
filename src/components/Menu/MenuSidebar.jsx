import React, { useState } from "react";

export const MenuSidebar = ({ closeMenu, menuOpened }) => {
  return (
    <>
      {menuOpened ? (
        <div
          className="w-full h-screen fixed bg-[#E3E3E39E] z-20 top-0 left-0 "
          onClick={closeMenu}
        ></div>
      ) : null}
      <aside
        className={`fixed flex flex-col w-[291px] top-0 z-30 bg-white h-screen transition-all duration-300  ${
          menuOpened
            ? "left-0 rtl:right-0 rtl:left-auto"
            : "-left-80 rtl:-right-80 rtl:left-auto"
        }`}
      ></aside>
    </>
  );
};
