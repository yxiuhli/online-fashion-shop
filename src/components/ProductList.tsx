import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
// import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith('name', searchParams?.name || '')
    .eq('collectionIds', categoryId)
    .ge('priceData.price', searchParams?.min || 0)
    .le('priceData.price', searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0);

  if (searchParams?.sort == 'asc_lastUpdated') {
    productQuery.ascending('lastUpdated');
  } else if (searchParams?.sort == 'desc_lastUpdated') {
    productQuery.descending('lastUpdated');
  }

  const res = await productQuery.find();

  const sortedProducts = res.items.sort((a: any, b: any) => {
    const priceA = a.priceData.price;
    const priceB = b.priceData.price;
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);

    if (searchParams?.sort === 'asc_price') {
      return priceA - priceB; // Sắp xếp giá tăng dần
    } else if (searchParams?.sort === 'desc_price') {
      return priceB - priceA; // Sắp xếp giá giảm dần
    } else if (searchParams?.sort == 'asc_lastUpdated') {
      return dateA.getTime() - dateB.getTime();
    } else if (searchParams?.sort == 'desc_lastUpdated') {
      return dateB.getTime() - dateA.getTime();
    }
    return 0; // Không sắp xếp nếu không có sort
  });

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {sortedProducts.map((product: products.Product) => (
        <Link
          href={'/' + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || '/product.png'}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || '/product.png'}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === 'shortDesc'
                  )?.description || ''
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null} */}
    </div>
  );
};

export default ProductList;
