import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleOrder = () => {
  const [order, setOrder] = useState();
  const [collectingDays, setCollectDays] = useState();
  // Update status
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const getOrder = async () => {
    await fetch(`https://installment-json-serve.onrender.com/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  };
  const getCollectingDays = async () => {
    await fetch("https://installment-json-serve.onrender.com/collect_day")
      .then((res) => res.json())
      .then((data) => {
        let dayCollecting = data.filter(
          (collectDay) => collectDay.order_id === id
        );
        console.log(dayCollecting);
        setCollectDays(dayCollecting);
      });
  };
  useEffect(() => {
    getOrder();
    getCollectingDays();
  }, []);
  const getTotalPaid = () => {
    return collectingDays?.reduce((result, cur) => {
      return (result += +cur?.price);
    }, 0);
  };
  const deleteOrder = async () => {
    let confirm = window.confirm("هل انت متاكد انك تريد حذف الطلب؟");
    if (confirm) {
      await fetch(
        `https://installment-json-serve.onrender.com/orders/${order?.id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
        });
    }
  };
  const changeOrderStatus = async () => {
    let confirm = window.confirm(
      "هل انت متاكد انك تريد تغيير حالة الطلب الي طلب مكتمل؟"
    );
    console.log(order?.id);
    if (confirm) {
      await fetch(
        `https://installment-json-serve.onrender.com/orders/${order?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...order,
            status: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          getOrder();
        });
    }
  };

  if (!order) return;
  return (
    <div className="my-8 text-xs md:text-base">
      <div className="container">
        <h2 className="text-2xl font-semibold ">معلومات الطلب</h2>
        <div className="border-t mb-6 mt-2 border-gray-400" />
        <div className="lg:grid lg:grid-cols-2 gap-8 flex flex-col ">
          <div className="flex gap-4 items-start ">
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={deleteOrder}
            >
              ألغاء الطلب
            </button>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={changeOrderStatus}
            >
              تغيير حالة الطلب
            </button>
          </div>
          <ul className="shadow bg-white rounded-md  flex-1 ">
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1 ">نوع الطلب:</span>{" "}
              <strong className="flex-1">{order?.product_name}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b">
              <span className="w-28 flex-1">حالة الطلب:</span>{" "}
              <strong className="flex-1">
                {" "}
                {order?.status ? (
                  <span className="p-1 text-sm rounded-md text-white bg-green-400">
                    مكتمل
                  </span>
                ) : (
                  <span className="p-1 text-sm rounded-md text-black bg-yellow-300">
                    مستمر
                  </span>
                )}
              </strong>
            </li>
          </ul>

          <ul className="shadow bg-white rounded-md  flex-1 ">
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1"> تاريخ البدء:</span>{" "}
              <strong className="flex-1">
                {new Date(order?.created_at)?.toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  weekday: "long",
                })}
              </strong>
            </li>
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1">عدد أشهر التقسيط:</span>{" "}
              <strong className="flex-1">{order?.month_count}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b ">
              <span className="w-28 flex-1">المبلغ الشهري:</span>{" "}
              <strong className="flex-1">{order?.price_per_month}</strong>
            </li>
            <li className="flex gap-4 p-2 bg-gray-100">
              <span className="w-28 flex-1">الاشهر المدفوعة:</span>{" "}
              <strong className="flex-1">
                {order?.month_count - collectingDays?.length}
              </strong>
            </li>
          </ul>

          <ul className="shadow bg-white rounded-md  flex-1 ">
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1">المقدم:</span>{" "}
              <strong className="flex-1">{order?.offered}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1"> سعر الطلب:</span>{" "}
              <strong className="flex-1">{order?.product_price}</strong>
            </li>

            <li className="flex gap-4 p-2 border-b ">
              <span className="w-28 flex-1">اجمالي المبلغ المسدد :</span>{" "}
              <strong className="flex-1">{getTotalPaid()}</strong>
            </li>
            <li className="flex gap-4 p-2 border-b bg-gray-100">
              <span className="w-28 flex-1">السعر النهائي:</span>{" "}
              <strong className="flex-1">{order?.total_price}</strong>
            </li>
          </ul>
        </div>
        <h3 className="text-xl font-semibold mt-8">المدفوعات</h3>
        <div className="border-t mb-6 mt-2 border-gray-400" />
        <div className="overflow-auto w-full">
          <table className="shadow table-auto w-full mt-8 bg-white">
            <thead className="bg-blue-600 text-white">
              <tr className="border">
                <th className="border p-2 whitespace-nowrap">تاريخ السداد</th>
                <th className="border p-2 whitespace-nowrap">المبلغ</th>
                <th className="border p-2 whitespace-nowrap">المستلم </th>
              </tr>
            </thead>
            <tbody>
              {collectingDays?.map((collect, index) => (
                <tr>
                  <td className="border p-2">
                    {" "}
                    {new Date(collect?.created_at)?.toLocaleDateString(
                      "ar-EG",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        weekday: "long",
                      }
                    )}
                  </td>
                  <td className="border p-2">{collect?.price}</td>
                  <td className="border p-2">{collect?.created_name}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100">
              <tr>
                <td className="border p-2">
                  <div className="flex gap-4 items-center">
                    أجمالي عدد الاشهر المدفوعة
                    <span className="bg-green-400 p-1 sm:px-4 text-sm rounded">
                      {collectingDays?.length}
                    </span>{" "}
                  </div>
                </td>
                <td className="border p-2" colSpan={2}>
                  <div className="flex gap-4 items-center">
                    اجمالي المبلغ المسدد
                    <span className="bg-green-400 p-1 sm:px-4 text-sm rounded">
                      {getTotalPaid()}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
