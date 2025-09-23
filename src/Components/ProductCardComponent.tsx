"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "./ui";
import { IProduct } from "@/app/Interfaces";
import { formatPrice, renderStars } from "@/Helpers";
import { useContext, useState } from "react";
import ButtonAddCart from "./ButtonAddCart";
import { handleAddToWishList } from "@/Services/ApisServices";
import ListOfViewMode from "./ListOfViewMode";
import { cartContext } from "@/contexts/contextCart";




interface ProductCardProps {
    product: IProduct;
    viewMode?: "grid" | "list";
}



export default function ProductCardComponent({ product, viewMode = "grid" }: ProductCardProps) {
    const [isAlreadyInWishList, setIsAlreadyInWishList] = useState(false)
    const { setWishListtCount } = useContext(cartContext);


    const [addingLoading, setAddingLoading] = useState(false);



    if (viewMode === "list") {
        return (
            <ListOfViewMode setWishListtCount={setWishListtCount} addingLoading={addingLoading} setAddingLoading={setAddingLoading} isAlreadyInWishList={isAlreadyInWishList} setIsAlreadyInWishList={setIsAlreadyInWishList} product={product} />
        );
    }

    return (
        <div className=" group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Wishlist Button */}
                <Button
                    onClick={() =>
                        handleAddToWishList(product._id, setIsAlreadyInWishList,setWishListtCount)
                    }
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 md:opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 hover:bg-accent"
                >
                    <Heart
                        className={`h-4 w-4 ${isAlreadyInWishList
                            ? "fill-foreground"
                            : "fill-background"
                            }`}
                    />
                </Button>

                {/* Badge for sold items */}
                {product.sold > 100 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Popular
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 ">
                {/* Brand */}
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    <Link
                        href={""}
                        className="hover:text-primary hover:underline transition-colors"
                    >
                        {product.brand.name}
                    </Link>
                </p>

                {/* Title */}
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
                    <Link href={"/products/" + product._id}>{product.title}</Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex">{renderStars(product.ratingsAverage)}</div>
                </div>

                {/* Category */}
                <p className="text-xs text-muted-foreground mb-2">
                    <Link
                        href={``}
                        className="hover:text-primary hover:underline transition-colors"
                    >
                        {product.category.name}
                    </Link>
                </p>

                {/* Price */}

                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">{1500} sold</span>
                </div>

                {/* Add to Cart Button */}
                <ButtonAddCart
                    size={"lg"}
                    ProductId={product._id}
                    setAddingLoading={setAddingLoading}
                    addingLoading={addingLoading}
                    ProductQuantity={product.quantity}
                />

            </div>
        </div>
    )
}



























    // <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
            //     <div className="relative w-32 h-32 flex-shrink-0">
            //         <Image
            //             src={product.imageCover}
            //             alt={product.title}
            //             fill
            //             className="object-cover rounded-md"
            //             sizes="128px"
            //         />
            //     </div>

            //     <div className="flex-1 min-w-0">
            //         <div className="flex justify-between items-start mb-2">
            //             <h3 className="font-semibold text-lg line-clamp-2">

            //                 {/* {Title} */}
            //                 <h3 className="hover:text-primary transition-colors">
            //                     <Link href={'/products/' + product._id}>{product.title}</Link>
            //                 </h3>
            //             </h3>
            //             <Button className="" onClick={() => handleAddToWishList(product._id,setIsAlreadyInWishList)} variant="ghost" size="sm">
            //                 <Heart className={`h-4 w-4 ${isAlreadyInWishList ? "fill-black" : ""}`} />
            //             </Button>

            //         </div>
            //         {/* {description} */}

            //         <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            //             {product.description}
            //         </p>

            //         <div className="flex items-center gap-4 mb-3">
            //             <div className="flex items-center gap-1">
            //                 {renderStars(product.ratingsAverage)}
            //                 <span className="text-sm text-muted-foreground ml-1">
            //                     ({product.ratingsQuantity})
            //                 </span>
            //             </div>

            //             <span className="text-sm text-muted-foreground">
            //                 {product.sold} sold
            //             </span>
            //         </div>

            //         <div className="flex items-center justify-between">
            //             <div className="flex flex-col gap-1">
            //                 <span className="text-2xl font-bold text-primary">
            //                     {formatPrice(product.price)}
            //                 </span>
            //                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
            //                     <span>
            //                         Brand:{" "}
            //                         <Link
            //                             href={``}
            //                             className="hover:text-primary hover:underline transition-colors"
            //                         >
            //                             {product.brand.name}
            //                         </Link>
            //                     </span>
            //                     <span>
            //                         Category:{" "}
            //                         <Link
            //                             href={``}
            //                             className="hover:text-primary hover:underline transition-colors"
            //                         >
            //                             {product.category.name}
            //                         </Link>
            //                     </span>
            //                 </div>
            //             </div>
            //             <ButtonAddCart size={"sm"} ProductId={product._id} setAddingLoading={setAddingLoading} addingLoading={addingLoading} ProductQuantity={product.quantity} />
            //         </div>
            //     </div>
            // </div>