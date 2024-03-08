import { getCategories } from "@/action/categoies";
import MobileCategoryLink from "@/components/MobileCategoryLink";
import { CategoryType } from "@/types/categories";
import { IconType } from "react-icons";
import { BiCategoryAlt } from "react-icons/bi";
import {
  FaComputer,
  FaMobileRetro,
  FaNotEqual,
  FaShopify,
} from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";

const icons: {
  [key: string]: IconType;
} = {
  clothes: GiClothes,
  fashion: FaShopify,
  "mobile-tablets": FaMobileRetro,
  "computer-accessoriess": FaComputer,
  other: FaNotEqual,
};

export default async function MobileCategory() {
  const { data: categories } = await getCategories();
  return (
    <div className="md:hidden">
      <div className="container flex border-t border-b py-3 gap-x-1">
        <BiCategoryAlt className="text-2xl" />
        <span>Categories</span>
      </div>

      <div className="container grid grid-cols-4 gap-4 justify-items-center py-6">
        {categories.map((category: CategoryType) => (
          <MobileCategoryLink
            key={category._id}
            icon={icons[category.slug] ? icons[category.slug] : icons.other}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}
