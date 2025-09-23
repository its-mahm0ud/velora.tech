"use client"
import { IProduct } from '@/app/Interfaces';
import { LoadingComponent } from '@/Components';
import ButtonsPageWishList from '@/Components/ButtonsPageWishList';
import { Button } from '@/Components/ui';
import { formatPrice, renderStars } from '@/Helpers';
import { apiServices } from '@/Services/ApisServices'
import {  PackageX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { cartContext } from '@/contexts/contextCart';

export default function Wishlist() {
 const {setWishListtCount}=useContext(cartContext)
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);

  async function getWishList() {
    const { data } = await apiServices.getAllProductToWishList();
    setData(data)
    setWishListtCount(data.length)
  }

  useEffect(() => {
    getWishList();
  },[])




  if (isLoadingPage) {
    return <LoadingComponent />
  }

  return (
    <div className="md:max-w-[80%] mx-auto mt-10 mb-10 space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">WishList</h1>
        <p className="text-muted-foreground">
          Save amazing products from our collection
        </p>
      </div>
      {data.length !== 0 ? <div>
        {data.map((product) => {
          return (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row  md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full max-sm:h-80   sm:w-50 h-48 sm:h-50 flex-shrink-0">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover rounded-md"
                  sizes="1000px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    <Link
                      href={`/products/${product._id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {product.title}

                    </Link>
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center flex-wrap gap-3 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {renderStars(product.ratingsAverage)}
                    <span>({product.ratingsQuantity})</span>
                  </div>
                  <span>{product.sold} sold</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
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
                  <div className='md:w-[25%]'>
                    <ButtonsPageWishList key={product._id} getWishList={getWishList}   product={product}    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div> :
        <div className='flex w-full flex-col items-center justify-center  md:ms-9 mx-auto  gap-4'>
          <div className="bg-gray-100 rounded-full p-6 shadow-sm">
            <PackageX className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-xl text-gray-700">Your WishList is empty.</p>
          <Button size="lg" className="text-lg px-8">
            <Link href={"/products"}>Fill Your WishList</Link>
          </Button>
        </div>
      }
    </div>

  )
}
