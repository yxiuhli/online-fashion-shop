import { Card } from "antd";
import Add from "@/components/cart/Add";

import CustomizeProducts from "@/components/CustomizeProducts";
import RatingInfo from "@/components/feedback/RatingInfo";
import Image from "next/image";

const PinnedProduct = ({
  display,
  product,
}: {
  display: Boolean;
  product: any;
}) => {
  return (
    <>
      <Card
        className={`transition-all duration-300 ${
          display
            ? "opacity-100 -translate-y-0"
            : "opacity-0 -translate-y-0 pointer-events-none"
        } sticky top-16 w-96`}
      >
        {" "}
        <div className="w-full flex flex-col gap-2 font-[Monaco]">
          <div className="flex gap-6">
            <div className="h-32">
              <Image
                src={product.media?.items[0].image?.url}
                alt=""
                height={1280}
                width={1280}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">{product.name}</h1>
              <RatingInfo productId={product._id!} mode="pinned" />

              {product.priceData?.price ===
              product.priceData?.discountedPrice ? (
                <h2 className="font-medium text-2xl ">
                  ${product.priceData?.price}
                </h2>
              ) : (
                <div className="flex items-center gap-4">
                  <h3 className="text-xl text-gray-500 line-through">
                    ${product.priceData?.price}
                  </h3>
                  <h2 className="font-medium text-2xl">
                    ${product.priceData?.discountedPrice}
                  </h2>
                </div>
              )}
            </div>
          </div>
          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <Add
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.stock?.quantity || 0}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default PinnedProduct;
