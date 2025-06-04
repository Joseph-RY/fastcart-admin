import { createSlice } from "@reduxjs/toolkit";
// import { getProducts } from "../../features/get-products/get-products";
// import { getProductById } from "../../features/get-product-by-id/get-product-by-id";

const initialProductsData = {
    pageNumber: 1,
    pageSize: 10,
    totalPage: 1,
    totalRecord: 10,
    data: {
        products: [
            {
                id: 201,
                productName: "Nokia SmartWatch Alpha",
                image: "nokia-smartwatch-alpha.jpg",
                color: "red",
                price: 12000,
                hasDiscount: true,
                discountPrice: 11000,
                quantity: 120,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 202,
                productName: "MSI ProFit Tracker",
                image: "msi-profit-tracker.png",
                color: "Red",
                price: 15000,
                hasDiscount: false,
                discountPrice: 0,
                quantity: 60,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 203,
                productName: "Nokia Fitness Band 3",
                image: "nokia-fitness-band-3.jpg",
                color: "red",
                price: 8500,
                hasDiscount: true,
                discountPrice: 7500,
                quantity: 90,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 204,
                productName: "MSI SpeedRun Watch",
                image: "msi-speedrun-watch.png",
                color: "Red",
                price: 22000,
                hasDiscount: true,
                discountPrice: 20000,
                quantity: 40,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 205,
                productName: "Nokia Active Watch",
                image: "nokia-active-watch.jpg",
                color: "red",
                price: 11000,
                hasDiscount: false,
                discountPrice: 0,
                quantity: 75,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 206,
                productName: "MSI Pulse Tracker",
                image: "msi-pulse-tracker.png",
                color: "Red",
                price: 18000,
                hasDiscount: true,
                discountPrice: 16000,
                quantity: 55,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 207,
                productName: "Nokia Runner Band",
                image: "nokia-runner-band.jpg",
                color: "red",
                price: 7000,
                hasDiscount: false,
                discountPrice: 0,
                quantity: 150,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 208,
                productName: "MSI Gaming SmartWatch",
                image: "msi-gaming-smartwatch.png",
                color: "Red",
                price: 25000,
                hasDiscount: true,
                discountPrice: 23000,
                quantity: 20,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 209,
                productName: "Nokia Classic Watch",
                image: "nokia-classic-watch.jpg",
                color: "red",
                price: 9000,
                hasDiscount: false,
                discountPrice: 0,
                quantity: 200,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            },
            {
                id: 210,
                productName: "MSI Explorer Band",
                image: "msi-explorer-band.png",
                color: "Red",
                price: 14000,
                hasDiscount: true,
                discountPrice: 12500,
                quantity: 65,
                productInMyCart: false,
                categoryId: 83,
                categoryName: "SmartWatch",
                productInfoFromCart: null
            }
        ],
        colors: [
            { id: 3, colorName: "red" },
            { id: 34, colorName: "Red" }
        ],
        brands: [
            { id: 42, brandName: "Nokia" },
            { id: 62, brandName: "MSI" }
        ],
        minMaxPrice: {
            minPrice: 7000,
            maxPrice: 25000
        }
    }
};

export const productSlice = createSlice({
    name: "products",
    initialState: {
        data: initialProductsData,
        product: {}
    },
    reducers: {
        // сюда можно добавить обычные редьюсеры, если нужны
    },
    extraReducers: (builder) => {
        // Для имитации getProducts можно вызвать диспатч setData из компонента
        /*
        builder
          .addCase(getProducts.fulfilled, (state, action) => {
              state.data = action.payload
          })
          .addCase(getProductById.fulfilled, (state, action) => {
              state.product = action.payload
          })
        */
    }
});

export default productSlice.reducer;

// -- пример имитации thunk для getProducts, который просто возвращает локальные данные --
// export const getProducts = createAsyncThunk(
//   'products/getProducts',
//   async () => {
//     // Вместо fetch — просто возвращаем локальные данные
//     return initialProductsData;
//   }
// );
