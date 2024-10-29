// ProfilePage.js (Server Component)

import ProfileForm from '@/components/ProfileForm';
import { wixClientServer } from '@/lib/wixClientServer';
import { members } from '@wix/members';

const ProfilePage = async () => {
  const wixClient = await wixClientServer();
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?.contactId) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-24 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ProfileForm userData={user.member} />
      <div className="w-full md:w-1/2">Order</div>
    </div>
  );
};

export default ProfilePage;
