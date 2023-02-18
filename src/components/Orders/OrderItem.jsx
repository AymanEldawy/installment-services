import React from 'react';
import Image from 'next/image';
export const OrderItem = ({ item }) => {
  console.log(item);
  return (
    <div className="flex mb-4 gap-2">
      <figure className='w-44'>
        <Image src={item?.img} alt={item?.title} height={180} width={150} className='min-w-[120px]' />
      </figure>
      <p>{item?.description?.slice(0,60)}</p>
    </div>
  );
};
