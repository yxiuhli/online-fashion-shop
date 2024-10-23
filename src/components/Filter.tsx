'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if ((name === 'min' || name === 'max') && isNaN(Number(value))) {
      console.log('Please enter a valid number');
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <div className="py-2 px-4 text-sm font-medium bg-white">Filter</div>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option disabled selected>
            Sort By
          </option>
          <option value="asc_price">Price (low to high)</option>
          <option value="desc_price">Price (high to low)</option>
          <option value="asc_lastUpdated">Newest</option>
          <option value="desc_lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
