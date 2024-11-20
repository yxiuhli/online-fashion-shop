import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { files, folders } from "@wix/media";
import { site } from "@wix/urls";

export const wixClientAdmin = async () => {
  const wixClient = createClient({
    auth: ApiKeyStrategy({
      apiKey: process.env.NEXT_PUBLIC_WIX_API_KEY!,
      siteId: process.env.NEXT_PUBLIC_WIX_SITE_ID!,
    }),
    modules: {
      site,
      files,
      folders,
    },
  });
  return wixClient;
};
