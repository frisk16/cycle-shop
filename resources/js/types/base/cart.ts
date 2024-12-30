export type Cart = {
    id: number;
    user_id: number;
    product_id: number;
    cookie_code: string;
    qty: number;
};

export type CartForm = {
    productId: number;
    qty: number | null;
};