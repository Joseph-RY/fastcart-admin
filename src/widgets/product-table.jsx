import React from "react";
import ProductRow from "../shared/ui/product-row";

const ProductTable = () => {
  return (
    <div className="w-full md:w-[50%] h-max border-[2px] border-gray-700/40 rounded-lg p-4">
      <h3 className="font-semibold mb-4">Top Products by Units Sold</h3>
      <div className="flex justify-between text-[#6C737F] dark:text-[#9CA3AF] text-sm font-medium border-b pb-2">
        <p className="w-1/2">Name</p>
        <p className="w-1/4 text-right">Price</p>
        <p className="w-1/4 text-right">Units</p>
      </div>
      <ProductRow name="Men Grey Hoodie" price="$49.90" units="204" />
      <ProductRow name="Women T-Shirt" price="$34.90" units="155" />
      <ProductRow name="Wome White T-Shirt" price="$40.90" units="120" />
      <ProductRow name="Men White T-Shirt" price="$49.90" units="204" />
      <ProductRow name="Women Red T-Shirt" price="$34.90" units="155" />
      <ProductRow name="Wome White T-Shirt" price="$40.90" units="120" />
    </div>
  );
};

export default ProductTable;
