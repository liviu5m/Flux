import { ReactNode } from "react";
import Sidebar from "@/component/admin/Sidebar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import "../../../globals.css";
import "react-toastify/dist/ReactToastify.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex items-start justify-center w-full h-screen py-10">
      <div className="absolute top-5 left-5 text-white">
        <Link href={"/"} className="flex items-center justify-center gap-5">
          <FontAwesomeIcon className="w-5" icon={faArrowLeft} />{" "}
          <span>Back</span>
        </Link>
      </div>
      <div className="container flex items-start justify-center gap-16 h-full ">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 h-full">{children}</div>
      </div>
    </div>
  );
}
