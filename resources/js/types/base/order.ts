import { Product } from "./product";

export type Order = {
    id: number;
    user_id: number;
    order_code: string;
    des_name: string;
    des_postal_code: string;
    des_address: string;
    des_phone_number: string;
    postage: number;
    total_qty: number;
    total_price: number;
    created_at: string;
};

export type OrderData = {
    data: Array<Order>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type OrderForm = {
    desName: string;
    desPostalCode: string;
    desAddress: string;
    desPhoneNumber: string;
    postage: number;
    totalQty: number;
    totalPrice: number;
    products: Array<Product>;
    productQty: Array<number>;
};
