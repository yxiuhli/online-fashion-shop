import ProfileForm from '@/components/ProfileForm';
import { wixClientServer } from '@/lib/wixClientServer';
import { members } from '@wix/members';
import Link from 'next/link';

const ProfilePage = async () => {
  const wixClient = await wixClientServer();

  try {
    const user = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    if (!user.member?.contactId) {
      return (
        <div className="flex flex-col items-center justify-center">
          You are not logged in. Please log in to view your profile.
        </div>
      );
    }

    const orderRes = await wixClient.orders.searchOrders({
      search: {
        filter: { 'buyerInfo.contactId': { $eq: user.member?.contactId } },
      },
    });

    return (
      <div className="flex flex-col md:flex-row gap-24 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-5">
        <div className="w-full md:w-1/2 border rounded-lg p-4 shadow-md">
          <ProfileForm userData={user.member} />
        </div>
        <div className="w-full md:w-1/2 border rounded-lg p-4 shadow-md">
          <h1 className="text-2xl">Orders</h1>
          <div className="mt-12 flex flex-col">
            <div className="flex justify-between px-2 py-2 font-bold border-b">
              <span className="w-1/4">ID</span>
              <span className="w-1/4">Date</span>
              <span className="w-1/4">Price</span>
              <span className="w-1/4">Status</span>
            </div>
            {orderRes.orders.map((order) => (
              <Link
                href={`/order/${order._id}`}
                key={order._id}
                className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
              >
                <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
                {order._createdDate && (
                  <span className="w-1/4  text-gray-500">
                    {new Date(order._createdDate).toLocaleDateString()}
                  </span>
                )}
                <span className="w-1/4  text-gray-500">
                  ${order.priceSummary?.subtotal?.amount}
                </span>
                <span
                  className={`w-1/4 ${order.status === 'INITIALIZED' ? 'text-green-500' : ''} 
                        ${order.status === 'APPROVED' ? 'text-blue-500' : ''} 
                        ${order.status === 'CANCELED' ? 'text-red-500' : ''}`}
                >
                  {order.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching current member:', error);
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        Unable to fetch profile information. Please log in.
      </div>
    );
  }
};

export default ProfilePage;
