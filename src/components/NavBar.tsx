"use client";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { title } from "process";

// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const NavBar = () => {
  const pathName = usePathname();
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "Deals",
      path: "/deals",
    },
    {
      title: "About",
      path: "/about",
    },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="h-20 sm:h-30 py-12 relative font-[Helvetica]">
        {/* MOBILE */}
        <div className="h-full flex items-center justify-between gap-16 sm:hidden">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={24} height={24} />
            <div className="text-3xl tracking-wide font-bold font-[Garamond]">
              BRAND
            </div>
          </Link>
          <Menu />
        </div>
        {/* BIGGER SCREENS */}
        <div className="hidden sm:flex flex-col justify-center gap-8 h-full">
          {/* LEFT */}
          <div className="flex items-center justify-between gap-12">
            <Link href="/loginpage" className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={24} height={24} />
              <div className="text-3xl tracking-wide font-bold font-[Garamond]">
                BRAND
              </div>
            </Link>
            <SearchBar />
            <NavIcons />
          </div>
          {/* RIGHT */}
        </div>
      </div>
      <div className="hidden sm:flex pb-4 items-center justify-start sm:gap-4 md:gap-6 lg:gap-8">
        {links.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={`px-2 rounded-2xl text-center text-[#331e12] ${
              pathName === item.path && "underline underline-offset-8 text-red-600"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default NavBar;
