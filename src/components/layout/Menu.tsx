"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-slate-400 text-white left-0 top-28 w-full h-[calc(80vh)] flex flex-col items-center justify-center gap-8 text-xl  z-30">
          <Link className="hover:text-blue-700" href="/">
            Homepage
          </Link>
          <Link className="hover:text-blue-700" href="/list?cat=all-products">
            Products
          </Link>
          <Link className="hover:text-blue-700" href="/list?cat=shirts">
            Shirts
          </Link>

          <Link className="hover:text-blue-700" href="/list?cat=pants">
            Pants
          </Link>
   

          <Link className="hover:text-blue-700" href="/about">
            About
          </Link>
          
          <div>
            <SearchBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
