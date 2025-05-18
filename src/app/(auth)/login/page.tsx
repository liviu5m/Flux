"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function SignIn() {
  const credentialsAction = (formData: FormData) => {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if(!credentials?.email || !credentials?.password) {
      toast("Invalid credentials");
      return;
    }

    try {
      const res = signIn("credentials", {
        ...credentials,
        redirectTo: "/",
      });
      console.log(res);
    } catch (err) {
      toast("Something went wrong.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="absolute top-5 left-5 text-white">
        <Link href={"/"} className="flex items-center justify-center gap-5">
          <FontAwesomeIcon className="w-5" icon={faArrowLeft} />{" "}
          <span>Back</span>
        </Link>
      </div>
      <div className="w-[400px] rounded-lg bg-[#F9F7F7] p-5">
        <h1 className="text-xl text-center">Sign in</h1>

        <form
          action={credentialsAction}
          className="flex items-center justify-center flex-col gap-5 mt-7"
        >
          <input
            type="email"
            className="w-full rounded-lg px-5 py-3 outline-none border-0 bg-[#3F72AF] text-[#DBE2EF] placeholder:text-[#DBE2EF]"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="w-full rounded-lg px-5 py-3 outline-none border-0 bg-[#3F72AF] text-[#DBE2EF] placeholder:text-[#DBE2EF]"
            placeholder="Password"
            name="password"
          />
          <button className="text-[#3F72AF] bg-[#112D4E] hover:shadow-md shadow-[#3F72AF] border border-[#3F72AF] w-full rounded-lg px-5 py-3 cursor-pointer">
            Submit
          </button>
        </form>
        <div className="my-8">
          <div className="relative">
            <div className="h-px bg-[#3F72AF] w-full absolute top-1/2" />
            <p className="absolute -translate-y-1/2 left-1/2 bg-[#F9F7F7] px-2 h-fit py-1">
              or
            </p>
          </div>
        </div>
        <button
          type="submit"
          onClick={() => signIn("google", { redirectTo: "/" })}
          className="text-black mt-14 bg-[#F9F7F7] border border-black hover:bg-black hover:text-white w-full rounded-lg px-5 py-3 cursor-pointer flex items-center justify-center gap-5"
        >
          <FontAwesomeIcon className="w-5" icon={faGoogle} />
          <span>Google</span>
        </button>
        <p className="mt-5 mb-3 text-center">
          Don't have an account{" "}
          <Link href={"/signup"} className="text-[#3F72AF]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
