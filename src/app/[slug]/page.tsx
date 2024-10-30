import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import ProductPreviewSection from "@/components/product/ProductPreviewSection";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import Reviews from "@/components/feedback/Reviews";

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

  return (
    <div className="relative font-[Monaco] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ProductPreviewSection product={product} />
      <ProductDetailSection product={product} />
    </div>
  );
};

export default SinglePage;
