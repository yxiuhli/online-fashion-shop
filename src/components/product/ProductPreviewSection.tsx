import ProductImages from '@/components/product/ProductImages';
import Add from '@/components/cart/Add';

import { Suspense } from 'react';
import CustomizeProducts from '@/components/CustomizeProducts';
import RatingInfo from '@/components/feedback/RatingInfo';

const ProductPreviewSection = ({ product }: { product: any }) => {
  return (
    <div className="relative flex flex-col lg:flex-row gap-24 py-8">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <Suspense fallback="Loading...">
          <RatingInfo productId={product._id!} mode="detail" />
        </Suspense>
        {product.priceData?.price === product.priceData?.discountedPrice ? (
          <h2 className="font-medium text-5xl py-4">${product.priceData?.price}</h2>
        ) : (
          <div className="flex items-center py-4 gap-4">
            <h3 className="text-4xl text-gray-500 line-through">${product.priceData?.price}</h3>
            <h2 className="font-medium text-red-500 text-5xl">
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
  );
};

export default ProductPreviewSection;
