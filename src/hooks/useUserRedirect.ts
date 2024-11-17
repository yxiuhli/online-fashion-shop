"use client";
import { useEffect } from "react";
import { useWixClient } from "./useWixClient";
import { useRouter } from "next/navigation";

export const useUserRedirect = () => {
    const wixClient = useWixClient();
    const router = useRouter();

    useEffect(() => {
        if (!wixClient.auth.loggedIn()) 
            router.push("/login");
    }, [wixClient, router]);
};