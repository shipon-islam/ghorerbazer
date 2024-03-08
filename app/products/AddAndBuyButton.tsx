"use client";
import { addCartAction } from "@/action/cartAction";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
type buttonType = MouseEvent<HTMLButtonElement>;
export default function AddAndBuyButton({ product }: { product: TProduct }) {
  const { status, data } = useSession();
  const router = useRouter();
  const handleAddToCard = async (
    { currentTarget }: buttonType,
    productObj: TProduct
  ) => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
    const buttonTextEle = currentTarget.children[0];
    const spinerEle = currentTarget.children[1];
    const cardData = {
      user: data?.user.id as string,
      product: product._id,
      subTotal: productObj.price,
      quantity: 1,
      totalAmount: productObj.price,
    };

    try {
      buttonTextEle?.classList.add("hidden");
      spinerEle?.classList.remove("hidden");
      await addCartAction(cardData, data?.user.token as string);
      buttonTextEle?.classList.remove("hidden");
      spinerEle?.classList.add("hidden");
    } catch (error) {
      buttonTextEle?.classList.remove("hidden");
      spinerEle?.classList.add("hidden");
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-y-8 pt-10">
      <Button
        className="uppercase font-bold border-orange-500 text-orange-500"
        variant="outline"
        onClick={(e) => handleAddToCard(e, product)}
      >
        <span>add to cart</span>
        <LiaSpinnerSolid className="animate-spin text-xl text-center w-full hidden" />
      </Button>
      <Button className="uppercase font-bold" variant="orange">
        buy now
      </Button>
    </div>
  );
}
