export type Review = {
    id: number;
    user_id: number;
    product_id: number;
    name: string;
    title: string;
    score: number;
    comment: string;
    created_at: string;
};

export type ReviewData = {
    data: Array<Review>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type ReviewForm = {
    title: string;
    score: number;
    comment: string;
}