import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductCard from "./productCard";
import "./product.css";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import img from "../../assets/empty.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllFilterProductsAsync } from "../productSlice";
import UserAuthentication from "../../pages/userAuthentication";
import LoadingCircle from "../../features/loading/loadingCircle";

const sortOptions = [
  {
    name: "Price: Low to High",
    href: "#",
    sort: "price",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    href: "#",
    sort: "price",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const data = useSelector((state) => state.product.products);
  const productsData = useSelector((state) => state.product.userProducts);
  const brands = Array.from(
    new Set(productsData.map((product) => product.brand))
  );
  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );
  const colors = Array.from(
    new Set(productsData.map((product) => product.color))
  );
  const filters = [
    {
      id: "color",
      name: "Color",
      options: colors,
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

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    gender: [],
    brand: [],
    categories: [],
  });

  const handleFilterChange = (sectionId, option) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [sectionId]: option.checked
        ? [...prevFilters[sectionId], option.value]
        : prevFilters[sectionId].filter((item) => item !== option.value),
    }));
  };

  const handleSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };

  useEffect(() => {
    dispatch(fetchAllFilterProductsAsync({ filter: selectedFilters, sort }));
  }, [dispatch, sort, selectedFilters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  UserAuthentication();

  const handleChangeId = (id) => {
    const CryptoJS = require("crypto-js");
    const secretKey = "your-secret-key";
    const encryptedString = CryptoJS.AES.encrypt(id, secretKey).toString();
    const modifiedEncryptedString = encryptedString.replace(/\//g, "_");
    return modifiedEncryptedString;
  };

  const handleClick = () => {
    dispatch("/");
  };

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
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
                    <Dialog.Panel
                      className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl "
                      style={{ top: "105px" }}
                    >
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
                        ></ul>

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section?.id}
                            className="px-4 py-6 border-t border-gray-200"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="flow-root -mx-2 -my-3">
                                  <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section?.name}
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
                                    {section?.options?.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option?.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section?.id}-${optionIdx}`}
                                            name={`${section?.id}[]`}
                                            defaultValue={option?.value}
                                            type="checkbox"
                                            onChange={(e) =>
                                              handleFilterChange(section.id, {
                                                checked: e.target.checked,
                                                value: option,
                                              })
                                            }
                                            defaultChecked={option?.checked}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section?.id}-${optionIdx}`}
                                            className="flex-1 min-w-0 ml-3 text-gray-500"
                                          >
                                            {option}
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
              <div className="flex items-baseline justify-between pt-4 pb-6 border-b border-gray-200">
                <h1 className="ml-1 text-4xl font-bold tracking-tight text-gray-900">
                  Store
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  onClick={(e) => handleSort(option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    onClick={() => handleClick}
                    className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="py-6 border-b border-gray-200"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flow-root -my-3">
                              <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
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
                              <div className="space-y-4">
                                {section.options?.map((option, optionIdx) => (
                                  <div
                                    key={optionIdx}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleFilterChange(section.id, {
                                          checked: e.target.checked,
                                          value: option,
                                        })
                                      }
                                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="w-full col-span-6 lg:col-span-3">
                    <div className="flex flex-wrap justify-center">
                      {paginatedData?.map && paginatedData.length > 0 ? (
                        paginatedData.map((items, index) => (
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
                        ))
                      ) : (
                        <>
                          <img
                            src={img}
                            style={{ marginLeft: "0%", marginTop: "5%" }}
                          />
                        </>
                      )}
                    </div>
                    <div class="buttons">
                      <div>
                        {currentPage > 1 && (
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-2 font-medium text-gray-700 bg-white border rounded"
                          >
                            Previous
                          </button>
                        )}
                        {paginatedData.length > 9 && (
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                              currentPage ===
                              Math.ceil(data.length / itemsPerPage)
                            }
                            className="px-4 py-2 mx-2 font-medium text-gray-700 bg-white border rounded"
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-center mt-6">
                    {/* Display "Previous" button */}

                    {Array.from({
                      length: Math.ceil(data.length / itemsPerPage),
                    }).map((page) => {
                      const pageNumber = page + 1;
                      const shouldDisplay =
                        currentPage === pageNumber ||
                        Math.abs(currentPage - pageNumber) <= 2 ||
                        pageNumber === 1 ||
                        pageNumber === Math.ceil(data.length / itemsPerPage);

                      return shouldDisplay ? (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={classNames(
                            "px-4 py-2 mx-2 font-medium text-gray-700 bg-white border rounded",
                            currentPage === pageNumber
                              ? "bg-gray-200 border-gray-400"
                              : ""
                          )}
                        >
                          {pageNumber}
                        </button>
                      ) : null;
                    })}

                    {/* Display "Next" button */}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
