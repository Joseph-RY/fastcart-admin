import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, editCategory, getCategory } from "../entities/categortes/categorySlice";
import { apiUrl } from "../shared/lib/utilits";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const OtherCategories = () => {
  const data = useSelector((state) => state.category.data);
  const dispatch = useDispatch();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState(null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleImageUpload = (file, setImageState, setPreviewState) => {
    setImageState(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewState(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", newCategoryName);
    formData.append("categoryImage", newCategoryImage);
    dispatch(addCategory(formData));
    resetAddForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", editCategoryId);
    formData.append("CategoryName", editCategoryName);
    formData.append("CategoryImage", editCategoryImage);
    dispatch(editCategory(formData));
    resetEditForm();
  };

  const resetAddForm = () => {
    setNewCategoryName("");
    setNewCategoryImage(null);
    setImagePreview(null);
    setAddOpen(false);
  };

  const resetEditForm = () => {
    setEditCategoryId(null);
    setEditCategoryName("");
    setEditCategoryImage(null);
    setEditOpen(false);
  };

  const openEditDialog = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.categoryName);
    setEditCategoryImage(null);
    setEditOpen(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="self-end flex justify-start md:justify-end relative md:bottom-[55px]">
        <Button onClick={() => setAddOpen(true)} variant="contained">
          Add New
        </Button>
      </div>

      <BootstrapDialog open={addOpen} onClose={resetAddForm}>
        <DialogTitle>Add Category</DialogTitle>
        <IconButton aria-label="close" onClick={resetAddForm} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-5 w-full max-w-[500px]">
            <TextField value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} fullWidth label="Category Name" />
            <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
              <label htmlFor="add-image-upload" className="cursor-pointer">
                Choose files
              </label>
              <input id="add-image-upload" type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], setNewCategoryImage, setImagePreview)} className="hidden" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded shadow max-h-[150px]" />}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outlined" onClick={resetAddForm}>
                Close
              </Button>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog open={editOpen} onClose={resetEditForm}>
        <DialogTitle>Edit Category</DialogTitle>
        <IconButton aria-label="close" onClick={resetEditForm} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-5 w-full max-w-[500px]">
            <TextField value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} fullWidth label="Category Name" />
            <div className="border border-dashed border-gray-400 rounded-md p-6 text-center">
              <label htmlFor="edit-image-upload" className="cursor-pointer">
                Choose files
              </label>
              <input id="edit-image-upload" type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], setEditCategoryImage, setImagePreview)} className="hidden" />

              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded shadow max-h-[150px]" />}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outlined" onClick={resetEditForm}>
                Close
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <div className="flex flex-wrap justify-between gap-5">
        {data?.map((category) => (
          <div key={category.id} style={{ backgroundImage: `url(${apiUrl}/images/${category.categoryImage})` }} className="group relative w-[45%] md:w-[22%] h-[200px] rounded overflow-hidden bg-cover bg-center shadow-md hover:scale-105 transition-transform">
            <div className="absolute bottom-5 left-5 text-white text-lg font-semibold bg-black/50 px-2 py-1 rounded">
              <h3>{category.categoryName}</h3>
            </div>
            <div className="absolute top-2 right-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div onClick={() => openEditDialog(category)} className="bg-black/50 p-2 rounded cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487zM16.862 4.487L19.5 7.125" />
                </svg>
              </div>
              <div onClick={() => dispatch(deleteCategory(category.id))} className="bg-black/50 p-2 rounded cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCategories;
