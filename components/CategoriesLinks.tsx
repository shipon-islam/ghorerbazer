"use client";
import { CategoryType } from "@/types/categories";
import Link from "next/link";
import React, { useRef } from "react";
// import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function CategoriesLinks({
  categories,
}: {
  categories: CategoryType[];
}) {
  const ulRef = useRef<HTMLUListElement>(null);
  const closeAllLi = () => {
    if (!ulRef.current) return;
    //loop all list
    [...ulRef.current.childNodes].forEach((node) => {
      const lastChildElement = node.lastChild as HTMLElement | null;
      const firstChildElement = node.firstChild as HTMLElement | null;
      if (!lastChildElement || !firstChildElement) return;
      //hide all dropdown list
      lastChildElement.classList.add("hidden");
      const arrowButton = firstChildElement.lastChild as HTMLElement | null;
      //default arrow button of icon
      const firstChildOfArrowButton = arrowButton?.firstChild as HTMLElement;
      firstChildOfArrowButton.classList.remove("hidden");
      const lastChildOfArrowButton = arrowButton?.lastChild as HTMLElement;
      lastChildOfArrowButton.classList.add("hidden");
    });
  };

  const openDropDown = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const downArrow = currentTarget.children[0];
    const upArrow = currentTarget.children[1];
    const parentList = currentTarget.parentElement?.parentElement;
    const dropdownList = parentList?.lastChild as HTMLElement | undefined;

    if (dropdownList?.classList.contains("hidden")) {
      closeAllLi();
      downArrow.classList.add("hidden");
      upArrow.classList.remove("hidden");
      dropdownList?.classList.remove("hidden");
    } else {
      downArrow.classList.remove("hidden");
      upArrow.classList.add("hidden");
      dropdownList?.classList.add("hidden");
    }
  };
  return (
    <ul ref={ulRef} className="space-y-5 text-gray-500 dark:text-gray-400">
      {categories?.map((category) => (
        <li key={category._id}>
          <div className="flex items-center gap-2">
            <Link
              className="capitalize hover:text-gray-600 hover:dark:text-gray-300"
              href={`/products?category=${category?.slug}`}
            >
              {category.name}
            </Link>
            <button onClick={openDropDown}>
              <IoIosArrowDown className="text-gray-700 dark:text-gray-400" />
              <IoIosArrowUp className="text-gray-700 dark:text-gray-400 hidden" />
            </button>
          </div>
          <ul className="ml-4 mt-2 space-y-2 border-l border-orange-400 pl-1 text-sm hidden text-gray-500 dark:text-gray-400">
            {category.subcategory?.map((scategory) => (
              <li key={scategory._id}>
                <Link
                  className="capitalize hover:text-gray-600 hover:dark:text-gray-300"
                  href={`/products?subcategory=${scategory?.slug}`}
                >
                  {scategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
