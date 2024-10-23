import UpdateButton from '@/components/UpdateButton';
import { updateUser } from '@/lib/action';
import { wixClientServer } from '@/lib/wixClientServer';
import { members } from '@wix/members';

const ProfilePage = async () => {
  const wixClient = await wixClientServer();
  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!(await user).member?.contactId) {
    return <div>Not logged in</div>;
  }
  const userId = user.member?.contactId ?? '';

  return (
    <div className="flex flex-col md:flex-row gap-24 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1>Profile</h1>
        <form action={updateUser} className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={userId} />
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder={user.member?.profile?.nickname || 'noname'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={user.member?.contact?.firstName || 'noname'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder={user.member?.contact?.lastName || 'noname'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder={user.member?.contact?.addresses[0]?.city || 'noaddress'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            placeholder={user.member?.loginEmail || 'noemail'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            disabled
          />
          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2">Order</div>
    </div>
  );
};

export default ProfilePage;
