"use client"
import { OrderSummary } from './OrderSummary';
import { ICartResponse } from '@/app/Interfaces';
import { useContext, useEffect, useState } from 'react';
import { apiServices } from '@/Services/ApisServices';

import Link from 'next/link'
import React from 'react'
import { Button } from '@/Components/ui'
import { Loader2, Minus, PackageX, Plus, Trash2 } from 'lucide-react'
import ButtonUpdateCountFromCart from './ButtonUpdateCountFromCart';
import { cartContext } from '@/contexts/contextCart';



interface InnerCartProps {
    responseData: ICartResponse;
}


export default function InnerCart({ responseData }: InnerCartProps) {
    const { setCartCount, cartCount } = useContext(cartContext);
    const [newResponseData, setNewResponseData] = useState<ICartResponse>(responseData)

    const [isClearingCart, setIsClearingCart] = useState<boolean>(false)

    useEffect(() => {
        setCartCount(newResponseData.numOfCartItems)
    }, [newResponseData])




    async function renderCartProducts() {
        const cartAfterClear = await apiServices.displayCartUser();
        setNewResponseData(cartAfterClear)
    }
    async function handleClearCart() {
        setIsClearingCart(true)
        const clearCart = await apiServices.ClearCartUser();
        renderCartProducts();
        setIsClearingCart(false)
    }





    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                {newResponseData.numOfCartItems !== 0 && (
                    <p className="text-muted-foreground">
                        {newResponseData.numOfCartItems} item
                        {newResponseData.numOfCartItems !== 1 ? "s" : ""} in your cart
                    </p>
                )}
            </div>

            {newResponseData.numOfCartItems == 0 ? (
                <div className="flex w-full flex-col items-center justify-center md:ms-9 mx-auto gap-4">
                    <div className="bg-muted rounded-full p-6 shadow-sm">
                        <PackageX className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <p className="text-xl text-foreground">Your cart is empty.</p>
                    <Button size="lg" className="text-lg px-8">
                        <Link href={"/products"}>Fill Your Cart</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {newResponseData.data.products.map((product) => (
                                <ButtonUpdateCountFromCart
                                    setNewResponseData={setNewResponseData}
                                    key={product._id}
                                    product={product}
                                    renderCartProducts={renderCartProducts}
                                />
                            ))}
                        </div>
                        {/* Clear Cart */}
                        {newResponseData.numOfCartItems !== 0 && (
                            <div className="mt-6">
                                <Button onClick={handleClearCart} variant="outline">
                                    {isClearingCart ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                    )}
                                    Clear Cart
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    {newResponseData.numOfCartItems !== 0 && (
                        <div className="lg:col-span-1">
                            <OrderSummary
                                numOfCartItems={newResponseData.numOfCartItems}
                                totalCartPrice={newResponseData.data.totalCartPrice}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
