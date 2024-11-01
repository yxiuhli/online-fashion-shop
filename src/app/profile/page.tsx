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
      <div className="flex flex-col md:flex-row gap-24 items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="w-full md:w-1/2">
          <ProfileForm userData={user.member} />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl">Orders</h1>
          <div className="mt-12 flex flex-col">
            {orderRes.orders.map((order) => (
              <Link
                href={`/orders/${order._id}`}
                key={order._id}
                className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
              >
                <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
                <span className="w-1/4">${order.priceSummary?.subtotal?.amount}</span>
                {order._createdDate && (
                  <span className="w-1/4">{new Date(order._createdDate).toLocaleDateString()}</span>
                )}
                <span className="w-1/4">{order.status}</span>
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
