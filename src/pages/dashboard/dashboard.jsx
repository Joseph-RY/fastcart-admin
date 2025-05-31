import React, { useEffect } from "react";

import ChartCards from "../../shared/ui/chart-cards";
import ApexChart from "../../widgets/apex-chart";
import TopSellingProducts from "../../shared/ui/top-selling-products";
import RecentTable from "../../widgets/recent-table";

import sales from "/src/shared/images/chart.png";
import cost from "/src/shared/images/discount.png";
import tick from "/src/shared/images/tick.png";
import product from "/src/shared/images/product.png";
import TopProductTable from "../../widgets/top-product-table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-3 w-full lg:w-2/3">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <ChartCards img={sales} label="Sales" value="$152k" color="bg-[#FEF3F2]" />
            <ChartCards img={cost} label="Cost" value="$99.7k" color="bg-[#FFFAEB]" />
            <ChartCards img={tick} label="Sales" value="$32.1k" color="bg-[#F0FDF9]" />
          </div>
          <div className="w-full">
            <ApexChart />
          </div>
        </div>

        <div className="border-[2px] border-gray-700/40 rounded-[8px] px-4 pt-5 pb-1 flex flex-col gap-4 w-full lg:w-1/3">
          <div className="flex justify-between items-center font-semibold">
            <h3>Top selling products</h3>
            <div className="flex gap-2 items-center text-[#2563EB] dark:text-[#60A5FA] cursor-pointer">
              <p>See All</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
            <TopSellingProducts img={product} name="Healthcare Erbology" text="in Accessories" price="13,153" status="in sales" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-stretch gap-4">
        <RecentTable />
        <TopProductTable />
      </div>
    </div>
  );
};

export default Dashboard;
