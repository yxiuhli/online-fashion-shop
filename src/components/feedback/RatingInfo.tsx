"use client"
import { Rate } from "antd";
import { useEffect, useState } from "react";



interface RatingInfoResponse {
  average: number;
  count: number;
}

const getRatingInfo = async (productId :String)  => {
  const ratingInfoRes = await fetch(
    `https://api.fera.ai/v3/public/products/${productId}/rating?public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
  );
  const ratingInfo = await ratingInfoRes.json();
  return ratingInfo;
}

const RatingInfo = ({ productId , mode }: { productId: string , mode :String }) => {
  const [ratingInfo,setRatingInfo] = useState<RatingInfoResponse>();
  

  useEffect(() => {
    try {
      getRatingInfo(productId).then((data) => {
        setRatingInfo(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={`flex ${mode === "pinned" ? "flex-col" : ""} items-start gap-2 text-gray-600`}>
      {/* STARS */}
      <Rate disabled defaultValue={5} allowHalf value={ratingInfo?.average} />
      <span>{ratingInfo?.count} reviews</span>
    </div>
  );
};

export default RatingInfo;
