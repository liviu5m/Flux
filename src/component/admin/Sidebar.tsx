import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <ul className="flex flex-col gap-5">
      <Link className="w-full h-full" href={"/admin/dashboard/category"}>
        <li className="px-5 py-3 rounded-lg bg-[#3282B8] text-[#F9F7F7] text-center cursor-pointer">
          Category
        </li>
      </Link>
      <Link className="w-full h-full" href={"/admin/dashboard/property_group"}>
        <li className="px-5 py-3 rounded-lg bg-[#3282B8] text-[#F9F7F7] text-center cursor-pointer">
          Property Group
        </li>
      </Link>
      <Link className="w-full h-full" href={"/admin/dashboard/product"}>
        <li className="px-5 py-3 rounded-lg bg-[#3282B8] text-[#F9F7F7] text-center cursor-pointer">
          Product
        </li>
      </Link>
    </ul>
  );
}
