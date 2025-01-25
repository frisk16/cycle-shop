import IndexPageSection from "@/Components/Section/Favorite/IndexPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { FavoriteData } from "@/types/base/favorite";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    favorites: FavoriteData;
};

const Index: FC<PageProps> = (props) => {
    return (
        <DefaultLayout>
            <Head title="お気に入り" />

            <IndexPageSection
                {...props}
            />
        </DefaultLayout>
    )
};

export default Index;