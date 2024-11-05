'use client';

import { useState } from 'react';
import UpdateButton from '@/components/UpdateButton';
import { updateUser } from '@/lib/action';
import { CldImage, CldUploadButton } from 'next-cloudinary';

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

const ProfileForm: React.FC<ProfileFormProps> = ({ userData }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const defaultAvatarUrl = '/profile.png';
  const [imagePreview, setImagePreview] = useState(
    userData.profile?.photo?.url || defaultAvatarUrl
  );

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      const uploadedImageUrl = result.info.secure_url;
      setImagePreview(uploadedImageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (imagePreview !== defaultAvatarUrl) {
      formData.append('avatar', imagePreview);
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
              <CldImage
                src={imagePreview}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-300"
              />
              <CldUploadButton uploadPreset="ml_default" onSuccess={handleUpload} className="mt-4">
                Upload Avatar
              </CldUploadButton>
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
