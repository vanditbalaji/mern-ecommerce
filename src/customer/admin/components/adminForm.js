import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsAsync,
  fetchByIdAsync,
  resetById,
  updateProductAsync,
} from "../../product/productSlice";
import { useLocation, useNavigate } from "react-router";
import UserAuthentication from "../../pages/userAuthentication";

const AdminForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const currentURL = window.location.href;

  UserAuthentication();

  const location = useLocation();
  const dispatch = useDispatch();

  const id = location.state;

  const handleReset = () => {
    reset();
  };
  const selectedProduct = useSelector((state) => state.product?.byid);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetById());
    if (id) {
      dispatch(fetchByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(resetById());
    if (selectedProduct) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("small", selectedProduct.size.s);
      setValue("medium", selectedProduct.size.m);
      setValue("large", selectedProduct.size.l);
    }
  }, [selectedProduct]);

  const onSubmit = (form) => {
    reset();
    const data = { ...form };
    data.images = [data.image1, data.image2, data.thumbnail];
    data.rating = 0;
    delete data["image1"];
    delete data["image2"];
    const size = { s: data.small, m: data.medium, l: data.large };
    data.size = size;
    delete data["small"];
    delete data["medium"];
    delete data["large"];
    if (id) {
      dispatch(updateProductAsync({ ...data, id: id }));
    } else {
      dispatch(addProductsAsync(data));
    }
    dispatch(resetById());
    reset();
    navigate("/admin");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div class="space-y-12 m-9">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              {currentURL === "https://pststore.netlify.app/admin/adminForm"
                ? "Add New Product"
                : "Edit Your Item"}
            </h2>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    {...register("title", { required: "Title is Required" })}
                    type="text"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  ></input>
                </div>
              </div>
              <div class="sm:col-span-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    {...register("description", {
                      required: "description is Required",
                    })}
                    type="text"
                    class=" pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <input
                  type="text"
                  {...register("brand", {
                    required: "thumbnail is Required",
                  })}
                  id="city"
                  class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <input
                  type="text"
                  {...register("category", {
                    required: "thumbnail is Required",
                  })}
                  id="city"
                  class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>

              <div class="sm:col-span-2 sm:col-start-1">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    {...register("price", { required: "price is Required" })}
                    id="city"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="region"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount %
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "discountPercentage is Required",
                    })}
                    id="region"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div class="sm:col-span-2 sm:col-start-1">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail Image
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is Required",
                    })}
                    id="city"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
              {/* Quantity */}
              <div class="sm:col-span-2 sm:col-start-1">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  S Size Quantity
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    {...register("small", {
                      required: "price is Required",
                    })}
                    id="small size"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  M Size Quantity
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    {...register("medium", {
                      required: "price is Required",
                    })}
                    id="medium size"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="city"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  L Size Quantity
                </label>
                <div class="mt-2">
                  <input
                    type="number"
                    {...register("large", {
                      required: "price is Required",
                    })}
                    id="large size"
                    class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={handleReset}
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            class="rounded-md bg-stone-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {currentURL === "https://pststore.netlify.app/admin/adminForm"
              ? "Add Item"
              : "Edit Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
