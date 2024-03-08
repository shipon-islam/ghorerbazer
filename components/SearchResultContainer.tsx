import { TProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

export default function SearchResultContainer({
  products,
  handleClose,
}: {
  products: TProduct[];
  handleClose: () => void;
}) {
  return (
    <ScrollArea className="h-[25rem] 1 rounded-md border p-4 bg-background">
      <div className="grid md:grid-cols-2">
        {products?.length > 0 &&
          products.map((product) => (
            <Link
              onClick={handleClose}
              key={product._id}
              className="flex gap-x-2 border p-2 relative"
              href={`/products/${product._id}`}
            >
              <Image
                className="rounded-sm"
                src={product.cover}
                width={65}
                height={65}
                alt="card"
              />
              <div>
                <h5 className="my-2">
                  {product?.name?.length > 40
                    ? product?.name.slice(0, 40) + "..."
                    : product?.name}
                </h5>
                <span
                  style={{ borderRadius: "10px 0 10px 0" }}
                  className={`${
                    product?.stock < 1 ? "bg-orange-500" : "bg-green-500"
                  } px-2 py-0.5 text-[0.4rem] absolute top-2 left-2 capitalize`}
                >
                  stock {product?.stock < 1 ? "out" : product?.stock}
                </span>
                <p className="text-orange-500">${product.price}</p>
              </div>
            </Link>
          ))}
      </div>
    </ScrollArea>
  );
}
