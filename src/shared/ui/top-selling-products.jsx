import React from "react";

const TopSellingProducts = ({ img, name, text, price, status }) => {
  return (
    <div className="flex gap-2">
      <div className="rounded-[8px]">
        <img src={img} alt={name} />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <h4 className="font-medium text-base">{name}</h4>
          <p className="text-[#10B981]">{price}</p>
        </div>
        <div className="flex justify-between text-[#6C737F] dark:text-[#9CA3AF]">
          <p>{text}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
