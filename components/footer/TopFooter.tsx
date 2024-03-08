import Link from "next/link";

export default function TopFooter() {
  return (
    <div className="container padding grid grid-cols-2 md:grid-cols-3 gap-y-12">
      <div>
        <h5 className="uppercase font-medium mb-5">quick help</h5>
        <ul className="space-y-4 capitalize text-sm">
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              customer support
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              F.A.Q
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              contact us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="uppercase font-medium mb-5">company</h5>
        <ul className="space-y-4 capitalize text-sm">
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              about us
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              privacy policy
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              refund & return policy
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="uppercase font-medium mb-5">menu</h5>
        <ul className="space-y-4 capitalize text-sm">
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              technology
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition-colors duration-300"
              href="/"
            >
              clothes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
