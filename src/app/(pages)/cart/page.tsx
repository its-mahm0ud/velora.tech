


import InnerCart from '@/Components/InnerCart'
import { apiServices } from '@/Services/ApisServices'


import React from 'react'
export default async function CartProducts() {
    
    // {Function to get cart data}
    async function displayAllCart() {
        return await apiServices.displayCartUser();
    }

    // {Call the function to get cart data}
    const response = await displayAllCart();
    


    return (
        <div className="container mx-auto px-4 py-8">
            <InnerCart responseData={response} />
        </div>
    )
}
