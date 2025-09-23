"use client"
import React, { useContext, useState } from 'react'
import { formatPrice } from '@/Helpers'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { ICartResponse, ICartResponseProduct } from '@/app/Interfaces'
import { apiServices } from '@/Services/ApisServices'
interface CartProductProps {
    product: ICartResponseProduct
    renderCartProducts: () => Promise<void>
    setNewResponseData: React.Dispatch<React.SetStateAction<ICartResponse>>,
}
export default function ButtonUpdateCountFromCart({ product, renderCartProducts, setNewResponseData }: CartProductProps) {


    const [count, setCount] = useState(product.count)
    const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>()
    const [isRemovingProduct, setIsRemovingProduct] = useState<boolean>(false)
    async function handleUpdateCountProduct(productId: string, count: number) {
        setCount(count)
        clearTimeout(timeOutId)
        const id = setTimeout(() => {
            const res = apiServices.UpdateProductFromCartUser(productId, count)
            renderCartProducts();
        }, 5000);
        setTimeOutId(id)

    }

    async function handleRemoveProductFromCart(productId: string) {
        setIsRemovingProduct(true)
        const res = await apiServices.RemoveProductFromCartUser(productId)
        setNewResponseData(res)
        setIsRemovingProduct(false)
    }
    return (
        <div className="flex gap-4 p-4 border rounded-lg">
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                    src={product.product.imageCover}
                    alt={product.product.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="80px"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-2">
                    <Link
                        href={`/products/${product.product._id}`}
                        className="hover:text-primary transition-colors"
                    >
                        {product.product.title}
                    </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                    {product.product.brand?.name}
                </p>
                <p className="font-semibold text-primary mt-2">
                    {formatPrice(product.price)}
                </p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Button onClick={() => handleRemoveProductFromCart(product.product._id)} variant="ghost" size="sm">
                    {isRemovingProduct ? <Loader2 className=' animate-spin' /> : <Trash2 className="h-4 w-4" />}
                </Button>

                <div className="flex items-center gap-2">
                    <Button onClick={() => handleUpdateCountProduct(product.product._id, count - 1)} variant="outline" size="sm">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{count}</span>
                    <Button onClick={() => handleUpdateCountProduct(product.product._id, count + 1)} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

            </div>
        </div>
    )
}
