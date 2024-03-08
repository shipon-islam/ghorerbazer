"use client";
import { addCartAction } from "@/action/cartAction";
import { useUtility } from "@/context/UtilityProvider";
import { TProduct } from "@/types/product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { LuShoppingCart } from "react-icons/lu";
import Rating from "./Rating";
import { Button } from "./ui/button";
type buttonType = MouseEvent<HTMLButtonElement>;

export default function ProductCard({ product }: { product: TProduct }) {
  const { status, data } = useSession();
  const router = useRouter();
  const { open } = useUtility();

  const handleAddToCard = async (e: buttonType, productObj: TProduct) => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    const cartButton = e.currentTarget;
    const spinerEle = e.currentTarget?.nextElementSibling;
    cartButton?.classList.add("hidden");
    spinerEle?.classList.remove("hidden");

    const cardData = {
      user: data?.user.id as string,
      product: product._id,
      subTotal: productObj.price,
      quantity: 1,
      totalAmount: productObj.price,
    };
    try {
      await addCartAction(cardData, data?.user.token as string);
      cartButton?.classList.remove("hidden");
      spinerEle?.classList.add("hidden");
      open();
    } catch (error) {
      cartButton?.classList.remove("hidden");
      spinerEle?.classList.add("hidden");
      console.log(error);
    }
  };
  return (
    <div className="border p-4 rounded-sm hover:-translate-y-2 transition-transform duration-500 relative">
      <Link href={`/products/${product._id}`}>
        <Image
          className="rounded-sm h-[10rem] object-cover"
          src={product?.cover}
          width={190}
          height={190}
          alt="card"
        />
        <h5 className="my-2">
          {product?.name?.length > 35
            ? product?.name.slice(0, 35) + "..."
            : product?.name}
        </h5>
        <span
          style={{ borderRadius: "10px 0 10px 0" }}
          className={`${
            product?.stock < 1 ? "bg-orange-500" : "bg-green-500"
          }  px-2 py-0.5  text-[0.6rem] absolute top-2 left-2 capitalize`}
        >
          stock {product?.stock < 1 ? "out" : product?.stock}
        </span>
      </Link>
      <div className="space-y-2">
        <Rating rating={product?.rating} />
        <p>${product?.price}</p>
        <Button
          className="bg-orange-500 w-full card-btn overflow-hidden inline-block "
          onClick={(e) => handleAddToCard(e, product)}
        >
          <p className="card-btn-text">ADD TO CARD</p>

          <LuShoppingCart className="card-btn-icon " />
        </Button>
        <Button className="bg-primary/90 w-full hidden ">
          <LiaSpinnerSolid className="animate-spin text-xl text-center w-full" />
        </Button>
      </div>
    </div>
  );
}
