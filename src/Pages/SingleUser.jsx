import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import avatar from "../img_avatar.png";
import { UserOrders } from "./../components/UserOrders/UserOrders";

const SingleUser = () => {
  const [orders, setOrders] = useState();
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState();
  const getOrders = async () => {
    await fetch("https://installment-json-serve.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        let filterOrders = data?.filter((order) => order?.user_id === id);
        setOrders(filterOrders);
      });
  };
  const getUsers = async () => {
    await fetch(`https://installment-json-serve.onrender.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };
  useEffect(() => {
    getUsers();
    getOrders();
    console.log(orders);
    console.log(user);
  }, []);
  const blockUser = async () => {
    await fetch(`https://installment-json-serve.onrender.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        status: !user?.status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };
  return (
    <>
      <div className="bg-blue-400 max-h-36 mb-16">
        <figure className="max-w-fit mx-auto translate-y-11 rounded-full p-2 bg-blue-400 shadow-md">
          <img
            className="rounded-full shadow-md h-24 w-24 object-cover"
            src={avatar}
            alt="user profile"
          />
        </figure>
      </div>
      <div className="container">
        <button
          onClick={blockUser}
          className="mr-auto text-lg bg-red-500 text-white p-1 px-4 rounded mb-4"
        >
          {user?.status ? "حظر" : "رفع الحظر"}
        </button>
        <div className="flex flex-col md:flex-row gap-8 sm:text-lg items-start">
          <ul className="shadow bg-white rounded-md p-2 md:max-w-sm flex-1 ">
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1 ">الاسم:</span>{" "}
              <strong className="flex-1">{user?.name}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b">
              <span className="w-28 flex-1">رقم الهاتف:</span>{" "}
              <strong className="flex-1 text-blue-700 px-2">
                {user?.phone}
              </strong>
            </li>
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1">رقم البطاقة:</span>{" "}
              <strong className="flex-1">{user?.id_card}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b">
              <span className="w-28 flex-1"> العنوان:</span>{" "}
              <strong className="flex-1">{user?.address}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1">الحالة:</span>{" "}
              <strong className="flex-1 flex justify-between">
                {user?.status ? (
                  "يسمح"
                ) : (
                  <span className="bg-red-500 text-sm text-white p-1">
                    لا يسمح بالتقسيط له
                  </span>
                )}
              </strong>
            </li>
            <li className="flex gap-4 p-2">
              <span className="w-28 flex-1">عدد الطلبات:</span>{" "}
              <strong className="flex-1 text-indigo-600 px-2">
                {orders?.length === 0
                  ? "لا يوجد طلبات"
                  : `${orders?.length} طلب`}
              </strong>
            </li>
          </ul>
          <div className="flex-1">
            {orders?.map((order) => (
              <UserOrders order={order} key={order?.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
