import { getCartItems } from "@/action/cartAction";
import { getCategories } from "@/action/categoies";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import BottonNavbar from "./BottonNavbar";
import TopNavbar from "./TopNavbar";

export default async function Headers() {
  const { data: categories } = await getCategories();
  const session = await getServerSession(authOptions);
  const carts = await getCartItems(
    session?.user.id as string,
    session?.user.token as string
  );
  return (
    <header>
      <TopNavbar cartItems={carts?.data} />
      <BottonNavbar categories={categories} />
    </header>
  );
}
