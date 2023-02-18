import React, { useContext } from 'react';

import { SearchIcon } from './../Icons/SearchIcon';

const SearchBar = ({ openedSearch, setOpenedSearch }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    setOpenedSearch(false);
  };
  return (
    <>
      {openedSearch ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-[#0008] z-30 m-auto"
          onClick={() => setOpenedSearch(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handelSubmit}
            className="max-w-xs w-full bg-white rounded-md flex items-center justify-between gap-2 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <input
              type="search"
              placeholder="بحث"
              className="flex-1 bg-transparent"
            />
            <button>
              <SearchIcon />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
