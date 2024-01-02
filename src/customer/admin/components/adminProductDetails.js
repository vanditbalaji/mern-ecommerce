import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateUserDataAsync } from "../../user/usersSlice";
import HeartIcons from "../../pages/heart";
import { fetchByIdAsync, resetById } from "../../product/productSlice";
import { Discount } from "../../pages/filter";
import UserAuthentication from "../../pages/userAuthentication";
import { addToCartAsync, fetchUserCartAsync } from "../../cart/cartSlice";

const colors = [
  { name: "black", class: "bg-black", selectedClass: "ring-black" },
  { name: "Black", class: "bg-black", selectedClass: "ring-black" },
  { name: "Green", class: "bg-green-500", selectedClass: "ring-green-500" },
  { name: "Yellow", class: "bg-yellow-500", selectedClass: "ring-yellow-500" },
  { name: "Blue", class: "bg-blue-500", selectedClass: "ring-blue-500" },
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "white", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Grey", class: "bg-gray-500", selectedClass: "ring-gray-500" },
  { name: "Pink", class: "bg-pink-500", selectedClass: "ring-pink-500" },
  { name: "Light Blue", class: "bg-blue-300", selectedClass: "ring-blue-300" },
  { name: "Dark Blue", class: "bg-blue-800", selectedClass: "ring-blue-800" },
  { name: "Orange", class: "bg-orange-500", selectedClass: "ring-orange-500" },
  { name: "Beige", class: "bg-beige", selectedClass: "ring-beige" },
  { name: "Purple", class: "bg-purple-500", selectedClass: "ring-purple-500" },
  {
    name: "Light Green",
    class: "bg-green-300",
    selectedClass: "ring-green-300",
  },
  { name: "Maroon", class: "bg-maroon", selectedClass: "ring-maroon" },
  { name: "Gold", class: "bg-gold", selectedClass: "ring-gold" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const highlight = [
  "Free Shipping above 499",
  "100% cotton fabric",
  "Pre-washed and pre-shrunk",
];

const ProductDetails = () => {
  const product = useSelector((state) => state.product?.byid);
  const ProductColor = colors?.filter(
    (color) => color?.name === product?.color
  );

  const sizes = [
    { name: "S", inStock: product?.size?.s > 0, value: "s" },
    { name: "M", inStock: product?.size?.m > 0, value: "m" },
    { name: "L", inStock: product?.size?.l > 0, value: "l" },
  ];

  const [productSize, setProductSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [filledHeart, setFilledHeart] = useState(false);

  const user = useSelector((state) => state.user.loggedinUser);
  const users = useSelector((state) => state.userOrder.userInfo);

  const dispatch = useDispatch();
  const param = useParams();

  const handleClick = (userproduct) => {
    if (!filledHeart) {
      const newUser = { ...users };
      newUser.wishList = [...newUser.wishList, userproduct];
      dispatch(updateUserDataAsync(newUser));
    } else {
      const newUser = { ...users };
      const filteredProduct = newUser?.wishList.filter(
        (wishlist) => wishlist.id !== userproduct.id
      );
      newUser.wishList = filteredProduct;
      dispatch(updateUserDataAsync(newUser));
    }
    setFilledHeart(!filledHeart);
  };

  const CryptoJS = require("crypto-js");
  const secretKey = "your-secret-key";
  const navigate = useNavigate();
  const modifiedToOriginal = param.id.replace(/_/g, "/");
  const bytes = CryptoJS.AES.decrypt(modifiedToOriginal, secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    dispatch(fetchByIdAsync(decryptedString));
  }, [dispatch, param.id]);

  useEffect(() => {
    const isProductInWishList = users?.wishList.some(
      (product) => product.id === decryptedString
    );
    if (isProductInWishList) {
      setFilledHeart(true);
    }
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate("adminForm", { state: product.id });
    dispatch(resetById());
  };
  const handleSize = (value) => {
    setProductSize(value.value);
  };

  UserAuthentication();

  return product ? (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb"></nav>
        <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="hidden overflow-hidden rounded-lg aspect-h-4 aspect-w-3 lg:block">
            <img
              src={product?.thumbnail}
              alt={product?.images[0]}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="overflow-hidden rounded-lg aspect-h-2 aspect-w-3">
              <img
                src={product?.thumbnail}
                alt={product?.images[0]}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="overflow-hidden rounded-lg aspect-h-2 aspect-w-3"></div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product?.thumbnail}
              alt={product?.images[0]}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="flex lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>
            </div>
            <div className="mt-2 ml-auto">
              <HeartIcons
                filled={filledHeart}
                width="24"
                height="24"
                color="#A65959"
                onClick={() => {
                  handleClick(product);
                }}
              />
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {"₹ "}
              {/* {product} */}
              {Discount(product?.price, product?.discountPercentage)}
            </p>

            {/* Reviews */}

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {ProductColor &&
                      ProductColor?.map((color) => (
                        <RadioGroup.Option
                          key={color?.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color?.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color?.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="https://www.sizeguide.net/size-guide-men-size-chart.html"
                    target="_blank"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes &&
                      sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          onClick={() => handleSize(size)}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                                >
                                  <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                onClick={handleEdit}
                className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-white border border-transparent rounded-md bg-stone-800 hover:bg-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Edit Product
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 space-y-2 text-sm list-disc">
                  {highlight.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductDetails;
