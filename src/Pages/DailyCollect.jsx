import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputField } from "./../components/Forms/InputField";
import { SelectField } from "./../components/Forms/SelectField";
import { PrimaryButton } from "./../components/Global/PrimaryButton/PrimaryButton";
import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

const DailyCollect = () => {
  const [users, setUsers] = useState();
  const [collecting, setCollecting] = useState();
  const [orders, setOrders] = useState();
  const [filterOrders, setFilterOrders] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedOrderName, setSelectedOrderName] = useState();
  const [created_day, setCreated_day] = useState("");
  const [created_name, setCreatedName] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [price, setPrice] = useState();
  const [username, setUsername] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();

  const getCollecting = async () => {
    await fetch("http://localhost:4000/collecting")
      .then((res) => res.json())
      .then((data) => setCollecting(data));
  };
  const getUsers = async () => {
    await fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const getOrders = async () => {
    await fetch("http://localhost:4000/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilterOrders(data);
      });
  };

  const getUserOrders = (userId) => {
    let userOrders = orders?.filter((order) => order?.user_id === userId);
    setFilterOrders(userOrders);
  };
  useEffect(() => {
    getOrders();
    getUsers();
    getCollecting();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (created_day && price && username) {
      await fetch(`http://localhost:4000/collect_day`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json;odata.metadata=full",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          user_id,
          username,
          price,
          created_day,
          created_at: new Date(),
          created_name,
          order_id: selectedOrder,
          order_name: selectedOrderName,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          setMsg("success");
          setTimeout(() => {
            setMsg("");
          }, 4000);
          setCreated_day("");
          setUser_id("");
          setUsername("");
          setCreatedName("");
          setPrice("");
        })
        .catch((err) => {
          setMsg("error");
          setTimeout(() => {
            setMsg("");
          }, 4000);
        });
    } else {
      setMsg("يرجي ملئ جميع الحقول");
    }
    setIsLoading(false);
  };
  return (
    <div className="container">
      <div className="mt-8">
        <SectionTitle title="أضافة تحصيل جديد" />
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="md:grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="flex items-center justify-between mb-2">
              تاريخ اليوم
            </label>

            <select
              className="border border-gray-300 w-full p-3 rounded-md appearance-none"
              onChange={(e) => setCreated_day(e.target.value)}
            >
              <option>....</option>
              {collecting?.map((_collect) => (
                <option key={_collect?.id} value={_collect?.id}>
                  {new Date(_collect?.date)?.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    weekday: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center justify-between mb-2">
              اسم العميل
            </label>
            <select
              className="border border-gray-300 w-full p-3 rounded-md appearance-none"
              onChange={(e) => {
                const userInfo = e.target.value?.split("|");
                setUser_id(userInfo[0]);
                setUsername(userInfo[1]);
                getUserOrders(userInfo[0]);
              }}
            >
              <option>....</option>
              {users?.map((user) => (
                <option
                  key={user?.id}
                  value={`${user?.id}|${user?.name}`}
                >
                  {user?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="flex items-center justify-between mb-2">
              حدد الطلب
            </label>
            <select
              className="border border-gray-300 w-full p-3 rounded-md appearance-none"
              onChange={(e) => {
                const userInfo = e.target.value?.split("|");
                setSelectedOrder(userInfo[0]);
                setSelectedOrderName(userInfo[1]);
              }}
            >
              <option>....</option>
              {filterOrders?.map((order) => (
                <option key={order?.id} value={`${order?.id}|${order?.product_name}`}>
                  {order?.product_name}
                </option>
              ))}
            </select>
          </div>
          <InputField
            type="number"
            label="المبلغ"
            value={price}
            handleChange={(e) => setPrice(e.target.value)}
          />
          <InputField
            type="text"
            label="اسم المستلم"
            value={created_name}
            handleChange={(e) => setCreatedName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <PrimaryButton
            text={
              isLoading ? (
                <div className="flex justify-center overflow-hidden relative">
                  <span class="flex ">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  </span>
                  يتم الحفظ
                </div>
              ) : (
                "حفظ"
              )
            }
            classes="min-w-[150px] relative"
          />
          {!!msg ? (
            <>
              {msg === "success" ? (
                <p className="bg-green-200 text-green-600 p-2 rounded px-6">
                  تم الحفظ بنجاح
                </p>
              ) : (
                <p className="bg-red-200 text-red-600 p-2 rounded px-6">
                  {msg}
                </p>
              )}
            </>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default DailyCollect;
