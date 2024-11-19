import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
import Cookies from "js-cookie";
import { members } from "@wix/members";
import { files, folders } from "@wix/media";
import { items } from "@wix/data";

export const wixClientServer = async () => {
  const refreshToken = Cookies.get("refreshToken");

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
      files,
      folders,
      items
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken: refreshToken ? JSON.parse(refreshToken) : undefined,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
