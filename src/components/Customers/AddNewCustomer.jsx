import axios from "axios";
import React, { useState } from "react";

import { InputField } from "./../Forms/InputField";
import { PrimaryButton } from "./../Global/PrimaryButton/PrimaryButton";
import { v4 as uuidv4 } from "uuid";

export const AddNewCustomer = () => {
  // https://deploy-json-server-r6e2vseod-aymaneldawy.vercel.app/orders
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id_card, setIpCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name && phone) {
      await fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json;odata.metadata=full",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: uuidv4(),
          name,
          phone,
          address,
          id_card,
          created_at: new Date(),
          status: true,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          setMsg("success");
          setTimeout(() => {
            setMsg("");
          }, 4000);
          setAddress("");
          setName("");
          setIpCard("");
          setPhone("");
        })
        .catch((err) => {
          setMsg("error");
          setTimeout(() => {
            setMsg("");
          }, 4000);
        });
      // const response = await res.json();
      // console.log(response);
    } else {
      setMsg("الاسم و التليفون ضروري");
    }
    setIsLoading(false);
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="md:flex gap-4">
        <InputField
          type="text"
          label="أسم العميل (أجباري)"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="tel"
          label="رقم التليفون (أجباري)"
          value={phone}
          handleChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="md:flex gap-4">
        <InputField
          type="tel"
          label="رقم البطاقة (أختياري)"
          value={id_card}
          handleChange={(e) => setIpCard(e.target.value)}
        />
        <InputField
          type="text"
          label="العنوان (أختياري)"
          value={address}
          handleChange={(e) => setAddress(e.target.value)}
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
              <p className="bg-red-200 text-red-600 p-2 rounded px-6">{msg}</p>
            )}
          </>
        ) : null}
      </div>
    </form>
  );
};
