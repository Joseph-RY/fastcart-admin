import React from "react";
import RecentRow from "../shared/ui/recent-row";

const RecentTable = () => {
  return (
    <div className="w-full md:w-[50%] border-[2px] border-gray-700/40 p-4 rounded-md">
      <h3 className=" font-semibold mb-4">Recent Transactions</h3>
      <div className="grid grid-cols-4 text-sm text-[#6C737F] dark:text-[#9CA3AF] font-medium border-b pb-2">
        <p>Name</p>
        <p>Date</p>
        <p>Amount</p>
        <p>Status</p>
      </div>

      <RecentRow name="Jagarnath S." date="24.05.2023" amount="$124.97" status="Paid" />
      <RecentRow name="Anand G." date="23.05.2023" amount="$55.42" status="Pending" />
      <RecentRow name="Kartik S." date="23.05.2023" amount="$89.90" status="Paid" />
      <RecentRow name="Rakesh S." date="22.05.2023" amount="$144.94" status="Pending" />
      <RecentRow name="Anup S." date="22.05.2023" amount="$70.52" status="Paid" />
      <RecentRow name="Jimmy P." date="22.05.2023" amount="$70.52" status="Paid" />
    </div>
  );
};

export default RecentTable;
