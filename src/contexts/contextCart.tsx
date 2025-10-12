"use client";
import { apiServices } from "@/Services/ApisServices";
import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const cartContext = createContext<{
  cartId: string;
  imageProduct: string[];
  userId: string;
  wishListtCount: number;
  cartCount: number;
  OrdersCountCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  setWishListtCount: Dispatch<SetStateAction<number>>;
  loadingCartCount: boolean;
  loadingWishListCount: boolean;
  loadingOrdersCount: boolean;
}>({
  cartCount: 0,
  OrdersCountCount: 0,
  wishListtCount: 0,
  imageProduct: [],
  cartId: "",
  userId: "",
  loadingWishListCount: true,
  loadingOrdersCount: true,
  loadingCartCount: true,
  setCartCount: () => {},
  setWishListtCount: () => {},
});

export default function ContextCartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // {Cart Count}
  const [cartCount, setCartCount] = useState(0);
  const [loadingCartCount, setLoadingCartCount] = useState(true);
  // {Wish List Count}
  const [wishListtCount, setWishListtCount] = useState(0);
  const [loadingWishListCount, setLoadingWishListCount] = useState(true);
  // {Orders Count}
  const [OrdersCountCount, setOrdersCount] = useState(0);
  const [loadingOrdersCount, setLoadingOrdersCount] = useState(true);
  // {Cart Id}
  const [cartId, setCartId] = useState("");
  // {User Id}
  const [userId, setUserId] = useState("");
  // {Display animation Image}
  const [imageProduct, setImageProduct] = useState<string[]>([]);

  async function getUserId() {
    try {
      const res = await apiServices.getUserId();
      if (res?.decoded?.id) {
        setUserId(res.decoded.id);
      }
    } catch (error) {
      console.log("User not authenticated:", error);
    }
  }

  async function getUser() {
    try {
      const res = await apiServices.displayCartUser();
      setCartCount(res.numOfCartItems);
      setCartId(res.cartId);
    } catch (error) {
      console.log("Cart not available:", error);
    } finally {
      setLoadingCartCount(false);
    }
  }

  const getAllProductsSp = useCallback(async () => {
    try {
      const res = await apiServices.fetchProducts();
      const allProductImage = res.data;
      const allImage = allProductImage.flatMap((image) => image.images);
      setImageProduct(allImage);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOrdersCount = useCallback(async () => {
    try {
      const res = await apiServices.getUserOrders(userId);
      setOrdersCount(res.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOrdersCount(false);
    }
  }, [userId]);

  const getWishListCount = useCallback(async () => {
    try {
      const res = await apiServices.getAllProductToWishList();
      setWishListtCount(res.count);
    } catch (error) {
      console.log("Wishlist not available:", error);
    } finally {
      setLoadingWishListCount(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const fetchData = async () => {
        await Promise.all([getUser(), getUserId(), getWishListCount()]);
      };
      fetchData();
    } else if (status === "unauthenticated") {
      // Reset states when user logs out
      setCartCount(0);
      setWishListtCount(0);
      setOrdersCount(0);
      setCartId("");
      setUserId("");
      setLoadingCartCount(false);
      setLoadingWishListCount(false);
      setLoadingOrdersCount(false);
    }
  }, [status, session, getWishListCount]);

  // Fetch products for animation (this doesn't require auth)
  useEffect(() => {
    getAllProductsSp();
  }, [getAllProductsSp]);

  // Fetch orders when userId is available
  useEffect(() => {
    if (userId) {
      getOrdersCount();
    }
  }, [getOrdersCount, userId]);

  return (
    <cartContext.Provider
      value={{
        cartCount,
        setCartCount,
        loadingCartCount,
        cartId,
        userId,
        imageProduct,
        wishListtCount,
        setWishListtCount,
        loadingWishListCount,
        OrdersCountCount,
        loadingOrdersCount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
