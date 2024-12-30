export interface User {
    id: number;
    name: string;
    image_url: string;
    email: string;
    email_verified_at: string;
    area: string;
    address: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
