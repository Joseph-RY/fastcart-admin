import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "order", headerName: "Order", width: 120 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "customer", headerName: "Customer", width: 180 },
  {
    field: "paymentStatus",
    headerName: "Payment status",
    width: 150,
    renderCell: (params) => <span style={{ color: "green", backgroundColor: "#d1fae5", padding: "4px 8px", borderRadius: 4 }}>{params.value}</span>,
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    width: 150,
    renderCell: (params) => {
      const statusColorMap = {
        Ready: { background: "#fef3c7", color: "#b45309" },
        Pennding: { background: "#e5e7eb", color: "#374151" },
      };

      const style = statusColorMap[params.value] || {};
      return <span style={{ backgroundColor: style.background, color: style.color, padding: "4px 8px", borderRadius: 4 }}>{params.value}</span>;
    },
  },
  { field: "total", headerName: "Total", width: 100 },
];

const rows = [
  { id: 1, order: "#12512B", date: "May 5, 4:20 PM", customer: "Tom Anderson", paymentStatus: "Paid", orderStatus: "Ready", total: "$49.90" },
  { id: 2, order: "#12523C", date: "May 5, 4:15 PM", customer: "Jayden Walker", paymentStatus: "Paid", orderStatus: "Ready", total: "$34.36" },
  { id: 3, order: "#51232A", date: "May 5, 4:15 PM", customer: "Inez Kim", paymentStatus: "Paid", orderStatus: "Ready", total: "$5.51" },
  { id: 4, order: "#23534D", date: "May 5, 4:12 PM", customer: "Francisco Henry", paymentStatus: "Paid", orderStatus: "Pennding", total: "$29.74" },
  { id: 5, order: "#12599X", date: "May 5, 4:10 PM", customer: "Emily Carter", paymentStatus: "Paid", orderStatus: "Ready", total: "$12.20" },
  { id: 6, order: "#76321F", date: "May 5, 4:08 PM", customer: "Liam Moore", paymentStatus: "Paid", orderStatus: "Pennding", total: "$67.80" },
  { id: 7, order: "#84235B", date: "May 5, 4:07 PM", customer: "Olivia Bennett", paymentStatus: "Paid", orderStatus: "Ready", total: "$23.15" },
  { id: 8, order: "#23984Z", date: "May 5, 4:06 PM", customer: "Mason Reed", paymentStatus: "Paid", orderStatus: "Pennding", total: "$48.40" },
  { id: 9, order: "#51823Q", date: "May 5, 4:05 PM", customer: "Sophia Turner", paymentStatus: "Paid", orderStatus: "Ready", total: "$10.00" },
  { id: 10, order: "#84920J", date: "May 5, 4:03 PM", customer: "Noah Wood", paymentStatus: "Paid", orderStatus: "Ready", total: "$91.33" },
  { id: 11, order: "#19284K", date: "May 5, 4:01 PM", customer: "Isabella Adams", paymentStatus: "Paid", orderStatus: "Pennding", total: "$5.40" },
  { id: 12, order: "#18342A", date: "May 5, 4:00 PM", customer: "James Nelson", paymentStatus: "Paid", orderStatus: "Ready", total: "$17.20" },
  { id: 13, order: "#45291D", date: "May 5, 3:59 PM", customer: "Charlotte Green", paymentStatus: "Paid", orderStatus: "Pennding", total: "$33.33" },
  { id: 14, order: "#23841M", date: "May 5, 3:58 PM", customer: "Benjamin Hall", paymentStatus: "Paid", orderStatus: "Ready", total: "$28.49" },
  { id: 15, order: "#58129P", date: "May 5, 3:56 PM", customer: "Mia Scott", paymentStatus: "Paid", orderStatus: "Pennding", total: "$56.60" },
  { id: 16, order: "#98314N", date: "May 5, 3:54 PM", customer: "Elijah Allen", paymentStatus: "Paid", orderStatus: "Ready", total: "$42.00" },
  { id: 17, order: "#49281E", date: "May 5, 3:52 PM", customer: "Amelia Young", paymentStatus: "Paid", orderStatus: "Pennding", total: "$60.00" },
  { id: 18, order: "#92341L", date: "May 5, 3:50 PM", customer: "William King", paymentStatus: "Paid", orderStatus: "Ready", total: "$15.10" },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function OrderTable() {
  return (
    <Paper sx={{ height: 630, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel } }} pageSizeOptions={[5, 10]} checkboxSelection sx={{ border: 0 }} />
    </Paper>
  );
}
