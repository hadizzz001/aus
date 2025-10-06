"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';


const Body = () => {
  const [allTemp, setTemp] = useState([]);
  const [checkboxesData, setCheckboxesData] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]); // only one active
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products
  const fetchProducts = async (pageNum = 1) => {
    const params = new URLSearchParams();
    params.append("page", pageNum);
    params.append("limit", 10);

    checkedCategories.forEach((cat) => params.append("category", cat));

    const res = await fetch(`/api/productsz?${params.toString()}`);
    const data = await res.json();
    setTemp(data.products);
    setTotalPages(data.totalPages);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCheckboxesData(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [checkedCategories, page]);

  // Only one category selected at a time
  const handleCategoryClick = (categoryId) => {
    setPage(1);
    setCheckedCategories([categoryId]);
  };

  return (
    <>
      <div className="br_min-h-screen br_relative md:mt-20 mt-20">
        {/* Title */}
        <header className="br_text-white br_p-3 br_pt-11 md:br_py-20 br_flex md:br_justify-center">
          <div className="br_text-left md:br_max-w-[600px] lg:br_max-w-[800px] md:br_text-center br_flex br_flex-col br_gap-2 md:br_gap-4 md:br_items-center">
            <p className="br_text-2xl md:br_text-3xl myGray">Explore our curated collection!
</p> 
          </div>
        </header>
 
{/* Categories as image-radio buttons */}
<div className="br_flex br_justify-center mygabbb br_overflow-x-auto br_flex-nowrap br_py-4 br_px-5 scrollbar-hide">
  {checkboxesData.map((category) => {
    const isChecked = checkedCategories.includes(category.name);

    return (
      <label
        key={category.id}
        className="br_cursor-pointer br_text-center br_flex-shrink-0 br_flex br_flex-col br_items-center"
        onClick={() => handleCategoryClick(category.name)}
      >
        <input
          type="radio"
          name="category"
          value={category.name}
          checked={isChecked}
          onChange={() => {}}
          className="hidden"
        />

        {/* Category Image Container */}
        <div
          className={`br_w-40 br_h-40 br_flex br_items-center br_justify-center transition-all duration-300`}
          style={{
            border: isChecked ? "3px solid #222" : "3px solid transparent",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={category.img?.[0]}
            alt={category.name}
            className="br_w-full br_h-full br_object-contain"
            style={{ objectFit: "contain" }}
          />
        </div>

        <p className="br_mt-3 br_text-sm br_text-black">{category.name}</p>

{isChecked && (
  <svg
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4B5563"
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-1"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)}


      </label>
    );
  })}
</div>







        {/* Product Grid */}
<div className="br_@container">
  <div
    className="br_group/tile-grid br_grid br_grid-flow-dense br_gap-1 br_py-1 br_grid-cols-2 sm:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:br_px-1 lg:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))] supports-[container-type]:sm:br_grid-cols-2 supports-[container-type]:sm:@[640px]:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] supports-[container-type]:lg:@[1024px]:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))]"
  >
    {allTemp && allTemp.length > 0 ? (
      allTemp.map((item) => (
        <a key={item._id} href={`/product?id=${item._id}`}>
          <div
            className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]"
          >
{/* Product Image Container */}
<div className="relative inline-block w-full max-w-[300px] aspect-square">
  <img
    src={item.img[0]}
    alt={item.title || "Product Image"}
    className="w-full h-full object-contain rounded"
    style={{ objectFit: "contain" }} // ensures the full image is visible
  />

  {/* Out of Stock overlay */}
  {(
    (item.type === "single" && parseInt(item.stock) === 0) ||
    (item.type === "collection" &&
      item.color?.every((color) =>
        color.sizes?.every((size) => parseInt(size.qty) === 0)
      ))
  ) && (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10 rounded">
      Out of Stock
    </div>
  )}
</div>


            {/* Product Info */}
            <div className="Layout br_contents">
              <span className="br_contents br_edition-">
                <div className="br_grid br_grid-cols-1 br_grid-rows-[auto_auto_1fr_auto] supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid] initial:br_text-white apex:br_bg-[#4e4e4e] apex:br_text-white br_gap-2 br_pb-3 br_group/tile br_relative">
                  <div
                    style={{ textAlign: "center" }}
                    className="initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center"
                  >
                    {/* Title */}
                    <h3 className="myNewC br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                      <a
                        href={`/product?id=${item._id}`}
                        className="br_text-current br_no-underline myGray"
                        id="anchorNew"
                      >
                        {item.title}
                        <span
                          className="br_absolute br_inset-0 br_z-10"
                          aria-hidden="true"
                        />
                      </a>
                    </h3>

                    {/* Price + Discount */}
                    <div className="price-container br_inline-flex br_flex-wrap br_gap-x-2 br_items-baseline apex:br_text-white group-[.centered]/tile:br_justify-center">
                      {/* Original Price */}
                      <span className="font-light text-[13px] py-1 line-through text-gray-400 float-left">
                        {!item.color?.some((c) => c.sizes?.length > 0) && (
                          <span>${parseFloat(item.price).toFixed(2)}</span>
                        )}
                      </span>

                      {/* Discounted Price */}
                      <span className="font-light text-[13px] py-1 rounded myRed float-left">
                        {item.type === "single" ||
                        (item.type === "collection" && !item.color)
                          ? `$${item.discount}` || "N/A"
                          : item.type === "collection" &&
                            item.color &&
                            item.color.some((c) => c.sizes?.length)
                          ? (() => {
                              const prices = item.color
                                .flatMap((c) => c.sizes || [])
                                .map((s) => s.price);
                              if (prices.length === 0) return "N/A";
                              const minPrice = Math.min(...prices);
                              const maxPrice = Math.max(...prices);
                              return minPrice === maxPrice
                                ? `$${minPrice.toFixed(2)}`
                                : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(
                                    2
                                  )}`;
                            })()
                          : `$${item.discount}`}
                        <span className="ml-1 text-xs">
                          {Math.round(
                            ((item.price - item.discount) / item.price) * 100
                          )}
                          % off
                        </span>
                      </span>
                    </div>
                    <br />
                  </div>
                </div>
              </span>
            </div>
          </div>
        </a>
      ))
    ) : (
      <div className="home___error-container">
        <h2 className="text-black text-xl dont-bold">No products found</h2>
      </div>
    )}
  </div>

  {/* Pagination */}
  <div className="mt-4 mb-4 flex justify-center items-center space-x-4">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 rounded disabled:opacity-50 myGray text-3xl"
      style={{ color: "#999" }}
    >
      &#8592;
    </button>

    <span
      className="flex items-center justify-center text-white text-[11px]"
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: "#143e56",
        borderRadius: "50%",
      }}
    >
      {page}
    </span>

    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 rounded disabled:opacity-50 myGray text-3xl"
      style={{ color: "#999" }}
    >
      &#8594;
    </button>
  </div>
</div>

      </div>
    </>
  );
};

export default Body;
