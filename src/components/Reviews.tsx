import { Divider } from "antd";
import Image from "next/image";

const Reviews = async ({ productId }: { productId: string }) => {
  const reviewRes = await fetch(
    `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
  );
  const reviews = await reviewRes.json();

  return reviews.data?.map((review: any) => (
    <div className="">
      <div className="flex gap-2 items-start">
        {/* USER */}
        <Image
          src={review.customer.avatar_url}
          key= {review._id}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col text-sm" key={review.id}>
          <span>{review.customer.display_name}</span>
          {/* STARS */}
          <div className="flex gap-2">
            {Array.from({ length: review.rating }).map((_, index) => (
              <Image
                src="/star.png"
                alt=""
                key={index}
                width={16}
                height={16}
              />
            ))}
          </div>
          {/* DESC */}
          {review.heading && <p>{review.heading}</p>}
          {review.body && <p>{review.body}</p>}
          <div className="">
            {review.media.map((media: any) => (
              <Image
                src={media.url}
                key={media.id}
                alt=""
                width={100}
                height={50}
                className="object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      <Divider />
    </div>
  ));
};

export default Reviews;
