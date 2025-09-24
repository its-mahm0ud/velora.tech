"use client"
import { IUserOrder } from '@/app/Interfaces/AllOrdersUser'
import { LoadingComponent } from '@/Components'
import { Button } from '@/Components/ui'
import { cartContext } from '@/contexts/contextCart'
import { apiServices } from '@/Services/ApisServices'
import { PackageX } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function AccountUser() {
  const [usersOrders, setUsersOrders] = useState<IUserOrder>([])
  const [isOrdersLoading, setIsOrdersLoading] = useState(false)
  const { userId } = useContext(cartContext)
  async function getAllOrders() {
    setIsOrdersLoading(true)
    const allResposne = await apiServices.getUserOrders(userId)
    if (Array.isArray(allResposne)) {
      setUsersOrders(allResposne)
      setIsOrdersLoading(false)
    } else {
      setUsersOrders([])
    }

  }
  useEffect(() => {

    getAllOrders();

  }, [userId])

  if (isOrdersLoading) {
    return <LoadingComponent />
  }

  return (
    <div>
      {usersOrders.length > 0 ? (
        <div className="space-y-8 max-w-full sm:max-w-[80%] mx-auto mt-6 mb-10 px-2">
          {usersOrders.map((user) => (
            <div
              key={user._id}
              className="bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-4 sm:p-6 border text-card-foreground"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 mb-4 bg-muted rounded-lg px-3 py-2 gap-2">
                <h2 className="text-base sm:text-lg font-semibold">
                  Order #{user._id.slice(-6)}
                </h2>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm ${user.isPaid
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                >
                  {user.isPaid ? "Paid" : "Unpaid"}
                </span>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm ${user.isDelivered
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                >
                  {user.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              {/* Shipping */}
              <div className="mb-4 text-sm bg-muted rounded-xl p-3 space-y-1">
                <p>
                  <b>City:</b> {user.shippingAddress.city}
                </p>
                <p>
                  <b>Phone:</b> {user.shippingAddress.phone}
                </p>
                <p>
                  <b>Details:</b> {user.shippingAddress.details}
                </p>
              </div>

              {/* Products */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Products</h3>
                <ul className="space-y-2">
                  {user.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between text-xs sm:text-sm border-b border-dashed border-border pb-1"
                    >
                      <span className="pr-2">{item.product.title} × {item.count}</span>
                      <span className="text-muted-foreground">{item.price} EGP</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="text-right font-bold text-lg sm:text-xl mt-4 border-t pt-3">
                Total: {user.totalOrderPrice} EGP
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
          <div className="bg-muted rounded-full p-6 shadow-sm">
            <PackageX className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl sm:text-2xl font-semibold">
            You have not placed any orders yet.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            When you start shopping, you will find all your Orders here.
          </p>
          <Button className="my-3 text-sm sm:text-base">
            <Link href="/products">Choose your favorite products</Link>
          </Button>
        </div>
      )}
    </div>



  )
}
