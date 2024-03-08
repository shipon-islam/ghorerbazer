import { getCategories } from "@/action/categoies";
import { getProducts } from "@/action/products";
import CategoriesLinks from "@/components/CategoriesLinks";
import FilterBySlider from "@/components/FilterBySlider";
import ProductCard from "@/components/ProductCard";
import SortByDropDown from "@/components/SortByDropdown";
import { TProduct, TsearchParams } from "@/types/product";
import { IoReorderThreeSharp } from "react-icons/io5";

export default async function page({
  searchParams,
}: {
  searchParams?: TsearchParams;
}) {
  const { data: categories } = await getCategories();
  const { data: products } = await getProducts(searchParams);
  return (
    <main className="container padding flex gap-x-4">
      <aside className="w-[25rem] border-r hidden sm:block">
        <h1 className="uppercase pt-8 pb-4 font-medium">categories</h1>
        <CategoriesLinks categories={categories} />
        <FilterBySlider />
      </aside>
      <section>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">
            Home / Products / {searchParams?.category}{" "}
            {searchParams?.subcategory ? "/ " + searchParams?.subcategory : ""}
          </p>
          <p className="text-sm hidden sm:block">Showing 1–24 of 26 results</p>
          <p className="text-sm sm:hidden">Showing all 15 results</p>
          <div className="hidden sm:block">
            <SortByDropDown />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between  sm:hidden">
          <div className="flex items-center gap-x-1">
            <IoReorderThreeSharp className="text-3xl" />
            <span className="capitalize">show sidebar</span>
          </div>
          <div className="">
            <SortByDropDown />
          </div>
        </div>
        <div className=" mt-2 grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
