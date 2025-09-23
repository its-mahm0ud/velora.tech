import React, { Dispatch, SetStateAction, useState } from 'react'
import ButtonAddCart from './ButtonAddCart'
import { Button } from './ui'
import { Loader2 } from 'lucide-react'
import { apiServices } from '@/Services/ApisServices'
import toast from 'react-hot-toast'
import { IProduct } from '@/app/Interfaces'
interface ButtonsPageWishListProps {
    product: IProduct,
    getWishList: () => void
}

export default function ButtonsPageWishList({ getWishList, product }: ButtonsPageWishListProps) {
    const [isRemoving, setIsRemoving] = useState(false);
      const [addingLoadingFromWishList, setAddingLoadingFromWishList] = useState(false);
    async function handleRemoveFromWishList(productId: string) {
        setIsRemoving(true)
        const respo = await apiServices.RemoveProductFromWishList(productId)
        if (respo.status === 'success') {
            toast.success(respo.message)
            getWishList();
            setIsRemoving(false)
        }


    }
    return (<div className='flex  w-full px-2 flex-col gap-4'>
        <ButtonAddCart
            key={product._id}
            size="sm"
            ProductId={product._id}
            setAddingLoading={setAddingLoadingFromWishList}
            addingLoading={addingLoadingFromWishList}
            ProductQuantity={product.quantity}
        />
        <Button className='w-full' onClick={() => handleRemoveFromWishList(product._id)} variant={'destructive'}>
            {isRemoving ? <Loader2 className=' animate-spin w-10 h-10' /> : ""} Remove From WishList
        </Button>
    </div>
    )
}
