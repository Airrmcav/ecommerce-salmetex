// components/navbar/index.tsx


import { getCategories } from "@/api/getCategories/getCategories";
import NavbarClient from "./navbar-client";


const Navbar = async () => {
  const categories = await getCategories();

  return <NavbarClient categories={categories} />;
};

export default Navbar;