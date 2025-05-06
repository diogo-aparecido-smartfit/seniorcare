import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export const AppFooter = () => {
  return (
    <footer className="flex flex-col items-center gap-6 py-10">
      <button className="cursor-pointer">
        <p className="flex items-center">
          Senior<strong className="text-blue-600">Care</strong>
        </p>
      </button>
      <ul className="flex flex-row items-center gap-4">
        <li className="text-gray-500 font-medium text-xs hover:text-gray-400 transition-all">
          <Link href="">Contato</Link>
        </li>
        <li className="text-gray-500 font-medium text-xs hover:text-gray-400 transition-all">
          <Link href="">Copyright</Link>
        </li>
        <li className="text-gray-500 font-medium text-xs hover:text-gray-400 transition-all">
          <Link href="">Privacidade</Link>
        </li>
        <li className="text-gray-500 font-medium text-xs hover:text-gray-400 transition-all">
          <Link href="">Termos</Link>
        </li>
      </ul>
      <ul className="flex flex-row items-center gap-4">
        <li className="text-gray-500 font-medium  hover:text-gray-400 transition-all">
          <FaFacebook />
        </li>
        <li className="text-gray-500 font-medium  hover:text-gray-400 transition-all">
          <FaInstagram />
        </li>
        <li className="text-gray-500 font-medium  hover:text-gray-400 transition-all">
          <FaThreads />
        </li>
      </ul>
      <p className="text-gray-500 font-normal text-xs transition-all">
        © 2025 SeniorCare, Inc.
      </p>
    </footer>
  );
};
