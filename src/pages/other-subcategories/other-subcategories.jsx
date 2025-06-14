import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { getSubcategories } from "../../features/get-subcategories/get-subcategories";
import { deleteSubcategory } from "../../features/delete-subcategory/delete-subcategory";
import { editSubcategory } from "../../features/edit-subcategory/edit-subcategory";
import AddSubCategory from "../../features/add-subcategory/ui/add-subcategory";

const OtherSubcategories = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subcategory.data);
  console.log(data);
  const navigate = useNavigate();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const openEditDialog = (id, currentName, categoryId) => {
    setEditId(id);
    setEditName(currentName);
    setEditCategoryId(categoryId);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditId(null);
    setEditName("");
    setEditCategoryId(null);
  };

  const handleSaveEdit = () => {
    let updSubcategory = {
      id: editId,
      categoryId: editCategoryId,
      subCategoryName: editName,
    };

    dispatch(editSubcategory(updSubcategory));
    closeEditDialog();
  };

  const handleDelete = (id) => {
    dispatch(deleteSubcategory(id));
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
    dispatch(getSubcategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between">
      <div className="flex flex-col gap-2 md:w-[45%]">
        <div className="flex justify-between text-gray-500 font-medium pb-4 border-b-[2px]">
          <p>Subcategories</p>
          <p>Actions</p>
        </div>
        <div className="text-base">
          {data?.map((e) =>
            e.subCategories?.map((sub) => (
              <div key={sub.id} className="flex justify-between pt-2 pb-4 border-b-[1px] border-gray-300">
                <div>
                  <h2>{sub.subCategoryName}</h2>
                </div>
                <div className="flex gap-3">
                  <div onClick={() => openEditDialog(sub.id, sub.subCategoryName, e.id)} className="text-blue-600 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </div>
                  <div onClick={() => handleDelete(sub.id)} className="text-red-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="md:w-[50%]">
        <AddSubCategory />
      </div>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Subcategory</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Subcategory Name" type="text" fullWidth value={editName} onChange={(e) => setEditName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={!editName.trim()}>
            Savex
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OtherSubcategories;
