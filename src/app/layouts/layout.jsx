import { extendTheme } from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import icon from "/src/shared/images/logo_icon.png";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "dashboard/orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "dashboard/products", title: "Products", icon: <LayersIcon /> },
  {
    segment: "dashboard/other",
    title: "Other",
    icon: <BarChartIcon />,
    pattern: "other{/:pageId}*",
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Layout = () => {
  const router = useDemoRouter();
  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      branding={{
        logo: <img src={icon} alt="MUI logo" />,
        title: "Fastcart",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <PageContainer>
          <Outlet />
        </PageContainer>
        <Toaster />
      </DashboardLayout>
    </AppProvider>
  );
};

export default Layout;
