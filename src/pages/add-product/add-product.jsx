import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, MenuItem, Switch, TextField } from "@mui/material";
import OptionsBlock from "../../widgets/option-block";
import { getCategories } from "../../features/get-categories/get-categories";
import { getSubcategories } from "../../features/get-subcategories/get-subcategories";
import { getBrands } from "../../features/get-brands/get-brands";
import { getColors } from "../../features/get-colors/get-colors";
import { addProduct } from "../../features/add-product/add-product";

const AddProduct = () => {
  const category = useSelector((state) => state.category.data);
  const subcategory = useSelector((state) => state.subcategory.data);
  const brands = useSelector((state) => state.brand.data);
  const colors = useSelector((state) => state.color.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addProductName, setAddProductName] = useState("");
  const [addProductCode, setAddProductCode] = useState("");
  const [addProductText, setAddProductText] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [addProductPrice, setAddProductPrice] = useState("");
  const [addProductDiscount, setAddProductDiscount] = useState("");
  const [addProductQuantity, setAddProductQuantity] = useState("");
  const [SubcategoryChecked, setSubcategoryChecked] = useState(true);
  const [DefOptionsChecked, setOptionsChecked] = useState(true);
  const [selectedColorId, setSelectedColorId] = useState("");
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState({});

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ file, preview: reader.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files) => {
    const limitedFiles = files.slice(0, 4 - images.length);
    try {
      const newImages = await Promise.all(limitedFiles.map(readFileAsDataURL));
      setImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubcategoryChecked = (event) => {
    setSubcategoryChecked(event.target.checked);
  };
  const handleOptionsChecked = (event) => {
    setOptionsChecked(event.target.checked);
  };

  const handleCreate = () => {
    if (!addProductName || !addProductCode || !addProductPrice || !selectedBrand || !selectedCategory || !selectedColorId || !selectedSubcategory) {
      alert("Please complete all required inputs.");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", addProductName || "");
    formData.append("Code", addProductCode || "");
    formData.append("BrandId", Number(selectedBrand));
    formData.append("ColorId", Number(selectedColorId));
    formData.append("SubCategoryId", Number(selectedSubcategory));
    formData.append("Price", parseFloat(addProductPrice));
    formData.append("Quantity", parseInt(addProductQuantity) || 0);
    formData.append("HasDiscount", !!addProductDiscount);
    if (addProductDiscount) formData.append("DiscountPrice", parseFloat(addProductDiscount));
    formData.append("Description", addProductText || "");

    console.log(formData)

    images.forEach((imgObj) => {
      formData.append("Images", imgObj.file);
    });
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/");
    dispatch(getSubcategories());
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getColors());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/products">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Products / Add New</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/products">
            <Button className="!border-gray-300" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button onClick={handleCreate} variant="contained">
            Create
          </Button>
        </div>
      </div>
      <div className="flex items-stretch justify-between">
        <div className="w-full md:w-[65%] flex flex-col gap-10">
          <div>
            <div className="space-y-3">
              <h2 className="font-bold">Inforamtion</h2>
              <div className="flex justify-between">
                <TextField value={addProductName} onChange={(e) => setAddProductName(e.target.value)} className="w-[65%]" label="Product Name" />
                <TextField value={addProductCode} onChange={(e) => setAddProductCode(e.target.value)} className="w-[30%]" label="Code" />
              </div>
              <TextField value={addProductText} onChange={(e) => setAddProductText(e.target.value)} label="Description" multiline rows={8} fullWidth />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%]">
              <TextField value={selectedCategory ?? ""} onChange={(e) => setSelectedCategory(e.target.value)} select label="Select Category" fullWidth>
                {category.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="w-[45%]">
              <TextField value={selectedBrand ?? ""} onChange={(e) => setSelectedBrand(e.target.value)} select label="Select Brand" fullWidth>
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-bold">Price</h2>
            <div className="flex justify-between">
              <TextField value={addProductPrice ?? ""} onChange={(e) => setAddProductPrice(e.target.value)} className="w-[30%]" type="number" label="Product Price" />
              <TextField value={addProductDiscount ?? ""} onChange={(e) => setAddProductDiscount(e.target.value)} className="w-[30%]" type="number" label="Discount" />
              <TextField value={addProductQuantity ?? ""} onChange={(e) => setAddProductQuantity(e.target.value)} className="w-[30%]" type="number" label="Count" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={SubcategoryChecked} onChange={handleSubcategoryChecked} inputProps={{ "aria-label": "controlled" }} />
              <p>Add subcategory for this product</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-[1px] border-gray-300 rounded-[4px]">
            <div>
              <h2 className="font-bold">Different Options</h2>
              <p className="text-gray-600">This product has multiple options</p>
            </div>
            <Switch checked={DefOptionsChecked} onChange={handleOptionsChecked} inputProps={{ "aria-label": "controlled" }} />
          </div>
          <OptionsBlock options={options} setOptions={setOptions} />
        </div>
        <div className="w-full md:w-[30%] gap-10  flex-wrap">
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Colour:</h2>
                <div className="flex items-center gap-1 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <Button className="">Create New</Button>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {colors?.map((e) => {
                  const isSelected = selectedColorId === e.id;
                  return (
                    <div key={e.id} onClick={() => setSelectedColorId(e.id)} className={`w-10 h-10 rounded-full cursor-pointer border-2 ${isSelected ? "border-blue-600 p-[2px]" : "border-transparent"}`}>
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: e.colorName }} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-5">
              <h2 className="font-bold">Subcategory</h2>
              <TextField value={selectedSubcategory ?? ""} onChange={(e) => setSelectedSubcategory(e.target.value)} select label="Select Subcategory" fullWidth>
                {subcategory?.map((e) =>
                  e.subCategories?.map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.subCategoryName}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </div>
            <div className="space-y-5">
              <h2 className="font-bold">Images</h2>
              <div className="max-w-[400px]">
                <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="border border-dashed border-gray-400 p-6 text-center rounded-md mb-4">
                  <label htmlFor="image-upload" className="cursor-pointer block text-blue-600 font-medium mb-2">
                    Click to upload or drag and drop
                  </label>
                  <p className="text-sm text-gray-500">(SVG, JPG, PNG, or gif maximum 900×400)</p>
                  <input id="image-upload" type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between text-gray-500 text-sm font-semibold border-b pb-2">
                    <span>Image</span>
                    <span>File name</span>
                    <span>Action</span>
                  </div>
                  {images.map(({ file, preview }, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span className="w-12 h-12 flex items-center justify-center rounded bg-gray-100 text-xs text-gray-500 overflow-hidden">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                      </span>
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{file.name}</span>
                      <button onClick={() => removeImage(index)} className="text-red-600 hover:text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
