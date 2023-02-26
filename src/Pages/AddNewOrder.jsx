import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputField } from "../components/Forms/InputField";
import { PrimaryButton } from "../components/Global/PrimaryButton/PrimaryButton";
import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

const AddNewOrder = () => {
  const [users, setUsers] = useState();
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState(0);
  const [total_price, setTotalPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [user_id, setUser_id] = useState(null);
  const [month_count, setMonthCount] = useState(0);
  const [price_per_month, setPricePerMonth] = useState(0);
  const [offered, setOffered] = useState(0);

  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    await fetch("https://installment-json-serve.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handelSubmit = async (e) => {
    console.log(msg);
    e.preventDefault();
    if (product_name && product_price && total_price && username && user_id) {
      await fetch(`https://installment-json-serve.onrender.com/orders`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json;odata.metadata=full",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          created_at: new Date(),
          order_id: uuidv4(),
          user_id,
          username,
          product_name,
          product_price,
          total_price,
          month_count,
          price_per_month,
          offered,
          status: false,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          setMsg("success");
          setProductName("");
          setProductPrice(0);
          setOffered(0);
          setPricePerMonth(0);
          setMonthCount(0);
          setTotalPrice(0);
          setTotalPrice(0);
          setTimeout(() => {
            setMsg("");
          }, 4000);
        })
        .catch((err) => {
          setMsg("error");
          setTimeout(() => {
            setMsg("");
          }, 4000);
        });
    } else {
      setMsg("error");
      setTimeout(() => {
        setMsg("");
      }, 4000);
    }
  };
  return (
    <div className=" mt-8">
      <div className="container">
        <SectionTitle title="أضافة طلب جديد" />
        <form onSubmit={handelSubmit} className="mt-8">
          <div className="md:grid md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="flex items-center justify-between mb-2">
                اسم العميل
              </label>
              <select
                className="border border-gray-300 w-full p-2 rounded-md appearance-none"
                onChange={(e) => {
                  const userInfo = e.target.value?.split("|");
                  setUser_id(userInfo[0]);
                  setUsername(userInfo[1]);
                }}
              >
                <option>...</option>
                {users?.map((user) => (
                  <>
                    {user?.status ? (
                      <option value={`${user?.id}|${user?.name}`}>
                        {user?.name}
                      </option>
                    ) : null}
                  </>
                ))}
              </select>
            </div>
            <InputField
              type="text"
              label="نوع الطلب"
              value={product_name}
              handleChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="md:grid md:grid-cols-2 gap-4">
            <InputField
              type="number"
              label="سعر الطلب"
              value={product_price}
              handleChange={(e) => setProductPrice(e.target.value)}
              required
            />
            <InputField
              type="number"
              label="المقدم"
              value={offered}
              handleChange={(e) => setOffered(e.target.value)}
              required
            />
            <InputField
              type="number"
              label="فترة التقسيط / عدد الاشهر"
              value={month_count}
              handleChange={(e) => setMonthCount(e.target.value)}
              required
            />
            <InputField
              type="number"
              label="المبلغ الشهري"
              value={price_per_month}
              handleChange={(e) => setPricePerMonth(e.target.value)}
              required
            />
            <InputField
              type="number"
              label="السعر النهائي"
              value={total_price}
              handleChange={(e) => setTotalPrice(e.target.value)}
              required
            />
          </div>
          {msg === "success" ? (
            <p className=" my-4 p-2 text-sm bg-green-200 text-green-600">
              تم الاضافة بنجاح
            </p>
          ) : (
            <>
              {msg === "error" ? (
                <p className=" my-4 p-2 text-sm bg-red-200 text-red-600">
                  يجب تحديد التاريخ
                </p>
              ) : null}
            </>
          )}
          <PrimaryButton text="أضافة طلب جديد" classes="mt-8 !p-3" />
        </form>
      </div>
    </div>
  );
};
export default AddNewOrder;
