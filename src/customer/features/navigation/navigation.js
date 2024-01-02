import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/pst.jpeg";
import { useSelector } from "react-redux";
import SearchModal from "../../pages/searchModal";
import HeartIcons from "../../pages/heart";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/store",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "/store",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "/store" },
            { name: "Dresses", href: "/store" },
            { name: "Pants", href: "/store" },
            { name: "Denim", href: "/store" },
            { name: "Sweaters", href: "/store" },
            { name: "T-Shirts", href: "/store" },
            { name: "Jackets", href: "/store" },
            { name: "Activewear", href: "/store" },
            { name: "Browse All", href: "/store" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "/store" },
            { name: "Wallets", href: "/store" },
            { name: "Bags", href: "/store" },
            { name: "Sunglasses", href: "/store" },
            { name: "Hats", href: "/store" },
            { name: "Belts", href: "/store" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "/store" },
            { name: "My Way", href: "/store" },
            { name: "Re-Arranged", href: "/store" },
            { name: "Counterfeit", href: "/store" },
            { name: "Significant Other", href: "/store" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/stor/store",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "/store",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "/store" },
            { name: "Pants", href: "/store" },
            { name: "Sweaters", href: "/store" },
            { name: "T-Shirts", href: "/store" },
            { name: "Jackets", href: "/store" },
            { name: "Activewear", href: "/store" },
            { name: "Browse All", href: "/store" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "/store" },
            { name: "Wallets", href: "/store" },
            { name: "Bags", href: "/store" },
            { name: "Sunglasses", href: "/store" },
            { name: "Hats", href: "/store" },
            { name: "Belts", href: "/store" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "/store" },
            { name: "Counterfeit", href: "/store" },
            { name: "Full Nelson", href: "/store" },
            { name: "My Way", href: "/store" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "/store" },
  ],
};

const avatarStyle = {
  height: "35px",
  width: "35px",
  borderRadius: "50%",
  backgroundColor: "rgb(74, 72, 68)",
  color: "rgb(177, 159, 159)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "25px",
  cursor: "pointer",
  textShadow: "none",
  fontWeight: "bold",
};

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "My Orders", href: "/order" },
  { name: "Sign out", href: "/logout" },
  { name: "Chat", href: "/chat" },
];

const adminNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Admin Panel", href: "/admin" },
  { name: "Admin Order Panel", href: "/adminOrder" },
  { name: "Sign out", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user?.loggedinUser);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/wishList");
  };
  const handleStore = (e) => {
    e.preventDefault();
    navigate("/store");
  };
  useEffect(() => {
    if (user) {
      setName(user?.email?.[0]?.toUpperCase() || "");
    }
  }, [user]);

  const handleSearch = () => {
    setModalOpen(true);
  };
  const cartItems = useSelector((state) => state.cart?.items);
  const modalClose = () => {
    setModalOpen(false);
  };
  return (
    <div className="relative z-50 bg-white">
      <SearchModal
        isOpen={modalOpen}
        onRequestClose={modalClose}
        onSubmit={setInputValue}
      />
      {/* Mobile menu */}
      {user && user.role !== "admin" && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
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
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="flex px-4 -mb-px space-x-8">
                        {navigation?.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="px-4 pt-10 pb-8 space-y-10"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="relative text-sm group"
                              >
                                <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <Link
                                  to={item.href}
                                  className="block mt-6 font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="flex flex-col mt-6 space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      to={item.href}
                                      className="block p-2 -m-2 text-gray-500"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link
                          to={page.href}
                          className="block p-2 -m-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    <div className="flow-root">
                      <Link
                        to="/login"
                        className="block p-2 -m-2 font-medium text-gray-900 cursor-pointer"
                        // onClick={openModal}
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        to="/signup"
                        // onClick={openModal1}
                        className="block p-2 -m-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}

      <header className="relative bg-white">
        {user && user.role !== "admin" && (
          <p className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-stone-800 sm:px-6 lg:px-8">
            Get free delivery on orders over ₹599
          </p>
        )}
        <nav
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16">
              <button
                type="button"
                className="relative p-2 text-gray-400 bg-white rounded-md lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-14 8 w-" src={image} alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              {user && user.role !== "admin" && (
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 bg-white shadow top-1/2"
                                  aria-hidden="true"
                                />

                                <div className="relative bg-white">
                                  <div className="px-8 mx-auto max-w-7xl">
                                    <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                      <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="relative text-base group sm:text-sm"
                                          >
                                            <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <Link
                                              to={item.href}
                                              className="block mt-6 font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </Link>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-medium text-gray-900"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <Link
                                                    to={item.href}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {item.name}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <div
                        onClick={handleStore}
                        key={page.name}
                        className="flex items-center font-medium text-gray-700 cursor-pointer cutext-sm hover:text-gray-800"
                      >
                        {page.name}
                      </div>
                    ))}
                  </div>
                </Popover.Group>
              )}

              <div className="flex items-center ml-auto">
                {!user?.email && (
                  <div className="hidden ml-5 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}

                {/* Search */}
                {user?.email && (
                  <div className="flex lg:ml-6">
                    <Link
                      to="#"
                      onClick={handleSearch}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                )}
                {/* Heart */}
                {user?.email && (
                  <div className="ml-4">
                    <Link
                      to="/wishList"
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      {/* <HeartIcon className="w-6 h-6 ml-4" aria-hidden="true" /> */}
                      <HeartIcons
                        filled
                        width="24"
                        height="24"
                        color="#A65959"
                        onClick={() => {
                          handleClick();
                        }}
                      />
                    </Link>
                  </div>
                )}
                {/* Cart */}
                {user?.email && user && user.role !== "admin" && (
                  <div className="flow-root ml-4 lg:ml-6">
                    <Link
                      to="/cart"
                      className="flex items-center p-2 -m-2 group"
                    >
                      <ShoppingBagIcon
                        className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cartItems?.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>
                )}

                {/* //user Profile? */}
                {user?.email && user?.role === "user" && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex items-center max-w-xs bg-gray-800 rounded-full tl-2ext-sm m focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="avtar" style={avatarStyle}>
                          {name}
                        </div>
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
                      {user?.role === "user" && (
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                )}
                {/* admin profile */}
                {user?.email && user?.role === "admin" && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex items-center max-w-xs bg-gray-800 rounded-full tl-2ext-sm m focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="avtar" style={avatarStyle}>
                          {name}
                        </div>
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
                      {user?.role === "admin" && (
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {adminNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
