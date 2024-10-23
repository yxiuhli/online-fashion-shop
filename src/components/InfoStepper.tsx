"use client";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

import { Suspense } from "react";
import Reviews from "@/components/Reviews";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "User reviews",
    key: "reviews",
  },
  {
    label: "Detail parameters",
    key: "parameters",
  },
  {
    label: "Product description",
    key: "description",
  },
];

const InfoStepper = (product: any) => {
  const [current, setCurrent] = useState("mail");
  const onClick = () => {};
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <button onClick={onClick} className="outline-none">
          User reviews
        </button>
        <button onClick={onClick}>Detail parameters</button>
        <button onClick={onClick}>Product description</button>
      </div>
    </div>
  );
};

export default InfoStepper;
