"use client"
import { ICategory } from '@/app/Interfaces';
import { ResponseCategory } from '@/app/Types';
import { LoadingComponent } from '@/Components';
import CategoryCardComponent from '@/Components/CategoryCardComponent';
import { apiServices } from '@/Services/ApisServices';
import React, { useEffect, useState } from 'react'

export default function CategoriesPage() {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState(true)
    async function getAllcategories() {
        const response: ResponseCategory = await apiServices.fetchCategories();
        setCategories(response.data);
        setLoading(false)

    }
    useEffect(() => {
        getAllcategories()

    }, [])
    if (loading) return <LoadingComponent />
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Categories</h1>
                        <p className="text-muted-foreground">
                            Discover amazing Categories from our collection
                        </p>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {categories.map((category) => (
                        <CategoryCardComponent key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </div>

    )
}
