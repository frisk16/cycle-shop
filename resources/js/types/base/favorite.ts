export type Favorite = {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
};

export type FavoriteData = {
    data: Array<Favorite>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};