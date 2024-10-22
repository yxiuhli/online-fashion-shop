import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import InfoStepper from "@/components/InfoStepper";
import ProductImages from "@/components/ProductImages";
import RatingInfo from "@/components/RatingInfo";
import Reviews from "@/components/Reviews";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Badge, Descriptions } from "antd";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  const parameterItems = product?.additionalInfoSections?.map((item) => ({
    key: item.title,
    label: item.title,
    children: item.description,
  }));

  return (
    <div className="font-[Monaco] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="relative flex flex-col lg:flex-row gap-24 py-8">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <Suspense fallback="Loading...">
            <RatingInfo productId={product._id!} />
          </Suspense>
          {product.priceData?.price === product.priceData?.discountedPrice ? (
            <h2 className="font-medium text-5xl py-4">
              ${product.priceData?.price}
            </h2>
          ) : (
            <div className="flex items-center py-4 gap-4">
              <h3 className="text-4xl text-gray-500 line-through">
                ${product.priceData?.price}
              </h3>
              <h2 className="font-medium text-5xl">
                ${product.priceData?.discountedPrice}
              </h2>
            </div>
          )}
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
      </div>
      {/* STEPPER */}
      <InfoStepper product={product!} />
      <hr />
      <div className="w-3/5 flex flex-col">
        <h1 className="text-2xl pt-2 pb-6">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense>
        <h1 className="text-2xl pt-2 pb-6">Detail parameters</h1>
        <Descriptions bordered items={parameterItems} />
        <h1 className="text-2xl pt-8 pb-6">Product description</h1>

        {product.description}
      </div>
    </div>
  );
};

export default SinglePage;
