'use client';

import { useState } from 'react';
import UpdateButton from '@/components/UpdateButton';
import { updateUser } from '@/lib/action';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import SuccessPopup from '@/components/SuccessPopup';

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
  const defaultAvatarUrl =
    'https://res.cloudinary.com/dg1v135vg/image/upload/v1730799660/istockphoto-1495088043-612x612_nsmhze.jpg';
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
        <SuccessPopup
          message="Profile updated successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
      <h1 className="text-2xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-8">
        <input type="text" hidden name="id" defaultValue={userData.contactId || ''} />
        <div className="flex flex-col items-center justify-center relative md:w-1/2">
          {imagePreview && (
            <div className="mb-4 relative flex flex-col items-center">
              <CldImage
                src={imagePreview}
                alt="Avatar"
                width={200}
                height={200}
                quality="auto"
                crop="fill"
                className="rounded-full border-2 border-gray-300"
              />
              <CldUploadButton
                uploadPreset="ml_default"
                onSuccess={handleUpload}
                className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all"
              >
                +
              </CldUploadButton>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          <label htmlFor="firstName" className="text-sm text-gray-700">
            Full Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            defaultValue={userData.contact?.firstName || 'noname'}
            className="ring-1 ring-gray-300 rounded-md p-2"
          />

          <label htmlFor="address" className="text-sm text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            defaultValue={userData.contact?.addresses?.[0]?.city || 'noaddress'}
            className="ring-1 ring-gray-300 rounded-md p-2"
          />

          <label htmlFor="email" className="text-sm text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            defaultValue={userData.loginEmail || 'noemail'}
            className="ring-1 ring-gray-300 rounded-md p-2"
            readOnly
          />

          <UpdateButton />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
