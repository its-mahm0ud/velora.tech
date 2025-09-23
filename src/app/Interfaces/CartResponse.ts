
import { IBrand } from "./BrandInterface"
import { ICategory } from "./CategoryInterface"
import { ISubcategory } from "./SubcategoryInterface"

// الـ response كله
export interface ICartResponse {
  status: string
  message?: string
  numOfCartItems: number
  cartId: string
  data: ICartResponseData
}

// الداتا الأساسية بتاعة الكارت
export interface ICartResponseData {
  _id: string
  cartOwner: string
  products: ICartResponseProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

// كل منتج جوه الكارت
export interface ICartResponseProduct {
  count: number
  _id: string
  product: ICartProduct
  price: number
}

// تفاصيل المنتج نفسه
export interface ICartProduct {
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  subcategory: ISubcategory[]
}



















