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