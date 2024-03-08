"use client";
import { deleteCartAction, updateCartAction } from "@/action/cartAction";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUtility } from "@/context/UtilityProvider";
import { cartItemType } from "@/types/cart";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  MouseEvent,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "./ui/button";
type buttonType = MouseEvent<HTMLButtonElement>;

export default function SideBarCartItem({
  children,
  cartItems,
}: {
  children: JSX.Element;
  cartItems: cartItemType[];
}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const { data, status } = useSession();
  const [cartItemsOpt, addCardItemsOpt] = useOptimistic(cartItems);
  const [isPending, startTransition] = useTransition();
  const { sideCartRef } = useUtility();

  useEffect(() => {
    const totalCalAmount = cartItemsOpt?.reduce((prev, curr, index) => {
      const totalAmount = prev + Number(curr.subTotal) * Number(curr.quantity);
      return totalAmount;
    }, 0);
    setTotalAmount(totalCalAmount);
  }, [cartItemsOpt]);

  const spinerLoader = (e: buttonType, isShow: boolean) => {
    const deleteEle = e.currentTarget?.children[0];
    const spinerEle = e.currentTarget?.children[1];
    if (isShow) {
      deleteEle?.classList.add("hidden");
      spinerEle?.classList.remove("hidden");
    } else {
      deleteEle?.classList.remove("hidden");
      spinerEle?.classList.add("hidden");
    }
  };
  const handleDeleteCart = async (e: buttonType, id: string) => {
    spinerLoader(e, true);
    await deleteCartAction(id, data?.user.token as string);
    spinerLoader(e, false);
  };
  const filterAndUpdate = (id: string, quantity: number) => {
    const updateQuantity = cartItemsOpt.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    startTransition(() => {
      addCardItemsOpt(updateQuantity);
    });
  };
  const quantityHandler = async (
    item: { _id: string; quantity: number },
    type: string
  ) => {
    try {
      const quantity =
        type === "increament" ? item.quantity + 1 : item.quantity - 1;

      filterAndUpdate(item._id, quantity);
      const res = await updateCartAction(
        { ...item, quantity },
        data?.user.token as string
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger ref={sideCartRef}>{children}</SheetTrigger>
        <SheetContent side="right-custom">
          <SheetHeader>
            <SheetTitle>Your Cart Items</SheetTitle>
            <SheetDescription className="relative">
              <ScrollArea className="h-[25rem] w-full rounded-md border p-4">
                {cartItemsOpt?.length > 0 ? (
                  cartItemsOpt.map((item) => (
                    <div key={item._id} className="flex border-b py-4">
                      <Image
                        src={item.product.cover || ""}
                        alt="cart"
                        width={100}
                        height={100}
                      />
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between">
                          <p>{item.product.name}</p>
                          <h5 className="text-orange-500">${item.subTotal}</h5>
                        </div>
                        <div className="flex justify-between">
                          <div className="border border-white">
                            <Button
                              size="sm"
                              variant="orange"
                              onClick={() =>
                                quantityHandler(
                                  { _id: item._id, quantity: item.quantity },
                                  "decreament"
                                )
                              }
                            >
                              -
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-text"
                            >
                              {item.quantity}
                            </Button>
                            <Button
                              onClick={() =>
                                quantityHandler(
                                  { _id: item._id, quantity: item.quantity },
                                  "increament"
                                )
                              }
                              size="sm"
                              variant="orange"
                            >
                              +
                            </Button>
                          </div>
                          <button
                            onClick={(e: buttonType) =>
                              handleDeleteCart(e, item._id)
                            }
                          >
                            <RiDeleteBinLine className=" text-lg hover:text-red-500" />
                            <LiaSpinnerSolid className="text-lg text-red-500 animate-spin hidden" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xl capitalize">
                    empty cart!
                  </h1>
                )}
              </ScrollArea>
              <div>
                <div className="flex justify-between mt-2 mx-4">
                  <div className="font-medium text-gray-900">
                    Subtotal-{cartItems?.length} items
                  </div>
                  <h5 className="text-orange-500">${totalAmount}</h5>
                </div>
                <Button variant="orange" className="w-full py-6 mt-4">
                  Proceed
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
