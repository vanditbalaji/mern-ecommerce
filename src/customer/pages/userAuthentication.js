import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../auth/userSlice";
import {
  fetchAllProductsAsync,
  fetchAllUserProductsAsync,
} from "../product/productSlice";
import { fetchUserCartAsync } from "../cart/cartSlice";
import {
  fetchUserOrdersAsync,
  fetchUserProfileAsync,
} from "../user/usersSlice";
const UserAuthentication = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.loggedinUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginUser(storedUser));
      dispatch(fetchAllProductsAsync());
      dispatch(fetchUserProfileAsync(storedUser?.id));
      dispatch(fetchUserOrdersAsync(storedUser?.id));
      dispatch(fetchAllUserProductsAsync());
    }
    if (user) {
      dispatch(fetchAllProductsAsync());
      dispatch(fetchUserCartAsync(user?.id));
      dispatch(fetchUserProfileAsync(user?.id));
      dispatch(fetchAllUserProductsAsync());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCartAsync(user?.id));
    }
  }, [user]);
};

export default UserAuthentication;
