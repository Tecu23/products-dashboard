export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    discount: string;
}

export interface ProductsState {
    products: Product[];
    loading: boolean;
}
