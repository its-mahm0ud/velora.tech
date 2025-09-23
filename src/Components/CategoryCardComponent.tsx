import { ICategory } from '@/app/Interfaces';
import Image from 'next/image'
import React from 'react'
import { Button } from './ui';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface categoryCardProps {
    category: ICategory;
}

export default function CategoryCardComponent({ category }: categoryCardProps) {
    return (
        <div className="group relative border rounded-lg bg-card text-card-foreground overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Category Image */}
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                >
                    <Heart className="h-4 w-4" />
                </Button>
            </div>

            {/* Category Info */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <Link href={'/products/' + category._id}>{category.name}</Link>
                </h3>
            </div>
        </div>

    )
}
