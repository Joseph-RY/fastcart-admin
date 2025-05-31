import { Button, TextField } from "@mui/material";
import MultipleSelect from "../../shared/ui/select-filter";
import ProductsTable from "../../widgets/products-table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button className="relative bottom-[55px]" variant="contained">
          Add Product
        </Button>
      </div>
      <div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
