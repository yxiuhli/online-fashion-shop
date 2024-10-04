import { wixClientServer } from '@/lib/wixClientServer';
import { members } from '@wix/members';
import EditProfileModal from '@/components/EditProfileModal'; // Import the client-side modal

const ProfilePage = async () => {
  // Fetch user data here (server-side logic)
  // const wixClient = wixClientServer();
  // const user = (await wixClient).members.getCurrentMember({
  //   fieldsets: [members.Set.FULL],
  // });

  return (
    <div className="flex flex-col md:flex-row gap-24 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1>Profile</h1>
        <form className="mt-12 flex flex-col gap-4">
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="noname"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            disabled
          />
          <label className="text-sm text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder="nonaddress"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            disabled
          />
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="nophone"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            disabled
          />

          {/* Render the client-side modal here */}
          <EditProfileModal />
        </form>
      </div>
      <div className="w-full md:w-1/2">Order</div>
    </div>
  );
};

export default ProfilePage;
