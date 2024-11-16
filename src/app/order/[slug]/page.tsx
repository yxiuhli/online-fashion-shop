import { wixClientServer } from "@/lib/wixClientServer";
import {
  CreditCardOutlined,
  FormOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Row, Table, Input } from "antd";
import type { TableProps } from "antd";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { columns } from "@/components/TableProps";

interface DataType {
  key: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: string;
  totalPrice: number;
}

const OrderPage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const order = await wixClient.orders.getOrder(params.slug);

  const transactions =
    await wixClient.orderTransactions.listTransactionsForSingleOrder(
      params.slug
    );
  const payment = transactions.orderTransactions?.payments[0];

  if (!order) {
    return notFound();
  }
  const extractFilename = (url: string): string => {
    const regex = /wix:image:\/\/v1\/(.+?)#originWidth/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };
  const formatOrderDate = (date: Date) => {
    if (!date) return "No information"
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const data: DataType[] = order.lineItems.map((item) => ({
    key: item._id!,
    name: item.productName?.original!,
    imageUrl: extractFilename(item.image!)!,
    quantity: item.quantity!,
    unitPrice: item.price?.amount!,
    totalPrice: Number(item.price?.amount) * item.quantity!,
  }));

  return (
    <div className="container mx-32  p-4">
      <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
      <div className="flex flex-col bg-slate-50 rounded-lg shadow-md p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-md font-semibold ">
              Order Number: #{order.number}
            </h3>
            <p className="text-sm text-gray-500">
              {formatOrderDate(order?._createdDate!)}
            </p>
          </div>
          <div>
            {order.paymentStatus === "NOT_PAID" ? (
              <p className="px-2 py-1 mb-2 rounded-md bg-red-100 text-red-500">
                Unpaid
              </p>
            ) : (
              <p className="px-2 py-1 mb-2 rounded-md bg-green-100 text-green-500">
                Paid
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-2 px-4 py-12 gap-12 ">
          <div className="flex items-start gap-4">
            <UserOutlined
              style={{ fontSize: "30px" }}
              className="rounded-full bg-gray-100 p-3"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl pb-2">Customer</h2>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Name: </p>
                <p className="">
                  {order.billingInfo?.contactDetails?.firstName}{" "}
                  {order.billingInfo?.contactDetails?.lastName}
                </p>
              </div>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Email: </p>
                <p className="">{order.buyerInfo?.email}</p>
              </div>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Phone: </p>
                <p className="">{order.billingInfo?.contactDetails?.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <TruckOutlined
              style={{ fontSize: "30px" }}
              className="rounded-full bg-gray-100 p-3"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl pb-2">Shipping Info</h2>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Shipping option: </p>
                <p className="">{order.shippingInfo?.title}</p>
              </div>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Shipping fee: </p>
                <p className="">${order.shippingInfo?.cost?.price?.amount}</p>
              </div>
              <div className="flex gap-4 justify-start items-start">
                <p className="text-gray-400 shrink-0">Shipping address: </p>
                <div className="">
                  {
                    order.shippingInfo?.logistics?.shippingDestination?.address
                      ?.addressLine1
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CreditCardOutlined
              style={{ fontSize: "30px" }}
              className="rounded-full bg-gray-100 p-3"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl pb-2">Payment Info</h2>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Payment method: </p>
                <p className="">
                  {payment
                    ? payment.regularPaymentDetails?.paymentMethod
                    : "No information"}
                </p>
              </div>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Payment status: </p>
                <p className="">
                  {order.paymentStatus === "NOT_PAID" ? "Unpaid" : "Paid"}
                </p>
              </div>
              <div className="flex gap-4 justify-start">
                <p className="text-gray-400">Transaction date: </p>
                <p className="">{formatOrderDate(payment?._createdDate!)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FormOutlined
              style={{ fontSize: "30px" }}
              className="rounded-full bg-gray-100 p-3"
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl pb-2">Note</h2>
              <input
                className="min-h-16 min-w-80 border-solid border-2 rounded-lg"
                disabled
                placeholder={order.buyerNote!}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-md font-semibold ">Products</h3>
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <div className="flex gap-8 justify-end text-xl mr-64">
            <p className="text-slate-700">Subtotal: </p>
            <p className="">${order.priceSummary?.subtotal?.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
