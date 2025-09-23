"use client"
import { store } from '@/redux/store'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import AOS from "aos"
import "aos/dist/aos.css"


export default function ProviderRedux({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        AOS.init({
            easing: "ease-in-out",
            once: true,
        })
    }, [])
    return (
        <div className=' overflow-x-hidden'>
    
                <Provider store={store}>{children}</Provider>
         


        </div>
    )
}
