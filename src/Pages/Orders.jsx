import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "./../components/Global/PrimaryButton/PrimaryButton";

const Orders = () => {
  const [filterStatus, setFilterStatus] = useState("الكل");
  const [orders, setOrders] = useState();
  const [filterOrders, setFilterOrders] = useState();
  const getOrders = async () => {
    await fetch("https://installment-json-serve.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setFilterOrders(data);
        setOrders(data);
      });
  };
  useEffect(() => {
    getOrders();
    console.log(orders);
  }, []);

  const handelSearch = (e) => {
    let key = e.target.value;
    if (key !== "") {
      let ordersFilters = orders?.filter(
        (order) =>
          order?.product_name.indexOf(key) !== -1 ||
          order?.username.indexOf(key) !== -1
      );
      setFilterOrders(ordersFilters);
    } else {
      setFilterOrders(orders);
    }
  };
  const filterBy = (key) => {
    switch (key) {
      case "مستمر":
        setFilterStatus("مستمر");
        let filters = orders?.filter((order) => !order?.status);
        setFilterOrders(filters);
        break;
      case "مكتمل":
        setFilterStatus("مكتمل");
        let filter = orders?.filter((order) => order?.status);
        setFilterOrders(filter);
        break;
      default:
        setFilterStatus("الكل");
        setFilterOrders(orders);
    }
  };
  return (
    <>
      <div className="container">
        <Link to="/add-order">
          <PrimaryButton text="أضافة طلب جديد" classes="mt-8" />
        </Link>
        <div className="border-t border-b my-4 py-4 border-gray-300">
          <div className="flex gap-4 justify-between">
            <input
              onChange={handelSearch}
              type="search"
              placeholder="أبحث في الطلبات"
              className="p-2 rounded-md block flex-1 max-w-xs"
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
                onClick={() => filterBy("مستمر")}
                className={`bg-gray-500 p-1 rounded text-white ${
                  filterStatus === "مستمر" ? "!bg-blue-500" : ""
                }`}
              >
                مستمر
              </button>
              <button
                onClick={() => filterBy("مكتمل")}
                className={`bg-gray-500 p-1 rounded text-white ${
                  filterStatus === "مكتمل" ? "!bg-blue-500" : ""
                }`}
              >
                مكتمل
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="shadow table-auto w-full mt-8 bg-white">
            <thead className="bg-blue-600 text-white">
              <tr className="border">
                <th className="border p-2 ">#</th>
                <th className="border p-2 whitespace-nowrap">الطلب</th>
                <th className="border p-2 whitespace-nowrap">حالة الطلب</th>
                <th className="border p-2 whitespace-nowrap">العميل</th>
                <th className="border p-2 whitespace-nowrap">المقدم</th>
                <th className="border p-2 whitespace-nowrap">سعر الطلب</th>
                <th className="border p-2 whitespace-nowrap">عدد الاشهر</th>
                <th className="border p-2 whitespace-nowrap">المبلغ الشهري</th>
                <th className="border p-2 whitespace-nowrap">السعر بالفائدة</th>
              </tr>
            </thead>
            <tbody>
              {filterOrders
                ? filterOrders?.map((order, index) => (
                    <tr
                      key={order?.id}
                      className={`${order?.status ? "bg-green-300" : ""} `}
                    >
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">
                        <Link
                          to={`/orders/${order?.id}`}
                          className="text-blue-500 font-medium text-lg bg-blue-100 p-1 rounded cursor-pointer"
                        >
                          {order?.product_name}
                        </Link>
                      </td>
                      <td className="border p-2">
                        {order?.status ? (
                          <span className="p-1 text-sm rounded-md text-white bg-green-400">
                            مكتمل
                          </span>
                        ) : (
                          <span className="p-1 text-sm rounded-md text-black bg-yellow-300">
                            مستمر
                          </span>
                        )}
                      </td>
                      <td className="border p-2">{order?.username}</td>
                      <td className="border p-2">{order?.offered}</td>
                      <td className="border p-2">{order?.product_price}</td>
                      <td className="border p-2">{order?.month_count}</td>
                      <td className="border p-2">{order?.price_per_month}</td>
                      <td className="border p-2">{order?.total_price}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </>
  );
};

export default Orders;
