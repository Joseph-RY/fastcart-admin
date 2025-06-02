import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../shared/lib/utilits";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { addCategory } from "../../features/add-category/add-category";
import { editCategory } from "../../features/edit-category/edit-category";
import { deleteCategory } from "../../features/delete-category/delete-category";
import { getCategories } from "../../features/get-categories/get-categories";

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
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
    dispatch(getCategories());
  }, [dispatch]);

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
          <div key={category.id} className="relative w-[45%] md:w-[22%] h-[200px] rounded-md border border-gray-400 p-4">
            <div className="absolute top-4 right-4 flex gap-4">
              <div onClick={() => openEditDialog(category)} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <div onClick={() => dispatch(deleteCategory(category.id))} className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <div className="w-[100px] h-[100px] flex flex-col items-start">
              <img src={`${apiUrl}/images/${category.categoryImage}`} alt={category.categoryName} className="w-full object-contain mb-4" />
              <h3 className="self-center text-base font-medium">{category.categoryName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCategories;
