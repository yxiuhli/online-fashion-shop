import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const OrderPage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const order = await wixClient.orders
    // .getOrder(params.slug)
    .getOrder("65a42bd2-d70a-451a-b226-ecaffaaee840");

  if (!order) {
    return notFound();
  }
  const extractFilename = (url: string): string => {
    const regex = /wix:image:\/\/v1\/(.+?)#originWidth/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  return (
    <div className="container  mx-32 my-4 p-4">
      <h1 className="text-2xl mb-4">Order Details</h1>
      <div className="grid grid-cols-3 bg-white rounded-lg shadow-md p-6">
        <div className="col-span-1 h-full">
          <h2 className="text-xl font-semibold mb-2">
            Order Number: #{order.number}
          </h2>
          <p className="mb-2">
            Created by: {order.billingInfo?.contactDetails?.firstName}{" "}
            {order.billingInfo?.contactDetails?.lastName}
          </p>
          <p className="mb-2">Buyer Email: {order.buyerInfo?.email}</p>
          <p className="mb-2">Payment Status: {order.paymentStatus}</p>
          <p className="mb-2">Fulfillment Status: {order.fulfillmentStatus}</p>
          <h3 className="text-lg font-semibold mt-4">Price Summary:</h3>
          <p>Subtotal: {order.priceSummary?.subtotal?.formattedAmount}</p>
          <p>Shipping: {order.priceSummary?.shipping?.formattedAmount}</p>
          <p>Total: {order.priceSummary?.totalPrice?.formattedAmount}</p>
          <h3 className="text-lg font-semibold mt-4">Billing Information:</h3>
          <p>
            Address: {order.billingInfo?.address?.addressLine1},{" "}
            {order.billingInfo?.address?.city},{" "}
            {order.billingInfo?.address?.country},{" "}
            {order.billingInfo?.address?.postalCode}
          </p>
        </div>
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          <ul>
          {order.lineItems.map((item: any) => (
            <li key={item._id} className="mb-4 flex">
              <Image src={`https://static.wixstatic.com/media/${extractFilename(item.image)}/v1/fit/w_4000,h_4000,q_90/file.jpg`} alt={item.productName.original} width={100} height={100} className="mb-2" />
              <p>Product: {item.productName.original}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price per item: {item.price?.formattedAmount}</p>
            </li>
          ))}
        </ul> 
        </div>

         
      </div>
    </div>
  );
};

export default OrderPage;
