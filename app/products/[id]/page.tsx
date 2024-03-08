import { getProductById } from "@/action/products";
import Rating from "@/components/Rating";
import EmblaCarousel from "@/components/ui/emba-corousel";
import customer from "@/public/png/customer.png";
import dollar from "@/public/png/dollar.png";
import shipping from "@/public/png/free-shipping.png";
import { TProduct } from "@/types/product";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import AddAndBuyButton from "../AddAndBuyButton";
const OPTIONS: EmblaOptionsType = {};
export default async function page({ params }: { params: { id: string } }) {
  const { data } = await getProductById(params.id);
  const product: TProduct = data;
  return (
    <main>
      <section className="container padding">
        <p className="text-sm py-8">
          Home / Products / {product.category} / {product.subcategory} / v
          {product.name.slice(0, 20)}...
        </p>
      </section>
      <section className="container padding flex flex-col md:flex-row gap-10">
        <div>
          <EmblaCarousel slides={product.images} options={OPTIONS} />
        </div>
        <div className="space-y-3">
          <h5 className="text-xl max-w-[26rem]">{product.name}</h5>
          <p className="pt-4">Average Rating</p>
          <div className="flex items-center gap-x-14">
            <p>
              {product.rating.toString.length > 1
                ? product.rating
                : product.rating + ".00"}
            </p>
            <Rating rating={product.rating} />
          </div>
          <div className="flex gap-x-14">
            <p>${product.price}</p>
            <span
              style={{ borderRadius: "10px 0 10px 0" }}
              className={`${
                product?.stock < 1 ? "bg-orange-500" : "bg-green-500"
              } bg-green-500 px-2 py-0.5  text-sm  capitalize inline-block h-fit`}
            >
              stock {product?.stock < 1 ? "out" : product?.stock}
            </span>
          </div>
          <AddAndBuyButton product={product} />
        </div>
        <div className="w-[18rem] border border-yellow-500 p-3 rounded-md space-y-4 ml-auto hidden md:block">
          <div className="border-b pb-2">
            <Image src={dollar} alt="icon" width={60} height={60} />

            <h1 className="text-sm font-bold pb-1">Money Back Guarantee</h1>
            <p className="text-[0.8rem]">
              If you are not satisfied with our product, then let us know. Our
              team will investigate and return your money.
            </p>
          </div>
          <div className="border-b pb-2">
            <Image src={shipping} alt="icon" width={60} height={60} />
            <h1 className="text-sm font-bold  pb-1">Free Delivery</h1>
            <p className="text-[0.8rem]">
              If you are not satisfied with our product, then let us know. Our
              team will investigate and return your money.
            </p>
          </div>
          <div className="pb-2">
            <Image src={customer} alt="icon" width={60} height={60} />

            <h1 className="text-sm font-bold pt-3 pb-1">Happy Customer</h1>
            <p className="text-[0.8rem]">
              If you are not satisfied with our product, then let us know. Our
              team will investigate and return your money.
            </p>
          </div>
        </div>
      </section>
      <section className="container padding mt-5">
        <h3 className="py-2 uppercase font-bold text-xl">description</h3>
        <hr />
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </section>
      <section className="container padding">
        <h3 className="py-2 uppercase font-bold text-xl">reviews</h3>
        <hr />
        <div></div>
      </section>
    </main>
  );
}
