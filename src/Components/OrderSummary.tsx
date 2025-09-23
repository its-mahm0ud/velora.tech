
import { formatPrice } from '@/Helpers'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/Components/ui'

interface OrderSummaryProps {
    numOfCartItems: number;
    totalCartPrice: number;
}
export function OrderSummary({ numOfCartItems, totalCartPrice }: OrderSummaryProps) {
    return (

        <div className="border rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span>Subtotal ({numOfCartItems} items)</span>
                    <span>{formatPrice(totalCartPrice)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(totalCartPrice)}</span>
            </div>

            <Button className="w-full mb-2" size="lg">
                <Link href={"/detailsForCheckOut"}>Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
        </div>

    )
}
