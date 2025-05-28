import React from "react";

const ChartCards = ({ img, label, value, color }) => {
  return (
    <div className={`py-4 px-6 flex gap-4 items-center rounded-[4px] ${color}`}>
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <p className="text-[#6C737F] text-[14px]">{label}</p>
        <h3 className="text-[#111927] font-bold text-[24px]">{value}</h3>
      </div>
    </div>
  );
};

export default ChartCards;
