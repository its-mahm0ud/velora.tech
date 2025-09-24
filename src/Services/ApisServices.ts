
import { ResponseBrand, ResponseCategory, ResponseProduct, SingleResponseProduct, } from "@/app/Types";
import { ICartResponse, ICheckVisa } from "@/app/Interfaces";
import toast from "react-hot-toast";
import { IUserOrder } from "@/app/Interfaces/AllOrdersUser";
import { IUserId } from "@/app/Interfaces/UserId";
import { IAddProductToWishList } from "@/app/Interfaces/AddProductToWishList";
import { IUserWishList } from "@/app/Interfaces/GetAllProductToWishList";
import { IRemoveFromWishList } from "@/app/Interfaces/RemoveFromWishList";
import getDecodedToken from "@/Helpers/deCodedOfToken";
import { IChangePassword } from "@/app/Interfaces/ChangePassword";
import { IConfirmYourEmail } from "@/app/Interfaces/ConfirmYourEmail";
import { IClearCartUser } from "@/app/Interfaces/ClearCartUser";
import { IcheckOutByCash } from "@/app/Interfaces/checkOutByCash";
import { ILogin } from "@/app/Interfaces/ILogin";
import { IVerifyCodeConfirm } from "@/app/Interfaces/VerifyCodeConfirm";



export async function handleAddToCart(setAddingLoading: (loading: boolean) => void, id: string, setCartCount: (count: number) => void) {

    setAddingLoading(true);
    const response: ICartResponse = await apiServices.addToCart(String(id));
    setCartCount(response.numOfCartItems)
    setAddingLoading(false);
    toast.success(response.message!);

}
export async function handleAddToWishList(product: string, setIsAlreadyInWishList: (v: boolean) => void, setWishListtCount: (count: number) => void) {
    const res = await apiServices.AddProductToWishList(product)
    if (res.status === 'success') {
        setIsAlreadyInWishList(true)
        setWishListtCount(res.data.length)
        toast.success(res.message)
    }
}







class ApiServices {
    #baseUrl: string = "https://ecommerce.routemisr.com";



    // {Apis all Cart}
    async addToCart(id: string): Promise<ICartResponse> {
        const enCodetoken = await getDecodedToken();


        return await fetch(this.#baseUrl + "/api/v1/cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
            body: JSON.stringify({
                productId: id
            }),
        }).then((res) => res.json());
    }

    async displayCartUser(): Promise<ICartResponse> {
        const enCodetoken = await getDecodedToken();

        return await fetch(this.#baseUrl + "/api/v1/cart", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
        }).then((res) => res.json());

    }
    async ClearCartUser(): Promise<IClearCartUser> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/cart", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
        }).then((res) => res.json());

    }

    // {Apis all products}

    async fetchProducts(): Promise<ResponseProduct> {
        return await fetch(this.#baseUrl + "/api/v1/products").then((res) => res.json());
    }
    async fetchSingleProduct(id: string): Promise<SingleResponseProduct> {
        return await fetch(this.#baseUrl + "/api/v1/products/" + id).then((res) => res.json());
    }
    async RemoveProductFromCartUser(productId: string): Promise<ICartResponse> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/cart/" + productId, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
        }).then((res) => res.json());

    }

    async UpdateProductFromCartUser(productId: string, count: number): Promise<void> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/cart/" + productId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
            body: JSON.stringify({
                count

            }),
        }).then((res) => res.json());

    }

    // {Apis  brands}


    async fetchBrands(): Promise<ResponseBrand> {
        return await fetch(this.#baseUrl + "/api/v1/brands").then((res) => res.json());
    }

    // {Apis categories}
    async fetchCategories(): Promise<ResponseCategory> {
        return await fetch(this.#baseUrl + "/api/v1/categories").then((res) => res.json());
    }


    // {ChekOutApis}

    async checkOutByVisa(cartId: string, address: string, phone: string, city: string): Promise<ICheckVisa> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/orders/checkout-session/" + cartId + "?url=https://veloratech.vercel.app", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
            body: JSON.stringify({
                shippingAddress: {
                    details: address,
                    phone,
                    city,
                }
            }),
        }).then((res) => res.json());
    }
    async checkOutByCash(cartId: string, address: string, phone: string, city: string): Promise<IcheckOutByCash> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/orders/" + cartId, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            },
            body: JSON.stringify({
                shippingAddress: {
                    details: address,
                    phone,
                    city,
                }
            }),
        }).then((res) => res.json());
    }
    // {User Orders}

    async getUserId(): Promise<IUserId> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/auth/verifyToken", {
            headers: {
                token: enCodetoken as string,
            }
        }).then((res?) => res?.json());
    }
    async getUserOrders(userId: string): Promise<IUserOrder> {
        return await fetch(this.#baseUrl + "/api/v1/orders/user/" + userId).then((res) => res.json());
    }

    // {Wish List Apis}

    async AddProductToWishList(productId: string): Promise<IAddProductToWishList> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/wishlist", {
            method: "POST",
            body: JSON.stringify({
                productId
            }),
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            }
        }).then((res) => res.json());
    }
    async getAllProductToWishList(): Promise<IUserWishList> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/wishlist", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string
            }
        }).then((res) => res.json());
    }
    async RemoveProductFromWishList(productId: string): Promise<IRemoveFromWishList> {
        const enCodetoken = await getDecodedToken();
        return await fetch(this.#baseUrl + "/api/v1/wishlist/" + productId, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: enCodetoken as string,
            }
        }).then((res) => res.json());
    }

    // {Auth}

    async login(email: string, password: string): Promise<ILogin> {
        return await fetch(this.#baseUrl + "/api/v1/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
    }


    async Register(name: string, email: string, password: string, rePassword: string, phone: string): Promise<IRegister> {
        return await fetch(this.#baseUrl + "/api/v1/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                rePassword,
                phone
            })
        }).then((res) => res.json())

    }
    // {Forget Password}
    async ConfirmeEmail(email: string): Promise<IConfirmYourEmail> {
        return await fetch(this.#baseUrl + "/api/v1/auth/forgotPasswords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
            })
        }).then((res) => res.json())
    }
    async VerifyCodeConfirm(resetCode: string): Promise<IVerifyCodeConfirm> {
        return await fetch(this.#baseUrl + "/api/v1/auth/verifyResetCode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                resetCode,
            })
        }).then((res) => res.json())
    }





    async ChangePassword(email: string, newPassword: string): Promise<IChangePassword> {
        return await fetch(this.#baseUrl + "/api/v1/auth/resetPassword", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                newPassword,
            })
        }).then((res) => res.json())
    }
}

export const apiServices = new ApiServices()