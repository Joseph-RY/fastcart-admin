import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductsTable from "../../widgets/products-table";
import { Button } from "@mui/material";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Link to="add-product">
          <Button className="relative bottom-[55px]" variant="contained">
            Add Product
          </Button>
        </Link>
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
