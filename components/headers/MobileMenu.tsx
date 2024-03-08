import { getCartItems } from "@/action/cartAction";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { LuShoppingCart } from "react-icons/lu";
import { PiUserListBold } from "react-icons/pi";
import SideBarCartItem from "../SidebarCartItem";

export default async function MobileMenu() {
  const session = await getServerSession(authOptions);
  const carts = await getCartItems(
    session?.user.id as string,
    session?.user.token as string
  );
  return (
    <section className="md:hidden bg-background dark:bg-secondary border-t py-5 fixed w-full bottom-0 left-0 z-50 container flex justify-between  text-sm font-semibold  text-center">
      <Link href="/">
        <LiaHomeSolid className="text-2xl mx-auto" />
        <span>Home</span>
      </Link>
      <Link href="/categories">
        <BiCategoryAlt className="text-2xl mx-auto" />
        <span>Categories</span>
      </Link>
      <SideBarCartItem cartItems={carts?.data}>
        <div className="relative">
          <small className="bg-orange-500 px-1 text-0.5 rounded-full absolute z-10 h-fit -top-1 -right-1">
            {carts?.data?.length || 0}
          </small>
          <LuShoppingCart className="text-2xl mx-auto rotate-[-4deg]" />
          <span>Cart</span>
        </div>
      </SideBarCartItem>
      <Link href="/">
        <PiUserListBold className="text-2xl mx-auto" />
        <span>My account</span>
      </Link>
    </section>
  );
}
