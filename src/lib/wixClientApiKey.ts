import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { files, folders } from "@wix/media";

export const wixClientApiKey = createClient({
  auth: ApiKeyStrategy({
    apiKey: process.env.NEXT_PUBLIC_WIX_API_KEY!,
    accountId: process.env.NEXT_PUBLIC_WIX_ACCOUNT_ID!,
  }),
  modules: {
    files,
    folders,
  },
});
