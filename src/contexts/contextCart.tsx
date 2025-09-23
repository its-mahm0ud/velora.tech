"use client"
import { apiServices } from '@/Services/ApisServices';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'


export const cartContext = createContext<{
    cartId: string,
    imageProduct: string[],
    userId: string,
    wishListtCount: number,
    cartCount: number,
    OrdersCountCount: number,
    setCartCount: Dispatch<SetStateAction<number>>,
    setWishListtCount: Dispatch<SetStateAction<number>>,
    loadingCartCount: boolean,
    loadingWishListCount: boolean,
    loadingOrdersCount: boolean,
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
    setCartCount: () => { },
    setWishListtCount: () => { }
});

export default function ContextCartProvider({ children }: { children: ReactNode }) {

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

    async function getWishListCount() {
        setLoadingWishListCount(true)
        const res = await apiServices.getAllProductToWishList();
        setWishListtCount(res.count)
        setLoadingWishListCount(false)
    }
    async function getOrdersCount() {
        setLoadingOrdersCount(true)
        const res = await apiServices.getUserOrders(userId)
        setOrdersCount(res.length);
        setLoadingOrdersCount(false)
    }

    async function getAllProductsSp() {
        const res = await apiServices.fetchProducts()
        const allProductImage = res.data;
        const allImage = allProductImage.flatMap(image => image.images);
        setImageProduct(allImage)

    }

    async function getUserId() {
        const res = await apiServices.getUserId();
        setUserId(res.decoded.id)
    }
    async function getUser() {
        setLoadingCartCount(true)
        const res = await apiServices.displayCartUser();
        setCartCount(res.numOfCartItems);
        setCartId(res.cartId)


        setLoadingCartCount(false)
    }
    useEffect(() => {
        getUser();
        getUserId();
        getAllProductsSp()
        getWishListCount()

    }, [])
    useEffect(() => {
        getOrdersCount()
    }, [userId])




    return (<cartContext.Provider value={{
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
        loadingOrdersCount
    }}>
        {children}
    </cartContext.Provider>

    )
}
