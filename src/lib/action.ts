'use server';

import { members } from '@wix/members';
import { wixClientServer } from './wixClientServer';

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const id = formData.get('id') as string;
  const username = formData.get('username') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const address = formData.get('address') as string;

  try {
    const response = await wixClient.members.updateMember(id, {
      profile: {
        nickname: username || undefined,
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
  } catch (error) {
    console.log('Error updating member:', error);
  }
};
