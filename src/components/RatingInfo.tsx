import { Rate } from "antd";

const RatingInfo = async ({ productId }: { productId: string }) => {
  const ratingInfoRes = await fetch(
    `https://api.fera.ai/v3/public/products/${productId}/rating?public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
  );
  const ratingInfo = await ratingInfoRes.json();

  return (
    <div className="flex items-center gap-2 text-gray-600">
      {/* STARS */}
      <Rate disabled defaultValue={5} allowHalf value={ratingInfo.average} />
      <span>{ratingInfo.count} reviews</span>
    </div>
  );
};

export default RatingInfo;
