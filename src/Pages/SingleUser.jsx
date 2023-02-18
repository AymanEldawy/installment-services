import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserOrders } from "./../components/UserOrders/UserOrders";

const SingleUser = () => {
  const [orders, setOrders] = useState();
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState();
  const getOrders = async () => {
    await fetch("http://localhost:4000/orders")
      .then((res) => res.json())
      .then((data) => {
        let filterOrders = data?.filter((order) => order?.user_id === id);
        setOrders(filterOrders);
      });
  };
  const getUsers = async () => {
    await fetch(`http://localhost:4000/users/`)
      .then((res) => res.json())
      .then((data) => {
        let userData = data?.find((user) => user?.user_id === id);
        setUser(userData);
      });
  };
  useEffect(() => {
    getUsers();
    getOrders();
    console.log(orders);
    console.log(user);
  }, []);

  return (
    <>
      <div className="bg-blue-400 max-h-36 mb-16">
        <figure className="max-w-fit mx-auto translate-y-11 rounded-full p-2 bg-blue-400 shadow-md">
          <img
            className="rounded-full shadow-md h-24 w-24 object-cover"
            src="/img_avatar.png"
            alt="user profile"
          />
        </figure>
      </div>
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8 sm:text-lg items-start">
          <ul className="shadow bg-white rounded-md p-2 md:max-w-sm flex-1 ">
            <li className="flex gap-4 p-1 border-b bg-gray-100">
              <span className="w-28 flex-1 ">الاسم:</span>{" "}
              <strong className="flex-1">{user?.name}</strong>
            </li>
            <li className="flex gap-4 p-1 border-b">
              <span className="w-28 flex-1">رقم الهاتف:</span>{" "}
              <strong className="flex-1">{user?.phone}</strong>
            </li>
            <li className="flex gap-4 p-1 border-b bg-gray-100">
              <span className="w-28 flex-1">رقم البطاقة:</span>{" "}
              <strong className="flex-1">{user?.id_card}</strong>
            </li>
            <li className="flex gap-4 p-1 border-b">
              <span className="w-28 flex-1"> العنوان:</span>{" "}
              <strong className="flex-1">{user?.address}</strong>
            </li>
            <li className="flex gap-4 p-1 border-b bg-gray-100">
              <span className="w-28 flex-1">الحالة:</span>{" "}
              <strong className="flex-1">
                {user?.status ? "يسمح" : "لا يسمح بالتقسيط له"}
              </strong>
            </li>
            <li className="flex gap-4 p-1">
              <span className="w-28 flex-1">عدد الطلبات:</span>{" "}
              <strong className="flex-1">{orders?.length}</strong>
            </li>
          </ul>
          <div className="flex-1">
            {orders?.map((order) => (
              <UserOrders order={order} key={order?.order_id} />
            ))}
          </div>
        </div>
        {/* user info */}
        {/* user data */}
        {/* update user */}
        {/* user orders */}
      </div>
    </>
  );
};

export default SingleUser;
