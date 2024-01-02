import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import img from "../assets/empty.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllFilterProductsAsync,
  fetchFilterBrandAsync,
  fetchFilterGenderAsync,
  fetchFilterCategoryAsync,
} from "../product/productSlice";
import { BrandList, CategoriesList, ColorList } from "./filter";
import UserAuthentication from "./userAuthentication";
import LoadingCircle from "../features/loading/loadingCircle";
import ProductCard from "../product/component/productCard";
import { FaTimes } from "react-icons/fa";
import { updateUserDataAsync } from "../user/usersSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const dispatch = useDispatch();

  const gender = useSelector((state) => state.product.gender);
  const users = useSelector((state) => state.userOrder.userInfo);

  const data = users?.wishList;
  const categories = CategoriesList();
  const brands = BrandList();
  const colors = ColorList();
  const filters = [
    {
      id: "color",
      name: "Color",
      options: colors,
    },
    {
      id: "gender",
      name: "Gender",
      options: gender,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
    {
      id: "categories",
      name: "Categories",
      options: categories,
    },
  ];

  const handleClick = (userproduct) => {
    const newUser = { ...users };
    const filteredProduct = newUser.wishList.filter(
      (wishlist) => wishlist.id !== userproduct
    );
    newUser.wishList = filteredProduct;
    dispatch(updateUserDataAsync(newUser));
  };

  useEffect(() => {
    dispatch(fetchAllFilterProductsAsync({ filter, sort }));
    dispatch(fetchFilterBrandAsync());
    dispatch(fetchFilterGenderAsync());
    dispatch(fetchFilterCategoryAsync());
  }, [dispatch, filter, sort]);

  UserAuthentication();
  const handleChangeId = (id) => {
    const CryptoJS = require("crypto-js");
    const secretKey = "your-secret-key";
    const encryptedString = CryptoJS.AES.encrypt(id, secretKey).toString();
    const modifiedEncryptedString = encryptedString.replace(/\//g, "_");
    const modifiedToOriginal = modifiedEncryptedString.replace(/_/g, "/");
    const bytes = CryptoJS.AES.decrypt(modifiedToOriginal, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return modifiedEncryptedString;
  };
  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : data.length > 0 ? (
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        <h3 className="sr-only">Categories</h3>
                        <ul
                          role="list"
                          className="px-2 py-3 font-medium text-gray-900"
                        >
                          {/* {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))} */}
                        </ul>

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="px-4 py-6 border-t border-gray-200"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="flow-root -mx-2 -my-3">
                                  <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="flex items-center ml-6">
                                      {open ? (
                                        <MinusIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="flex-1 min-w-0 ml-3 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Product grid */}
                  <div
                    className="w-full lg:col-span-6"
                    // style={{ marginLeft: "5rem" }}
                  >
                    <div className="flex flex-wrap justify-center">
                      {data?.map((items, index) => (
                        <>
                          <div className="flex flex-col justify-between">
                            <button
                              className="ml-auto mr-3"
                              style={{ fontSize: "15px" }}
                              onClick={() => handleClick(items.id)}
                            >
                              <FaTimes />
                            </button>
                            <Link
                              key={index}
                              to={`/store/productDetails/${handleChangeId(
                                items.id
                              )}`}
                              id={handleChangeId(items.id)}
                            >
                              <ProductCard
                                image={items.thumbnail}
                                brand={items.brand}
                                title={items.title}
                                discountedPrice={items.price}
                                price={items.price}
                                discountPercentage={items.discountPercentage}
                              />
                            </Link>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      ) : (
        <img src={img} className="wishListImage" />
      )}
    </>
  );
};

export default WishList;
