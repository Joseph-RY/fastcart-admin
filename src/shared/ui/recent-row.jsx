import React from "react";

const RecentRow = ({ name, date, amount, status }) => {
  const statusStyles = {
    Paid: "bg-[#D1FADF] text-[#027A48]",
    Pending: "bg-[#E0E7FF] text-[#444CE7]",
  };

  return (
    <div className="grid grid-cols-4 py-3 border-b text-sm items-center">
      <p>{name}</p>
      <p className="text-[#6C737F] dark:text-[#9CA3AF]">{date}</p>
      <p>{amount}</p>
      <span className={`${statusStyles[status]} text-xs font-semibold px-2 py-1 rounded-md text-center w-fit`}>{status}</span>
    </div>
  );
};

export default RecentRow;
