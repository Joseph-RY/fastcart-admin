import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrands, deleteBrand, getBrands, editBrand } from "../entities/brands/brandSlice";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const OtherBrands = () => {
  const data = useSelector((state) => state.brand.data);
  const dispatch = useDispatch();

  const [addBrand, setAddBrand] = useState("");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrand(id));
  };

  const handleAddBrand = () => {
    dispatch(addBrands({ BrandName: addBrand }));
    setAddBrand("");
  };

  const openEditDialog = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    let updBrand = {
      id: editId,
      BrandName: editName,
    };
    dispatch(editBrand(updBrand));
    closeEditDialog();
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 w-[45%]">
        <div className="flex justify-between text-gray-500 font-medium pb-4 border-b-[2px]">
          <p>Brands</p>
          <p>Actions</p>
        </div>
        <div>
          {data?.map((e) => (
            <div key={e.id} className="flex justify-between pt-2 pb-4 border-b-[1px] border-gray-300">
              <div>
                <h2>{e.brandName}</h2>
              </div>
              <div className="flex gap-3">
                <div onClick={() => openEditDialog(e.id, e.brandName)} className="text-blue-600 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </div>
                <div onClick={() => handleDeleteBrand(e.id)} className="text-red-500 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 p-7 border-[2px] border-gray-200 rounded-[4px] w-[50%]">
        <h3>Add new brand</h3>
        <TextField value={addBrand} onChange={(e) => setAddBrand(e.target.value)} label="Category Name" />
        <Button onClick={handleAddBrand} variant="contained" className="w-[120px] self-end">
          Create
        </Button>
      </div>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Brand Name" type="text" fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={!editName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OtherBrands;
