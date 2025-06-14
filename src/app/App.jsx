import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "/src/app/layouts/layout";
import Dashboard from "/src/pages/dashboard/dashboard";
import Orders from "/src/pages/orders/orders";
import Products from "/src/pages/products/products";
import Other from "/src/pages/other/other";
import Login from "/src/pages/login/login";
import OtherCategories from "../pages/other-categories/other-categories";
import OtherBrands from "../pages/other-brands/other-brands";
import OtherSubcategories from "../pages/other-subcategories/other-subcategories";
import AddProduct from "../pages/add-product/add-product";
import EditProduct from "../pages/edit-product/edit-product";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/add-product",
          element: <AddProduct />,
        },
        {
          path: "products/edit-product/:id",
          element: <EditProduct />,
        },
        {
          path: "other",
          element: <Other />,
          children: [
            {
              index: true,
              element: <Navigate to="categories" />,
            },
            {
              path: "categories",
              element: <OtherCategories />,
            },
            {
              path: "brands",
              element: <OtherBrands />,
            },
            {
              path: "subcategories",
              element: <OtherSubcategories />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
