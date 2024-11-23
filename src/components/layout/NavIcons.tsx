"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import CartModal from "../cart/CartModal";
import WebNotifModal from "../webNotif/WebNotifModal";


const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
// begin dummy data
  const [notifs,setNotifs] = useState([
    {
      readStatus:false,
      message: "Your order #983894 has been approved.",
      orderStatus: "approved",
      id:"983894_approved"
    },
    {
      readStatus: true,
      message: "Your order #983894 is pending.",
      orderStatus: "pending",
      id:"983894_pending"
    }
  ])

  const unreadCounter = notifs.filter(item=>!item.readStatus).length;
// end dummy data

  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  // TEMPORARY
  // const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  // AUTH WITH WIX-MANAGED AUTH

  // const wixClient = useWixClient();

  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );

  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-2 sm:gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsNotifOpen((prev) => !prev)}
      >
        <Image src="/notification.png" alt="Notification" width={22} height={22} className="cursor-pointer" />
        {(unreadCounter>0)&&<div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full text-white text-xs flex items-center justify-center">
          {unreadCounter}
        </div>}
      </div>
      {isNotifOpen && <WebNotifModal notifs={notifs} setNotifs={ setNotifs} unreadCounter={unreadCounter} /> }
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full text-white text-xs flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
