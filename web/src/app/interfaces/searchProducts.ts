export interface Product {
    ID: number;
    name: string;
    price: number;
    qty: number;
    description: string;
    imageURL: string;
    status: boolean;
    categoryID: number;
    tags: Array<string>;
}

export type State = {
    isLoading: boolean,
    error: string | null,
    products: Product[],
    count: number,
}
export interface FetchProductsRequestAction {
    type: 'fetchProductsRequest';
}

export interface FetchProductsSuccessAction {
    type: 'fetchProductsSuccess';
    payload: { count: number, data: Product[] };
}

export interface FetchProductsErrorAction {
    type: 'fetchProductsError';
    payload: string;
}
