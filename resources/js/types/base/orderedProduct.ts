export type OrderedProduct = {
    id: number;
    order_id: number;
    product_id: number;
    qty: number;
    price: number;
    postage: number;
    completed: boolean;
    created_at: string;
};