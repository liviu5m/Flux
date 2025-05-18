import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <ul>
      <Link className="w-full h-full" href={"/admin/dashboard/category"}>
        <li className="px-5 py-3 rounded-lg bg-[#3282B8] text-[#F9F7F7] text-center cursor-pointer">
          Category
        </li>
      </Link>
    </ul>
  );
}
