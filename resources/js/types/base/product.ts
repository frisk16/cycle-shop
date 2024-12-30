export type Product = {
        id: number;
        category_id: number;
        name: string;
        image_url: string;
        price: number;
        description: string;
        postage: boolean;
        recommend: boolean;
        pop: boolean;
        enabled: boolean;
        created_at: string;
}

export type ProductData = {
        data: Array<Product>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
};