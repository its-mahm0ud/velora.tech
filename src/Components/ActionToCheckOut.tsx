"use client"
import React, { useContext, useState } from 'react'
import { Button } from './ui'

import { apiServices } from '@/Services/ApisServices';
import { cartContext } from '@/contexts/contextCart';
import { Loader2 } from 'lucide-react';
import toast from "react-hot-toast";
interface ActionToCheckOutProps {
    isCheckingOut: boolean
    address: string
    phone: string
    city: string

}
export default function ActionToCheckOut({ isCheckingOut, address, phone, city }: ActionToCheckOutProps) {
    const [isPayingCash, setIsPayingCash] = useState(false)
    const [isPayingVisa, setIsPayingVisa] = useState(false)
    const isLoading = isPayingCash || isPayingVisa;
    const { cartId } = useContext(cartContext)
    async function handleCheckOutVisa() {
        setIsPayingVisa(true)
        const fRes = await apiServices.checkOutByVisa(cartId, address, phone, city);
        if (fRes.status === 'success') {
            location.href = fRes.session.url;
            setIsPayingVisa(false)
        }else{
            setIsPayingVisa(false)
            toast.error("You Do Something Wrong")
            setTimeout(() => {
                location.href="/cart"
            }, 500);
        }
    }
    async function handleCheckOutCash() {
        setIsPayingCash(true)
        const sRes = await apiServices.checkOutByCash(cartId, address, phone, city);
        if (sRes.status === 'success') {
            location.href = "/allorders"
            setIsPayingCash(false)
        }else{
            setIsPayingCash(false)
            toast.error("You Do Something Wrong")
             setTimeout(() => {
                location.href="/cart"
            }, 500);
        }
    }




    return (
        <div className={`flex flex-col gap-2 ${isCheckingOut ? " opacity-100" : " opacity-0"}`}>
            <Button disabled={isLoading} type='button' onClick={handleCheckOutCash} data-aos="zoom-in" data-aos-duration="500" className="w-full bg-[#4CAF50] hover:bg-[#45A049]" size="lg">
                {isPayingCash ? <Loader2 className=' animate-spin' /> : ""} Pay Cash?
            </Button>
            <Button disabled={isLoading} type='button' onClick={handleCheckOutVisa} data-aos="zoom-in" data-aos-duration="500" className="w-full bg-[#2196F3] hover:bg-[#1976D2]" size="lg">
                {isPayingVisa ? <Loader2 className=' animate-spin' /> : ""}Pay Visa?
            </Button>
        </div>

    )
}
