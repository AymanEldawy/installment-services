import { axios } from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";

export const Customers = (props) => {
  const [users, setUsers] = useState();
  const [usersFilter, setUsersFilters] = useState(null);
  const [filterStatus, setFilterStatus] = useState("الكل");
  const [itemOffset, setItemOffset] = useState(0);

  const getUsers = async () => {
    await fetch("https://installment-json-serve.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersFilters(data);
        setUsers(data);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteUser = async (id) => {
    let confirm = window.confirm("هل انت متاكد انك تريد حذف هذا المستخدم");
    if (confirm) {
      await fetch(`https://installment-json-serve.onrender.com/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => getUsers());
    }
  };

  const handelSearch = (e) => {
    let key = e.target.value;
    console.table(users);
    if (key !== "") {
      let userFilters = users?.filter((user) => user?.name.indexOf(key) !== -1);
      console.log(key);
      setUsersFilters(userFilters);
    } else {
      setUsersFilters(users);
    }
  };
  const filterBy = (key) => {
    switch (key) {
      case "يسمح":
        setFilterStatus("يسمح");
        let filters = users?.filter((user) => user?.status);
        setUsersFilters(filters);
        break;
      case "محظور":
        setFilterStatus("محظور");
        let filter = users?.filter((user) => !user?.status);
        setUsersFilters(filter);
        break;
      default:
        setFilterStatus("الكل");
        setUsersFilters(users);
    }
  };
  const itemsPerPage = 30;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = usersFilter?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(usersFilter?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % usersFilter?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className=" border-b mb-4 mt-1 pt-2 pb-5 border-gray-300">
        <div className="flex text-xs gap-4 justify-between flex-wrap">
          <input
            onChange={handelSearch}
            type="search"
            placeholder="أبحث في العملاء"
            className="p-2 px-4 rounded-md block flex-1 max-w-xs"
          />
          <div className=" flex gap-2">
            <button
              onClick={() => filterBy("")}
              className={`bg-gray-500 p-1 rounded text-white ${
                filterStatus === "الكل" ? "!bg-blue-500" : ""
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => filterBy("يسمح")}
              className={`bg-gray-500 p-1 rounded text-white ${
                filterStatus === "يسمح" ? "!bg-blue-500" : ""
              }`}
            >
              يسمح
            </button>
            <button
              onClick={() => filterBy("محظور")}
              className={`bg-gray-500 p-1 rounded text-white ${
                filterStatus === "محظور" ? "!bg-blue-500" : ""
              }`}
            >
              محظور
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-auto w-full">
        <table className="shadow table-auto w-full bg-white text-xs md:text-lg">
          <thead className="bg-blue-600 text-white">
            <tr className="border">
              <th className="border p-2 whitespace-nowrap">#</th>
              <th className="border p-2 whitespace-nowrap">الأسم</th>
              <th className="border p-2 whitespace-nowrap">رقم التليفون</th>
              <th className="border p-2 whitespace-nowrap">الحالة</th>
              <th className="border p-2 whitespace-nowrap">تاريخ التسجيل</th>
              <th className="border p-2 whitespace-nowrap">أعدادات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length
              ? currentItems?.map((user, index) => (
                  <tr
                    className={`border ${!user?.status ? "bg-red-300" : ""}`}
                    key={index}
                  >
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2 text-xs md:text-lg">
                      <NavLink
                        to={`customers/${user?.id}`}
                        className="underline text-blue-500 font-medium md:text-lg bg-blue-100 p-1 rounded"
                      >
                        {user?.name}
                      </NavLink>
                    </td>
                    <td className="border p-2 text-xs md:text-lg">
                      {user?.phone}
                    </td>
                    <td className="border p-2 text-xs md:text-lg">
                      {!user?.status ? "محظور" : "يسمح"}
                    </td>
                    <td className="border p-2 text-xs md:text-lg">
                      {new Date(user?.created_at)?.toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </td>
                    <td className="border p-2 text-xs md:text-lg">
                      <button
                        onClick={() => deleteUser(user?.id)}
                        className="bg-red-100 text-red-500 rounded-md p-1 px-2"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <ReactPaginate
          className="table-pagination"
          breakLabel="..."
          nextLabel="التالي"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="السابق"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
