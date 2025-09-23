"use client";
import { useState, useEffect, use, useContext } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {  Heart, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { LoadingComponent } from "@/Components";
import { Button } from "@/Components/ui";
import { formatPrice, renderStars } from "@/Helpers";
import { SingleResponseProduct } from "@/app/Types";
import {  IProduct } from "@/app/Interfaces";
import { apiServices, handleAddToWishList } from "@/Services/ApisServices";
import ButtonAddCart from "@/Components/ButtonAddCart";
import { cartContext } from "@/contexts/contextCart";

export default function ProductDetails() {
  const { id } = useParams();
  const {setWishListtCount}=useContext(cartContext)

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
    const [addingLoading, setAddingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedImageCover, setSelectedImageCover] = useState(product?.imageCover);
   const [isAlreadyInWishList, setIsAlreadyInWishList] = useState(false)
  async function fetchSingleProduct() {
    setLoading(true);
    const response: SingleResponseProduct = await apiServices.fetchSingleProduct(String(id));
    setLoading(false);
    setProduct(response.data);
  }
  useEffect(() => {
    fetchSingleProduct();
  }, [])



  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingComponent />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={selectedImageCover || product.imageCover}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  onClick={() => { setSelectedImage(index); setSelectedImageCover(image) }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage === index
                    ? "border-primary"
                    : "border-gray-200"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            <Link
              href={`/products/brand`}
              className="hover:text-primary hover:underline transition-colors"
            >
              {product.brand.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-sm text-muted-foreground">{"1500"} sold</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={``}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
            >
              {"categoryName"}
            </Link>
            {product.subcategory.map((sub) => (
              <span
                key={sub._id}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              >
                {sub.name}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Stock:</span>
            <span
              className={`text-sm ${product.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {product.quantity > 0
                ? `${product.quantity} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <ButtonAddCart size={"lg"} setAddingLoading={setAddingLoading} ProductId={product._id} addingLoading={addingLoading} ProductQuantity={product.quantity} />
            <Button  onClick={() => handleAddToWishList(product._id,setIsAlreadyInWishList,setWishListtCount)}  variant="outline" size="lg">
              <Heart className={`h-5 w-5 ${isAlreadyInWishList? " fill-black":""}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  100% secure checkout
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
