import React from "react";

const ProductRow = ({ name, price, units }) => {
  return (
    <div className=" flex justify-between items-center py-3 text-sm border-b last:border-b-0">
      <div className="flex items-center gap-2 w-1/2">
        <div className="w-9 h-8 bg-[#EEF2FF] rounded"></div>
        <p>{name}</p>
      </div>
      <p className="w-1/4 text-right">{price}</p>
      <p className="w-1/4 text-right">{units}</p>
    </div>
  );
};

export default ProductRow;
