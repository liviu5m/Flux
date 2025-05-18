"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const { data } = useSession();
  const pathname = usePathname();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (data?.user)
      axios
        .get("/api/user", {
          params: {
            email: data?.user?.email,
          },
        })
        .then((res) => {
          setUserType(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [data]);

  return (
    <header className="flex items-center justify-between py-5 text-[#F9F7F7]">
      <div>
        <Link
          href="/"
          className="text-3xl font-bold text-[#F9F7F7] tracking-wider"
        >
          Flux
        </Link>
      </div>
      <div>
        <ul className="flex items-center justify-center gap-12">
          <li
            className={`hover:text-[#3282B8] ${
              pathname == "/" ? "text-[#3282B8]" : ""
            }`}
          >
            <Link href={"/"}>Home</Link>
          </li>
          <li
            className={`hover:text-[#3282B8] ${
              pathname == "/products" ? "text-[#3282B8]" : ""
            }`}
          >
            <Link href={"/products"}>Products</Link>
          </li>
          <li
            className={`hover:text-[#3282B8] ${
              pathname == "/about" ? "text-[#3282B8]" : ""
            }`}
          >
            <Link href={"/about"}>About us</Link>
          </li>
          <li
            className={`hover:text-[#3282B8] ${
              pathname == "/contact" ? "text-[#3282B8]" : ""
            }`}
          >
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
      {data?.user ? (
        <div className="flex items-center justify-center gap-5">
          {userType != "user" && (
            <Link
              href={"/admin/dashboard"}
              className="px-5 py-3 rounded-lg bg-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#3F72AF]"
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            href={"/account"}
            className="px-5 py-3 rounded-lg bg-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#3F72AF]"
          >
            {data.user.name}
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-5">
          <Link
            href={"/login"}
            className="px-5 py-3 rounded-lg bg-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#3F72AF]"
          >
            Log In
          </Link>
          <Link
            href={"/signup"}
            className="px-5 py-3 rounded-lg bg-[#3F72AF] hover:bg-[#DBE2EF] hover:text-[#3F72AF]"
          >
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}
