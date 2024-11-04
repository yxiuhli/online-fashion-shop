'use server';

import { members } from '@wix/members';
import { wixClientServer } from './wixClientServer';
import { files } from '@wix/media';

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

export const getUploadUrl = async (): Promise<string | null> => {
  try {
    const mimeType = 'image/png';
    const options = {};
    console.log('Uploading');

    const response = await files.generateFileUploadUrl(mimeType, options);
    console.log(response);
    return response.uploadUrl;
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return null;
  }
};
