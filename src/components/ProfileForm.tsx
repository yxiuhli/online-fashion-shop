'use client';

// Define the structure of userData based on the fields you are accessing
interface UserData {
  contactId?: string | null;
  profile?: {
    nickname?: string | null;
  };
  contact?: {
    firstName?: string | null;
    lastName?: string | null;
    addresses?: { city?: string | null }[] | null;
  };
  loginEmail?: string | null;
}

// ProfileForm.js (Client Component)

import { useState } from 'react';
import UpdateButton from '@/components/UpdateButton';
import { updateUser } from '@/lib/action';

interface ProfileFormProps {
  userData: UserData;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userData }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" hidden name="id" defaultValue={userData.contactId || ''} />
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
