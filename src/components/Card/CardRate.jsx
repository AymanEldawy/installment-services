import React from 'react';
import { StarIcon } from './../Icons/StarIcon';

export const CardRate = ({ rating, width, noNumber }) => {
  return (
    <div className="card-rate flex items-center relative">
      {Array.from(['1', '2', '3', '4', '5']).map((rate, index) => (
        <span key={index} style={{ fontSize: '10px' }}>
          <StarIcon
            color={index < rating ? 'yellow' : ''}
            width={width || 12}
          />
        </span>
      ))}
      {noNumber ? null : (
        <small className="text-[8px] mx-1 -m-1">({rating})</small>
      )}
    </div>
  );
};
