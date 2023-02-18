import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

const CollectingDay = () => {
  const [collect, setCollect] = useState();
  const [collectDays, setCollectDays] = useState();
  const params = useParams();
  const { id } = params;

  const getCollect = async () => {
    await fetch(`http://localhost:4000/collecting`)
      .then((res) => res.json())
      .then((data) => {
        let day = data.find((collect) => collect?.day_id === id);
        console.log(data, day);
        setCollect(day);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollectingDays = async () => {
    await fetch("http://localhost:4000/collect_day")
      .then((res) => res.json())
      .then((data) => {
        let dayCollecting = data.filter(
          (collectDay) => collectDay.created_at === id
        );
        setCollectDays(dayCollecting);
      });
  };
  useEffect(() => {
    getCollect();
    getCollectingDays();
  }, [id]);

  const getInformationCount = (dateId) => {
    let day =
      collectDays &&
      collectDays?.filter((collect) => collect.created_at === dateId);
    return day?.length;
  };

  const getInformationPrice = (dateId) => {
    let days =
      collectDays &&
      collectDays?.filter((collect) => collect.created_at === dateId);
    return days?.reduce((result, cur) => {
      return (result += parseInt(cur?.price));
    }, 0);
  };

  const deleteCollect = async (collectId) => {
    let confirm = window.confirm("هل انت متاكد انك تريد حذف هذا المستخدم");
    if (confirm) {
      await fetch(`http://localhost:4000/collect_day/${collectId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => getCollectingDays());
    }
  };
  return (
    <div className="mt-12">
      <div className="container">
        <SectionTitle
          title={
            <div className="flex gap-4">
              تحصيل يوم
              <span>
                <b>
                  {new Date(collect?.date)?.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    weekday: "long",
                  })}
                </b>
              </span>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-4 text-lg mt-8">
          <div className="shadow bg-green-200 rounded-md  flex-1 flex gap-4 p-2">
            <span className="w-28 flex-1 ">أجمالي العملاء:</span>{" "}
            <strong className="flex-1">
              {!!collect ? getInformationCount(collect?.day_id) : null}
            </strong>
          </div>
          <div className="shadow bg-yellow-200 rounded-md  flex-1 flex gap-4 p-2">
            <span className="w-28 flex-1 ">المبلغ الاجمالي :</span>{" "}
            <strong className="flex-1">
              {!!collect ? getInformationPrice(collect?.day_id) : null}
            </strong>
          </div>
        </div>
        <table className="shadow table-auto w-full mt-8 bg-white">
          <thead className="bg-blue-600 text-white">
            <tr className="border">
              <th className="border p-2 whitespace-nowrap">#</th>
              <th className="border p-2 whitespace-nowrap text-center">
                الاسم
              </th>
              <th className="border p-2 whitespace-nowrap text-center">
                الطلب
              </th>
              <th className="border p-2 whitespace-nowrap text-center">
                المبلغ
              </th>
              <th className="border p-2 whitespace-nowrap text-center">
                أعدادات
              </th>
            </tr>
          </thead>
          <tbody>
            {collectDays
              ? collectDays?.map((collectDay, index) => (
                  <tr key={collectDay?.id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{collectDay?.username}</td>
                    <td className="border p-2">{collectDay?.order_name}</td>
                    <td className="border p-2">{collectDay?.price}ج</td>
                    <td className="border p-2">
                      <button
                        onClick={() => deleteCollect(collectDay?.id)}
                        className="bg-red-100 text-red-500 rounded-md text-sm p-1 px-2"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
};

export default CollectingDay;
