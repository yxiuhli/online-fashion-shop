'use server';

import { wixClientServer } from './wixClientServer';

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
    console.log('Error updating member:', error);
  }
};
