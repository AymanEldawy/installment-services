import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { PrimaryButton } from "./../components/Global/PrimaryButton/PrimaryButton";
import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

const Collecting = () => {
  const [dayMsg, setDayMsg] = useState(false);
  const [collecting, setCollecting] = useState();
  const [collectDays, setCollectDays] = useState();
  const [collectingFilter, setCollectingFilter] = useState();
  const [itemOffset, setItemOffset] = useState(0);

  const getCollecting = async () => {
    await fetch("https://installment-json-serve.onrender.com/collecting")
      .then((res) => res.json())
      .then((data) => {
        setCollecting(data);
        setCollectingFilter(data);
      });
  };
  const getCollectingDays = async () => {
    await fetch("https://installment-json-serve.onrender.com/collect_day")
      .then((res) => res.json())
      .then((data) => setCollectDays(data));
  };
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

  useEffect(() => {
    getCollecting();
    getCollectingDays();
  }, []);

  function isDateToday() {
    const todayDate = new Date();
    let dayExist = false;
    for (const collect of collecting) {
      const otherDate = new Date(collect?.date);
      if (
        otherDate.getDate() === todayDate.getDate() &&
        otherDate.getMonth() === todayDate.getMonth() &&
        otherDate.getYear() === todayDate.getYear()
      ) {
        dayExist = true;
        return true;
      }
    }
    return dayExist;
  }

  const addNewDate = async () => {
    // const
    const isToday = isDateToday();
    if (isToday) {
      setDayMsg("تم اضافة اليوم بالفعل لا يمكنك اضافته مرة اخري");
      setTimeout(() => {
        setDayMsg("");
      }, 4000);
    } else {
      let confirm = window.confirm("هل انت متاكد انك تريد اضافة يوم جديد؟");
      if (confirm) {
        await fetch(`https://installment-json-serve.onrender.com/collecting`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json;odata.metadata=full",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uuidv4(),
            date: new Date(),
          }),
        })
          .then((data) => data.json())
          .then((response) => {
            setDayMsg("تم أضافة يوم جديد بنجاح");
            getCollecting();
            setTimeout(() => {
              setDayMsg("");
            }, 4000);
          });
      }
    }
  };

  const handelSearch = (e) => {
    let key = e.target.value;
    if (key !== "") {
      let collectFilters = collecting?.filter((collect) => {
        let date = new Date(collect?.date)?.toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "long",
        });

        return date.indexOf(key) !== -1 || collect?.date?.indexOf(key) !== -1;
      });
      setCollectingFilter(collectFilters);
    } else {
      setCollectingFilter(collecting);
    }
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
    <>
      {/* {open ? <AddNewCollect close={() => setOpen(false)} /> : null} */}
      <div className="container">
        <div className="mt-8">
          <SectionTitle
            title="التحصيلات"
            extraContent={
              <>
                <PrimaryButton text="أضافة يوم جديد" onClick={addNewDate} />
                {dayMsg ? <p className="bg-yellow-300 p-2">{dayMsg}</p> : null}
              </>
            }
          />
          <div className="flex gap-4 justify-between">
            <input
              onChange={handelSearch}
              type="search"
              placeholder="أبحث في أيام التحصيل"
              className="p-2 rounded-md block flex-1 max-w-xs "
            />
          </div>
          <div className="border-t mt-4" />
        </div>
        <div className="overflow-auto w-full">
          <table className="shadow table-auto w-full mt-8 bg-white text-xs md:text-base">
            <thead className="bg-blue-600 text-white">
              <tr className="border">
                <th className="border p-2 whitespace-nowrap">#</th>
                <th className="border p-2 whitespace-nowrap min-w-[150px]">
                  التاريخ
                </th>
                <th className="border p-2 whitespace-nowrap">عدد التحصيلات</th>
                <th className="border p-2 whitespace-nowrap">مبلغ التحصيلات</th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                ? currentItems
                    ?.sort(function (a, b) {
                      return new Date(b.date) - new Date(a.date);
                    })
                    .map((collect, index) => (
                      <tr key={collect?.id}>
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">
                          <NavLink
                            to={`/collecting/${collect?.id}`}
                            className="underline text-blue-500 font-medium md:text-lg bg-blue-100 p-1 rounded cursor-pointer"
                          >
                            {new Date(collect?.date)?.toLocaleDateString(
                              "ar-EG",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                weekday: "long",
                              }
                            )}
                          </NavLink>
                        </td>
                        <td className="border p-2">
                          {!!collect ? getInformationCount(collect?.id) : null}{" "}
                          عملاء
                        </td>
                        <td className="border p-2">
                          {!!collect ? getInformationPrice(collect?.id) : null}{" "}
                          جنية
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
    </>
  );
};

export default Collecting;
