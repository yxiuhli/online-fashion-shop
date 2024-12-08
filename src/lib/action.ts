"use server";

import { members } from "@wix/members";
import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const id = formData.get('id') as string;
  const username = formData.get('username') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const address = formData.get('address') as string;
  const avatar = formData.get('avatar') as string;

  try {
    const response = await wixClient.members.updateMember(id, {
      profile: {
        nickname: username || undefined,
        photo: avatar ? { url: avatar } : undefined,
      },
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        addresses: [
          {
            city: address || undefined,
          },
        ],
      },
    });
    console.log('Member updated successfully:', response);
  } catch (error) {
    console.log("Error updating member:", error);
  }
};

export const checkFavorite = async (productId: string) => {
  const wixClient = await wixClientServer();
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });
  const res = await wixClient.items
    .queryDataItems({
      dataCollectionId: "Wishlist",
    })
    .eq("productId", productId)
    .eq("customerId", user.member?._id!)
    .find();

  if (res.items[0]) {
    return true;
  } else {
    return false;
  }
};

export const setFavorite = async (productId: string) => {
  const wixClient = await wixClientServer();
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });
  const res = await wixClient.items
    .queryDataItems({
      dataCollectionId: "Wishlist",
    })
    .eq("productId", productId)
    .eq("customerId", user.member?._id!)
    .find();

  if (res.items[0]) {
    await wixClient.items.removeDataItem(res.items[0]._id!, {
      dataCollectionId: "Wishlist",
    });
  } else {
    await wixClient.items.insertDataItem({
      dataCollectionId: "Wishlist",
      dataItem: {
        data: {
          productId: productId,
          customerId: user.member?._id!,
        },
      },
    });
  }
};
