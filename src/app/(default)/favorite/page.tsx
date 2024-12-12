import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import { wixClientServer } from "@/lib/wixClientServer";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { redirect } from "next/navigation";

const FavoritePage = async () => {
  const wixClient = await wixClientServer();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (!isLoggedIn) {
    redirect("/login");
  } else {
    const user = await wixClient.members.getCurrentMember();
    const favoriteQuery = await wixClient.items
      .queryDataItems({
        dataCollectionId: "Wishlist",
      })
      .eq("customerId", user.member?._id!)
      .find();

    const favoriteProductIds = favoriteQuery.items.map(
      (item) => item.data?.productId
    );

    const products = await wixClient.products.queryProducts().find();
    const favoriteProducts = products.items.filter((product) =>
      favoriteProductIds.includes(product._id)
    );

    return (
      <div className="relative font-[Monaco] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="mt-4 text-xl font-semibold">Favorite Products</h1>

        {favoriteProducts.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <div className="mt-4  text-gray-500 text-2xl">
              You have no favorite products yet.
            </div>
            <Link
              className="mt-4  text-blue-500 underline"
              href={"/list?cat=all-products"}
            >
              Add more favorite products <ArrowRightOutlined />
            </Link>
          </div>
        )}
        {favoriteProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {favoriteProducts.map((product) => (
              <FavoriteProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default FavoritePage;
//