import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../entities/products/productSlice";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const apiUrl = import.meta.env.VITE_API_URL;

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductsTable() {
  const columns = [
    {
      field: "image & products",
      headerName: "Product",
      width: 280,
      renderCell: (params) => {
        const { image, productName } = params.row;

        return (
          <div className="flex gap-4">
            <div className="!w-15 h-12 p-2">
              <img className="w-full h-full object-cover rounded-[8px]" src={`${apiUrl}/images/${image}`} alt="" />
            </div>
            <h3 className="font-semibold">{productName}</h3>
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Inventory",
      width: 200,
      renderCell: (params) => (params.value ? `${params.value} in stock` : "Out of Stock"),
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div className="flex justify-center items-center gap-3 pt-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#2563EB]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <svg onClick={handleClickOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Delete product?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to delete this product?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => dispatch(deleteProduct(id))} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const products = useSelector((state) => state.products.data);
  const dispatch = useDispatch();

  const rows = products?.products;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Paper sx={{ height: 450, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel } }} pageSizeOptions={[5, 10]} checkboxSelection sx={{ border: 0 }} />
    </Paper>
  );
}
