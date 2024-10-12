interface Dimensions {
    depth: number;
    height: number;
    width: number;
}

interface Meta {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
}
interface Review {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
}

export interface Product {
    availabilityStatus: string;
    category: string;
    description: string;
    dimensions: Dimensions;
    discountPercentage: number;
    id: number;
    images: string[];
    meta: Meta;
    minimumOrderQuantity: number;
    price: number;
    rating: number;
    returnPolicy: string;
    reviews: Review[];
    shippingInformation: string;
    sku: string;
    stock: number;
    tags: string[];
    thumbnail: string;
    title: string;
    warrantyInformation: string;
    weight: number;
}

export interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
}

export interface FavoriteProductsState {
    products: Product[];
}

export interface CartProductsState {
    products: Product[];
}
