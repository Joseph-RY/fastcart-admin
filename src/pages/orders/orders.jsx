import { Button, TextField } from "@mui/material";
import MultipleSelect from "../../shared/ui/select-filter";
import OrderTable from "../../widgets/order-table";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button className="relative bottom-[55px]" variant="contained">
          Add Order
        </Button>
      </div>

      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Orders;
