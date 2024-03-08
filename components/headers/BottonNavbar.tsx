"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CategoryType } from "@/types/categories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPhoneCall } from "react-icons/fi";
import { TbHelpTriangle } from "react-icons/tb";
import CategoriesLinks from "../CategoriesLinks";

export default function BottonNavbar({
  categories,
}: {
  categories: CategoryType[];
}) {
  const path = usePathname();
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 hidden md:block">
      <div className="container padding flex justify-between">
        <div className="space-x-8 text-sm ">
          <div className="nav-link before:w-[2px] before:h-full before:bg-gray-200 before:absolute  before:top-0 before:-right-4 cursor-pointer">
            <HoverCard>
              <HoverCardTrigger>All Categoris</HoverCardTrigger>
              <HoverCardContent
                className={path === "/products" ? " hidden" : "ml-10"}
              >
                <CategoriesLinks categories={categories} />
              </HoverCardContent>
            </HoverCard>
          </div>
          <Link className="nav-link" href={`/`}>
            Home
          </Link>
          {categories &&
            categories.slice(0, 3).map((category) => (
              <Link
                key={category._id}
                className="nav-link"
                href={`/products?category=${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
        </div>
        <div className="flex gap-x-16">
          <Link
            href="/"
            className="lg:flex items-center gap-1 text-gray-700 dark:text-foreground hidden "
          >
            <TbHelpTriangle className="text-xl" />
            <span className="capitalize text-sm">help center</span>
          </Link>
          <a href="tel:09642922922" className="flex items-center gap-1">
            <FiPhoneCall className="text-xl" />
            <span className="font-medium"> 09642 922 922</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
