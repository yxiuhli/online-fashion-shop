'use client';

import { useState } from 'react';
import UpdateButton from '@/components/UpdateButton';
import { updateUser } from '@/lib/action';
import Image from 'next/image';
import { files } from '@wix/media';

interface UserData {
  contactId?: string | null;
  profile?: {
    nickname?: string | null;
    photo?: {
      url?: string | null;
    };
  };
  contact?: {
    firstName?: string | null;
    lastName?: string | null;
    addresses?: { city?: string | null }[] | null;
  };
  loginEmail?: string | null;
}

interface ProfileFormProps {
  userData: UserData;
}

const getUploadUrl = async (): Promise<string | null> => {
  try {
    const mimeType = 'image/png';
    const options = {
      fileName: 'myFile.png',
    };
    console.log('Uploading');

    try {
      const response = await files.generateFileUploadUrl(mimeType, options);
      console.log('Response:', response);

      if (response && response.uploadUrl) {
        return response.uploadUrl;
      } else {
        console.error('No upload URL returned in response.');
        console.error('Response details:', response);
        return null;
      }
    } catch (error) {
      console.error('Error generating upload URL:', error);
      return null;
    }
  } catch (error) {
    console.error('Error generating upload URL:', JSON.stringify(error, null, 2));
    return null;
  }
};

const ProfileForm: React.FC<ProfileFormProps> = ({ userData }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const defaultAvatarUrl = '/profile.png';
  const [imagePreview, setImagePreview] = useState(
    userData.profile?.photo?.url || defaultAvatarUrl
  );

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setAvatar(selectedFile);
      const uploadUrl = await getUploadUrl();
      console.log('uploadUrl:', uploadUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    await updateUser(formData);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      {showSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          Profile updated successfully!
        </div>
      )}
      <h1 className="text-2xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <input type="text" hidden name="id" defaultValue={userData.contactId || ''} />
        <div className="flex flex-col items-center justify-center relative">
          {imagePreview && (
            <div className="mb-4 relative">
              <Image
                src={imagePreview}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="file-input"
              />
              <button
                type="button"
                onClick={() => document.getElementById('file-input')?.click()}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-full w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>

        <label htmlFor="username" className="text-sm text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          defaultValue={userData.profile?.nickname || 'noname'}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />

        <label htmlFor="firstName" className="text-sm text-gray-700">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          defaultValue={userData.contact?.firstName || 'noname'}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />

        <label htmlFor="lastName" className="text-sm text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          defaultValue={userData.contact?.lastName || 'noname'}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />

        <label htmlFor="address" className="text-sm text-gray-700">
          Address
        </label>
        <input
          id="address"
          type="text"
          name="address"
          defaultValue={userData.contact?.addresses?.[0]?.city || 'noaddress'}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
        />

        <label htmlFor="email" className="text-sm text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          defaultValue={userData.loginEmail || 'noemail'}
          className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          readOnly
        />

        <UpdateButton />
      </form>
    </div>
  );
};

export default ProfileForm;
