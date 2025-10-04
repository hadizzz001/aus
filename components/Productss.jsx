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
<div className="container mx-auto px-4 py-4">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {allTemp && allTemp.length > 0 ? (
      allTemp.map((item) => (
        <a key={item._id} href={`/product?id=${item._id}`}>
          <div className="grid grid-cols-1">
            {/* Product Image */}
            <div className="relative w-full aspect-square">
              <img
                src={item.img[0]}
                alt={item.title || "Product Image"}
                className="w-full h-full object-contain rounded"
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
            <div className="text-center mt-2">
              <p 
                                      className="br_text-current br_no-underline myGray"
                        id="anchorNew"
              >{item.title}</p>
              <p className="text-red-600 font-light">
                ${item.discount}{" "}
                <span className="line-through text-gray-400">
                  ${item.price}
                </span>
              </p>
            </div>
          </div>
        </a>
      ))
    ) : (
      <div className="col-span-1 text-center text-black text-xl">
        No products found
      </div>
    )}
  </div>
</div>


      </div>
    </>
  );
};

export default Body;
