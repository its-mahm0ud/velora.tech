import { ApiResponse, IProduct, IBrand, ICategory } from "../Interfaces";


export type ResponseProduct = ApiResponse<IProduct>;
export type ResponseBrand = ApiResponse<IBrand>;
export type ResponseCategory = ApiResponse<ICategory>;



export type SingleResponseProduct = {
    data: IProduct;
}
export type SingleResponseBrand = {
    data: IBrand;
}
export type SingleResponseCategory = {
    data: ICategory;
}


