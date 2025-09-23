import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "./ui";
import { formatPrice, renderStars } from "@/Helpers";
import ButtonAddCart from "./ButtonAddCart";
import { handleAddToWishList } from "@/Services/ApisServices";
import { IProduct } from '@/app/Interfaces';
interface ListOfViewModeProps {
    product: IProduct
    isAlreadyInWishList: boolean
    addingLoading: boolean
    setIsAlreadyInWishList: (v: boolean) => void
    setAddingLoading: (v: boolean) => void
    setWishListtCount: (v: number) => void
}

export default function ListOfViewMode({ setWishListtCount,product, isAlreadyInWishList, setIsAlreadyInWishList, setAddingLoading, addingLoading }: ListOfViewModeProps) {
    return (
        <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="128px"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">

                        {/* {Title} */}
                        <h3 className="hover:text-primary transition-colors">
                            <Link href={'/products/' + product._id}>{product.title}</Link>
                        </h3>
                    </h3>
                    <Button className="" onClick={() => handleAddToWishList(product._id, setIsAlreadyInWishList,setWishListtCount)} variant="ghost" size="sm">
                        <Heart className={`h-4 w-4 ${isAlreadyInWishList ? "fill-black" : ""}`} />
                    </Button>

                </div>
                {/* {description} */}

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                        {renderStars(product.ratingsAverage)}
                        <span className="text-sm text-muted-foreground ml-1">
                            ({product.ratingsQuantity})
                        </span>
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {product.sold} sold
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.price)}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                                Brand:{" "}
                                <Link
                                    href={``}
                                    className="hover:text-primary hover:underline transition-colors"
                                >
                                    {product.brand?.name}
                                </Link>
                            </span>
                            <span>
                                Category:{" "}
                                <Link
                                    href={``}
                                    className="hover:text-primary hover:underline transition-colors"
                                >
                                    {product.category?.name}
                                </Link>
                            </span>
                        </div>
                    </div>
                    <ButtonAddCart size={"sm"} ProductId={product._id} setAddingLoading={setAddingLoading} addingLoading={addingLoading} ProductQuantity={product.quantity} />
                </div>
            </div>
        </div>
    )
}
