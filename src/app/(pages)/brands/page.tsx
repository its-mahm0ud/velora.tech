"use client";
import { IBrand } from '@/app/Interfaces';
import { ResponseBrand } from '@/app/Types'
import { LoadingComponent } from '@/Components';
import BrandCardComponent from '@/Components/BrandCardComponent';
import { apiServices } from '@/Services/ApisServices'
import React, { useEffect, useState } from 'react'

export default function BrandPage() {
    const [brands, setBrands] = useState<IBrand[]>([])
    const [loading, setLoading] = useState(true)
    async function getAllBrands() {
        const response: ResponseBrand = await apiServices.fetchBrands();
        setBrands(response.data);
        setLoading(false)

    }
    useEffect(() => {
        getAllBrands()

    }, [])
    if (loading) return <LoadingComponent />


    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Brands</h1>
                        <p className="text-muted-foreground">
                            Discover amazing brands from our collection
                        </p>
                    </div>
                </div>

                {/* Brand Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {brands.map((brand) => (
                        <div
                            key={brand._id}
                            className="group relative border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <BrandCardComponent brand={brand} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}
