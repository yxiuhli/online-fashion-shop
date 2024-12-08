import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import { Suspense, useContext } from 'react';

const HomePage = () => {

  return (
    <div className="">
      {/* <Slider /> */}
      <div className="mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID!} limit={4} />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Categories</h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!} limit={4} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;