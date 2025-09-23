"use client"
import React, { useContext } from 'react'
import Marquee from "react-fast-marquee"
import  { cartContext } from '@/contexts/contextCart'

export default function SliderViewProduct() {
    const { imageProduct } = useContext(cartContext)




    return (
        <div className='w-full md:w-[50%] mx-auto'>
            <Marquee pauseOnHover={true} gradient={false} speed={70}>
                {imageProduct.map((src, i) => (
                    <div key={i} className="mx-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white/80 shadow-sm">
                            <img src={src} alt={`p-${i}`} className="object-cover" />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    )
}
