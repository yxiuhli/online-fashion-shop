"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";
import WebNotifModalItem from "./WebNotifItem";
import { useState } from "react";

const WebNotifModal = ({notifs,setNotifs,unreadCounter}) => {
  // TEMPORARY
  // const cartItems = true;

  // begin dummy data
  const toggleReadStatus = (id:string) => {
    setNotifs((prevNotifs) =>
      prevNotifs.map((notif) =>
        notif.id === id ? { ...notif, readStatus: true } : notif
      )
    );
  };
// end dummy data

  const router = useRouter()

  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
          
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold mb-2">
              <span className="">Notifications</span>
        </div>
        <div className="border-t border-b border-gray-400 divide-y divide-gray-400">
          {notifs.map((notif,index) => (
          <WebNotifModalItem key={index} notif={notif} toggleReadStatus={toggleReadStatus} />
        ))}
        </div>
        <div>
          <p className="text-center text-sm mt-2 mb-4">
              You have {unreadCounter} unread message(s).
            </p>
        </div>
            
          </div>
    </div>
  );
};

export default WebNotifModal;