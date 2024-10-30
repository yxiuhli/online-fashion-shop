"use client"
import { Divider } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  title?: string;
  content: string;
  rating: number;
}

interface ReviewsResponse {
  data: Review[];
  meta?: {
    total?: number;
    page?: number;
  };
}

const getReviews = async (productId :String)  => {
  const reviewRes = await fetch(
      `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
    );
  const reviews = await reviewRes.json();
  return reviews;
}

const Reviews = ({ productId }: { productId: string }) => {
  const [reviews,setReviews] = useState<ReviewsResponse>();
  

  useEffect(() => {
    try {
      getReviews(productId).then((data) => {
        setReviews(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);


  return reviews?.data.map((review: any) => (
    <div key={review.id}>
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
