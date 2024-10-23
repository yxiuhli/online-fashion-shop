"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const wixClient = useWixClient();
  const { cart, isLoading } = useCartStore();
  const cartAny: any = cart;

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-32 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold px-8 mt-6">Shopping Cart</h2>
      {(!cart.lineItems?.length ? (
        <div className="text-gray-400 text-center w-full text-3xl font-thin">Your cart is empty</div>
      ) : (
        <>
          
          {/* LIST */}
          <div className="px-16 flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => 
              <CartItem item={item} key={item._id}/>
            )}
          </div>
          {/* BOTTOM */}
          <div>
            <div className="pl-8 pr-16 flex text-2xl items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${cartAny.subtotal.amount}</span>
            </div>
            <p className="px-8 text-gray-500 text-sm">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <div className="px- self-end flex justify-between text-sm">
            <button
              className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default CartPage;
