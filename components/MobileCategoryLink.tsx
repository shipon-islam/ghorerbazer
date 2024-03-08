import { CategoryType } from "@/types/categories";
import Link from "next/link";
import { IconType } from "react-icons";
interface CategoryLinkType {
  icon: IconType;
  category: CategoryType;
}
export default function MobileCategoryLink({
  category,
  icon,
}: CategoryLinkType) {
  const Icon = icon;
  return (
    <Link
      className="w-fit inline-block"
      href={`/products?category=${category?.slug}`}
    >
      <div className="border border-orange-400 rounded-full w-fit inline-block p-2">
        <Icon className="text-5xl" />
      </div>
      <h5 className="capitalize font-medium text-sm text-center">
        {category?.name}
      </h5>
    </Link>
  );
}
