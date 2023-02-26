import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserOrders = ({ order }) => {
  const [collectOrder, setCollectOrder] = useState();
  const getCollecting = async () => {
    await fetch("https://installment-json-serve.onrender.com/collect_day")
      .then((res) => res.json())
      .then((data) => {
        let collecting = data?.filter(
          (collect) => collect?.order_id === order?.order_id
        );
        console.log(data, collecting);
        setCollectOrder(collecting);
      });
  };

  useEffect(() => {
    getCollecting();
  }, []);

  const getOrderTotalPaid = () => {
    return collectOrder?.reduce((result, cur) => {
      console.log(cur?.price);
      return (result += parseInt(cur?.price));
    }, 0);
  };

  return (
    <div className="bg-white shadow-md p-2 rounded mb-8">
      <Link
        to={`/orders/${order?.id}`}
        className="bg-blue-500 text-center p-2 text-white flex justify-center shadow-md"
      >
        {order?.product_name}
      </Link>
      <div className="flex-1 border-b p-2 flex gap-2">
        <span className="flex-1">حالة الطلب</span>
        {order?.status ? (
          <span className="flex-1 p-1 text-sm rounded-md text-white bg-green-400">
            مكتمل
          </span>
        ) : (
          <span className="flex-1 p-1 text-sm rounded-md text-black bg-yellow-300">
            مستمر
          </span>
        )}
      </div>
      <div className="flex-1 border-b p-2 flex gap-2">
        <span className="flex-1">سعر الطلب</span>
        <span className="flex-1">{order?.product_price}</span>
      </div>
      <div className="flex-1 border-b p-2 flex gap-2">
        <span className="flex-1">المقدم</span>
        <span className="flex-1">{order?.offered}</span>
      </div>
      <div className="flex-1 border-b p-2 flex gap-2">
        <span className="flex-1">مدة التقسيط</span>
        <div className="flex-1 flex justify-between gap-2">
          <span>{order?.month_count} شهر</span>
          <span className="bg-green-400 p-1 text-black text-sm">
            {collectOrder?.length} شهر
          </span>
        </div>
      </div>
      <div className="flex-1 border-b p-2 flex gap-2">
        <span className="flex-1">المبلغ الشهري</span>
        <span className="flex-1"> {order?.price_per_month}</span>
      </div>
      <div className="flex-1 p-2 flex gap-2">
        <span className="flex-1">السعر النهائي</span>
        <div className="flex-1 flex justify-between gap-2">
          <span>{order?.total_price}</span>
          <span className="bg-green-400 p-1 text-black text-sm">
            {getOrderTotalPaid() + +order?.offered}
          </span>
        </div>
      </div>
    </div>
  );
};
