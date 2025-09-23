import React, { useContext } from 'react'

import { Loader2, ShoppingCart } from 'lucide-react';
import { Button } from '@/Components/ui';
import { handleAddToCart } from '@/Services/ApisServices';
import { cartContext } from '@/contexts/contextCart';


interface ButtonAddCartProps {
    addingLoading: boolean;
    ProductQuantity: number;
    size: "lg"| "sm";
    ProductId: string;
    setAddingLoading: (loading: boolean) => void;
}
export default function ButtonAddCart({ setAddingLoading, addingLoading, ProductQuantity, size, ProductId }: ButtonAddCartProps) {
    const { setCartCount } = useContext(cartContext);
    return (
        <Button
            size={size}
            className={size === "lg" ? "px-8 py-3 text-base flex-1 w-full " : "px-4 py-2 text-sm "}
            disabled={ProductQuantity === 0 || addingLoading}
            onClick={() => handleAddToCart(setAddingLoading, String(ProductId), setCartCount)}
        >
            {addingLoading && <Loader2 className="animate-spin" />}
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
        </Button>
    )
}
