import React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

const CollectingDay = () => {
  const [collect, setCollect] = useState();
  const [collectingFilter, setCollectingFilter] = useState();
  const [collectDays, setCollectDays] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const params = useParams();
  const { id } = params;

  const getCollect = async () => {
    await fetch(`https://installment-json-serve.onrender.com/collecting`)
      .then((res) => res.json())
      .then((data) => {
        let day = data.find((collect) => collect?.id === id);
        console.log(data, day);
        setCollect(day);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollectingDays = async () => {
    await fetch("https://installment-json-serve.onrender.com/collect_day")
      .then((res) => res.json())
      .then((data) => {
        let dayCollecting = data.filter(
          (collectDay) => collectDay.created_at === id
        );
        setCollectingFilter(dayCollecting);
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
    let confirm = window.confirm("هل انت متاكد انك تريد حذف هذا التحصيل");
    if (confirm) {
      await fetch(
        `https://installment-json-serve.onrender.com/collect_day/${collectId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => getCollectingDays());
    }
  };

  const handelSearch = (e) => {
    let key = e.target.value;
    console.log(key);
    if (key !== "") {
      let collectFilters = collectDays?.filter((collect) => {
        return (
          collect?.username.indexOf(key) !== -1 ||
          collect?.order_name?.indexOf(key) !== -1 ||
          collect?.price?.indexOf(key) !== -1
        );
      });
      setCollectingFilter(collectFilters);
    } else {
      setCollectingFilter(collectDays);
    }
    console.log(collectingFilter);
  };

  const itemsPerPage = 30;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = collectingFilter?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(collectingFilter?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % collectingFilter?.length;
    setItemOffset(newOffset);
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
        <div className="grid grid-cols-2 gap-4 text-lg mt-4">
          <div className="shadow bg-green-200 rounded-md  text-center text-sm md:text-lg flex-1 md:flex  gap-4 p-2">
            <span className="w-28 flex-1 ">أجمالي العملاء:</span>{" "}
            <strong className="flex-1">
              {!!collect ? getInformationCount(collect?.id) : null}
            </strong>
          </div>
          <div className="shadow bg-yellow-200 rounded-md  text-center text-sm md:text-lg flex-1 md:flex  gap-4 p-2">
            <span className="w-28 flex-1 ">المبلغ الاجمالي:</span>{" "}
            <strong className="flex-1">
              {!!collect ? getInformationPrice(collect?.id) : null}
            </strong>
          </div>
        </div>
        <div className="border-t border-gray-300  mt-4" />

        <div className="flex gap-4 my-4 justify-between">
          <input
            onChange={handelSearch}
            type="search"
            placeholder="أبحث في المدفوعات"
            className="p-2 rounded-md block flex-1 max-w-xs"
          />
        </div>
        <div className="border-t border-gray-300  mt-4" />
        <div className="overflow-auto w-full">
          <table className="shadow table-auto w-full mt-8 bg-white text-xs md:text-base">
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
              {currentItems
                ? currentItems?.map((collectDay, index) => (
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
      </div>
    </div>
  );
};

export default CollectingDay;
