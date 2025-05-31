import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "/src/app/layouts/layout";
import Dashboard from "/src/pages/dashboard/dashboard";
import Orders from "/src/pages/orders/orders";
import Products from "/src/pages/products/products";
import Other from "/src/pages/other/other";
import Login from "/src/pages/login/login";
import OtherCategories from "../widgets/other-categories";
import OtherBrands from "../widgets/other-brands";
import OtherBanners from "../widgets/other-banners";

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
              path: "banners",
              element: <OtherBanners />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
