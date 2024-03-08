import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
export default function BottomFooter() {
  return (
    <div className="container padding flex flex-col-reverse md:flex-row gap-y-5 justify-between items-center border-t py-6 mt-10">
      <div>
        <h4>GhorerBazar © 2023. All rights reserved.</h4>
      </div>
      <div className="flex gap-x-5">
        <a className="bg-gray-700 p-2 rounded-full" href="">
          <FaFacebook className="text-xl hover:text-orange-400 transition-colors duration-300" />
        </a>
        <a className="bg-gray-700 p-2 rounded-full" href="">
          <FaInstagram className="text-xl hover:text-orange-400 transition-colors duration-300" />
        </a>
        <a className="bg-gray-700 p-2 rounded-full" href="">
          <FaWhatsapp className="text-xl hover:text-orange-400 transition-colors duration-300" />
        </a>
      </div>
    </div>
  );
}
