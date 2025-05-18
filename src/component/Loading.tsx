import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-50 ">
      <div className="flex items-center justify-center w-full h-full bg-[#1B262C]">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    </div>
  );
}
