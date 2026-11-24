import { getCategories } from "@/lib/api";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
    const categories = await getCategories();

    return <NavbarClient categories={categories} />;
}
