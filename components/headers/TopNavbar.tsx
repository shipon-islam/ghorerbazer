"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { baseUrl } from "@/lib/config";
import logo from "@/public/Logo.webp";
import bdflag from "@/public/bangladesh-flag-icon.png";
import { cartItemType } from "@/types/cart";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { LiaSpinnerSolid } from "react-icons/lia";
import { LuShoppingCart } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import SearchResultContainer from "../SearchResultContainer";
import SideBarCartItem from "../SidebarCartItem";
import ThemeButton from "../ThemeButton";
import { Input } from "../ui/input";

export default function TopNavbar({
  cartItems,
}: {
  cartItems: cartItemType[];
}) {
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchProducts, setSearchProducts] = useState([]);
  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);

  //fetch search query function
  const fetchData = async (searchTerm: string) => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      const res = await fetch(baseUrl + `/api/products?search=${searchTerm}`);
      if (!res.ok) {
        throw new Error("something went wrong!");
      }
      const data = await res.json();
      setLoading(false);
      setSearchProducts(data.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  //debounce function with useEffect
  useEffect(() => {
    const clear = setTimeout(() => {
      fetchData(searchValue);
    }, 500);
    return () => {
      clearTimeout(clear);
    };
  }, [searchValue]);

  useEffect(() => {
    if (searchRef.current && searchRef) {
      searchRef?.current?.focus();
    }
  }, [searchToggle]);

  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-[1fr_4fr_1.5fr] xl:grid-cols-[1fr_4fr_1fr] gap-x-8 justify-between items-center container 
    py-3 padding"
      >
        <div>
          <Image src={logo} alt="logo" className="w-[9.2rem] h-auto" />
        </div>
        <div className="relative hidden md:block">
          <Input
            placeholder="Search for Products (i.e. Mobile, Shirt, Jeans...)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full border-2 border-gray-300 focus-visible:ring-0 focus-visible:offset-ring-0 focus-visible:outline-none  focus-visible:ring-offset-0 h-[2.9rem]"
            type="text"
          />
          <button className="absolute right-4 top-1/2 translate-y-[-50%]">
            {loading ? (
              <LiaSpinnerSolid className="text-2xl text-gray-500  animate-spin duration-1000" />
            ) : (
              <IoSearchOutline className="text-2xl text-gray-500 hover:text-gray-400 transition-colors duration-300" />
            )}
          </button>

          <div
            className={`absolute z-50 ${
              searchProducts.length > 0 && searchValue ? "block" : "hidden"
            }`}
          >
            <SearchResultContainer
              handleClose={() => {
                setSearchProducts([]);
                setSearchValue("");
              }}
              products={searchProducts}
            />
          </div>
        </div>
        <div className="hidden md:flex justify-between gap-x-2 ">
          <button className="flex gap-x-1 items-center">
            <Image src={bdflag} alt="flag" className="w-[1.5rem] h-fit" />
            <span className="text-sm">বাংলা</span>
          </button>
          <SideBarCartItem cartItems={cartItems}>
            <div className="flex items-center">
              <LuShoppingCart className="text-[1.4rem] rotate-[-4deg]" />
              <span>({cartItems?.length})</span>
            </div>
          </SideBarCartItem>
          {status === "unauthenticated" ? (
            <Link href="/signup">
              <FaRegCircleUser className="text-xl text-orange-400" />
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {status === "authenticated" ? (
                  <Image
                    src={data.user?.image || ""}
                    className="rounded-full border"
                    alt="user"
                    width={30}
                    height={30}
                  />
                ) : (
                  <FaRegCircleUser className="text-xl text-orange-400" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Orders
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="justify-self-end flex items-center gap-x-4 md:hidden ">
          <button
            onClick={() => {
              setSearchToggle((prev) => !prev);
              setSearchProducts([]);
              setSearchValue("");
            }}
          >
            {searchToggle ? (
              <VscClose className="text-4xl text-gray-700" />
            ) : (
              <IoSearchOutline className="text-3xl text-gray-500 hover:text-gray-400 transition-colors duration-300" />
            )}
          </button>
          <ThemeButton />
        </div>
      </div>
      {/* mobile version */}
      <div
        className={`${
          searchToggle ? "block" : "hidden"
        } md:hidden relative container `}
      >
        <Input
          ref={searchRef}
          placeholder="Search for Products (i.e. Mobile, Shirt, Jeans...)"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="block w-full border-2 border-gray-300 focus-visible:ring-0 focus-visible:offset-ring-0 focus-visible:outline-none  focus-visible:ring-offset-0 h-[2.9rem]"
          type="text"
        />
        <button className="absolute right-6 top-1/2 translate-y-[-50%] bg-white dark:bg-background ">
          {loading ? (
            <LiaSpinnerSolid className="text-2xl text-gray-500  animate-spin duration-1000" />
          ) : (
            <IoSearchOutline className="text-2xl text-gray-500 hover:text-gray-400 transition-colors duration-300" />
          )}
        </button>
        <div
          className={`absolute z-50 max-w-full right-0 w-full padding container ${
            searchProducts.length > 0 && searchValue ? "block" : "hidden"
          }`}
        >
          <SearchResultContainer
            handleClose={() => {
              setSearchProducts([]);
              setSearchValue("");
              setSearchToggle(false);
            }}
            products={searchProducts}
          />
        </div>
      </div>
    </>
  );
}
