import { useState } from "react";

import { AddNewCustomer } from "./../components/Customers/AddNewCustomer";
import { Customers } from "./../components/Customers/Customers";
import { PlusCircleIcon } from "./../components/Icons/PlusCircleIcon";
import { SectionTitle } from "./../components/SectionTitle/SectionTitle";

export default function Home() {
  const [stage, setStage] = useState(1);
  // fetch customers
  // https://deploy-json-server-r6e2vseod-aymaneldawy.vercel.app/orders

  return (
    <div className="container pt-4 lg:pt-8 mx-auto">
      {stage === 1 ? (
        <>
          <SectionTitle
            title="الفهرس"
            extraContent={
              <button
                onClick={() => setStage(2)}
                className="flex gap-1 bg-blue-600 text-white p-2 rounded-md"
              >
                <PlusCircleIcon /> أضافة عميل
              </button>
            }
          />

          <Customers />
        </>
      ) : (
        <>
          <SectionTitle
            title="أضافة عميل جديد"
            extraContent={
              <button
                onClick={() => setStage(1)}
                className="flex gap-1 bg-red-600 text-white p-2 rounded-md"
              >
                الغاء
              </button>
            }
          />
          <AddNewCustomer />
        </>
      )}
    </div>
  );
}
