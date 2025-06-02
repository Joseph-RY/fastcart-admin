import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, MenuItem, Switch } from "@mui/material";
import { getCategories } from "../../features/get-categories/get-categories";
import { getSubcategories } from "../../features/get-subcategories/get-subcategories";
import { getBrands } from "../../features/get-brands/get-brands";
import { getColors } from "../../features/get-colors/get-colors";
import { getProductById } from "../../features/get-product-by-id/get-product-by-id";
import { updateProduct } from "../../features/edit-product/edit-product";
import OptionsBlock from "../../widgets/option-block";
import { apiUrl } from "../../shared/lib/utilits";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.category.data);
  const subcategory = useSelector((state) => state.subcategory.data);
  const brands = useSelector((state) => state.brand.data);
  const colors = useSelector((state) => state.color.data);
  const product = useSelector((state) => state.products.product);

  console.log(product.data);

  const [addProductName, setAddProductName] = useState("");
  const [addProductCode, setAddProductCode] = useState("");
  const [addProductText, setAddProductText] = useState("");
  const [addProductPrice, setAddProductPrice] = useState("");
  const [addProductDiscount, setAddProductDiscount] = useState("");
  const [addProductQuantity, setAddProductQuantity] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");

  const [SubcategoryChecked, setSubcategoryChecked] = useState(false);
  const [DefOptionsChecked, setDefOptionsChecked] = useState(false);
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!id) return;

    dispatch(getProductById(id));
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(getBrands());
    dispatch(getColors());
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.data) {
      const data = product.data;

      setAddProductName(data.productName || "");
      setAddProductCode(data.code || "");
      setAddProductText(data.description || "");
      setAddProductPrice(data.price || "");
      setAddProductDiscount(data.discountPrice || "");
      setAddProductQuantity(data.quantity ?? "");

      const matchedBrand = brands.find((b) => b.brandName === data.brand);
      const matchedColor = colors.find((c) => c.colorName === data.color);

      setSelectedBrand(matchedBrand?.id || "");
      setSelectedColorId(matchedColor?.id || "");
      setSelectedSubcategory(data.subCategoryId || "");

      const matchedCategory = subcategory.find((cat) => cat.subCategories?.some((sub) => sub.id === data.subCategoryId));

      setSelectedCategory(matchedCategory?.id || "");

      if (data.images) {
        setImages(
          data.images.map((img) => ({
            id: img.id,
            images: img.images,
            preview: `${apiUrl}/images/${img.images}`,
          }))
        );
      }

      setSubcategoryChecked(!!data.subCategoryId);
    }
  }, [product, brands, colors, subcategory]);

  const handleSubmit = () => {
    if (!addProductName || !addProductCode || !selectedBrand || !selectedColorId || !selectedSubcategory || !addProductPrice) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("Id", id);
    formData.append("ProductName", addProductName);
    formData.append("Code", addProductCode);
    formData.append("BrandId", selectedBrand);
    formData.append("ColorId", selectedColorId);
    formData.append("SubCategoryId", selectedSubcategory);
    formData.append("Price", addProductPrice);
    formData.append("Quantity", addProductQuantity);
    formData.append("HasDiscount", addProductDiscount ? "true" : "false");
    formData.append("DiscountPrice", addProductDiscount);
    formData.append("Description", addProductText);

    const existingImageIds = images.filter((img) => !img.file && img.id).map((img) => img.id);
    existingImageIds.forEach((id) => {
      formData.append("ImageIdsToKeep", id);
    });

    images
      .filter((img) => img.file)
      .forEach((img) => {
        formData.append("Images", img.file);
      });

    dispatch(updateProduct({ id, data: formData })).then(() => {
      navigate("/dashboard/products");
    });
  };

  const handleOptionsChecked = (e) => setDefOptionsChecked(e.target.checked);
  const handleSubcategoryChecked = (e) => setSubcategoryChecked(e.target.checked);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      images: file.name,
      preview: URL.createObjectURL(file),
    }));
    setImages((e) => [...e, ...filePreviews].slice(0, 4));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const filePreviews = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      images: file.name,
      preview: URL.createObjectURL(file),
    }));
    setImages((e) => [...e, ...filePreviews].slice(0, 4));
  };

  const removeImage = (id) => {
    setImages((e) => e.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/products">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Products / Edit Product</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/products">
            <Button className="!border-gray-300" variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button onClick={handleSubmit} variant="contained">
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
              <TextField value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} select label="Select Category" fullWidth>
                {categories.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="w-[45%]">
              <TextField value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} select label="Select Brand" fullWidth>
                {brands.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.brandName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-bold">Price</h2>
            <div className="flex justify-between">
              <TextField value={addProductPrice} onChange={(e) => setAddProductPrice(e.target.value)} className="w-[30%]" type="number" label="Product Price" />
              <TextField value={addProductDiscount} onChange={(e) => setAddProductDiscount(e.target.value)} className="w-[30%]" type="number" label="Discount" />
              <TextField value={addProductQuantity} onChange={(e) => setAddProductQuantity(e.target.value)} className="w-[30%]" type="number" label="Count" />
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
              <TextField value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} select label="Select Subcategory" fullWidth>
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
              <div>
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
                  {images.map(({ id, images: fileName, preview }) => (
                    <div key={id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span className="w-12 h-12 flex items-center justify-center rounded bg-gray-100 text-xs text-gray-500 overflow-hidden">
                        <img src={preview || `${apiUrl}/images/${fileName}`} alt={fileName} className="w-full h-full object-cover" />
                      </span>
                      <span className="text-sm text-gray-700 truncate max-w-[150px]">{fileName}</span>
                      <button onClick={() => removeImage(id)} className="text-red-600 hover:text-red-800">
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

export default EditProduct;
