import { getProducts } from "@/action/products";
import ProductCard from "@/components/ProductCard";
import { TProduct } from "@/types/product";
import Image from "next/image";

export default async function Home() {
  const { data: products } = await getProducts();

  return (
    <main className="mb-32 md:mb-16 mt-8">
      <section className="grid md:grid-cols-[2fr_1fr] gap-x-10 container padding">
        <aside className="">
          <Image
            className="hover:scale-[.9] object-cover transition-transform duration-500 "
            src="/web-salider.jpg"
            alt="slider"
            width={1000}
            height={1000}
          />
        </aside>
        <div className="hidden md:block">
          <Image
            className="hover:scale-[.9] object-cover transition-transform duration-500 "
            src="/aside.jpg"
            alt="left"
            width={1000}
            height={1000}
          />
        </div>
      </section>
      <section className="container padding mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {products.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </main>
  );
}
