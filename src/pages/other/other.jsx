import { NavLink, Outlet } from "react-router-dom";

export default function Other() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <NavLink to="categories" className={({ isActive }) => (isActive ? "text-blue-600 font-bold bg-[#DBEAFE] px-4 py-2 rounded-[4px]" : "font-bold")}>
          Categories
        </NavLink>
        <NavLink to="brands" className={({ isActive }) => (isActive ? "text-blue-600 font-bold bg-[#DBEAFE] px-4 py-2 rounded-[4px]" : "font-bold")}>
          Brands
        </NavLink>
        <NavLink to="banners" className={({ isActive }) => (isActive ? "text-blue-600 font-bold bg-[#DBEAFE] px-4 py-2 rounded-[4px]" : "font-bold")}>
          Subcategories 
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
