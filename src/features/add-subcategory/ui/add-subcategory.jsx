import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, MenuItem, TextField } from "@mui/material";
import { getCategories } from "../../get-categories/get-categories";
import { addSubcategory } from "../model/add-subcategory";

const AddSubcategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category.data);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleAddSubcategory = () => {
    dispatch(
      addSubcategory({
        SubCategoryName: subCategoryName,
        CategoryId: categoryId,
      })
    );

    setSubCategoryName("");
    setCategoryId("");
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Add Subcategory</h2>
      <TextField label="Subcategory Name" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} fullWidth />
      <TextField select label="Select Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} fullWidth>
        {data.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.categoryName}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={handleAddSubcategory} variant="contained" className="self-end w-32">
        Add New
      </Button>
    </div>
  );
};

export default AddSubcategory;
