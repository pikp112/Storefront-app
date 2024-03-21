import { HttpHeaders } from "@angular/common/http";

export interface Options{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'events';
    params?: {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
    trasnferCache?: {
        includedHeaders?: string[];
    } | boolean;
}

export interface Product{
    price: string;
    name: string;
    image: string;
    rating: number;
    id?: number;
}

export interface Products{
    items: Product[];
    total: number;
    page : number;
    perPage: number;
    totalPages: number;
}

export interface PaginationParams{
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
}
