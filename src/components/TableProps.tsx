"use client";

import { TableProps } from "antd";
import Image from "next/image";

interface DataType {
  key: string;
  name: string;
  imageUrl: string;
  quantity: number;
  unitPrice: string;
  totalPrice: number;
}

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "",
    dataIndex: "imageUrl",
    key: "imageUrl",
    width: 90,
    render: (url) => {
      return (
        <Image
          src={`https://static.wixstatic.com/media/${url}/v1/fit/w_4000,h_4000,q_90/file.jpg`}
          alt={"Product Image"}
          width={80}
          height={80}
        
        />
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unit price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: "Total price",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
];
