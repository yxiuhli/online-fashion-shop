import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-16">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-center">
        {/* LEFT */}
        <div className="lg:w-1/4 flex flex-col gap-2 items-center lg:items-start">
          <Link href="/">
            <div className="text-2xl tracking-wide">7-FASHION</div>
          </Link>
          <div className="">© 2024 7-Fashion Shop</div>
        </div>
        {/* CENTER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-12 justify-between lg:w-3/4">
          <div className="flex flex-col justify-between  items-center lg:items-start">
            <h1 className="font-medium text-lg ">ADDRESS</h1>
            <p className="">Dong Hoa dist., Di An City, Binh Duong, Vietnam</p>
          </div>
          <div className="flex flex-col justify-between  items-center lg:items-start">
            <h1 className="font-medium text-lg">PHONE</h1>
            <a href={`tel:hello@7fashion.dev`} className="font-semibold">
              +1 234 567 890
            </a>
          </div>
          <div className="flex flex-col justify-between items-center lg:items-start">
            <h1 className="font-medium text-lg">EMAIL</h1>

            <a href={`mailto:hello@7fashion.dev`} className="font-semibold">
              hello@7fashion.dev
            </a>
          </div>
          <div className="flex flex-col justify-between items-center  lg:items-start ">
            <h1 className="font-medium text-lg">FOLLOW US</h1>

            <div className="flex gap-6">
              <Image src="/facebook.png" alt="" width={16} height={16} />
              <Image src="/instagram.png" alt="" width={16} height={16} />
              <Image src="/x.png" alt="" width={16} height={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
