import IndexPageSection from "@/Components/Section/Favorite/IndexPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const Index: FC = () => {
    return (
        <DefaultLayout>

            <Head title="お気に入り" />

            <IndexPageSection />
            
        </DefaultLayout>
    )
};

export default Index;