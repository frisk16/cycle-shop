import ShowPageSection from "@/Components/Section/Order/ShowPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Order } from "@/types/base/order";
import { OrderedProduct } from "@/types/base/orderedProduct";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    order: Order | null;
    products: Array<OrderedProduct>;
};

const Show: FC<PageProps> = (props) => {
    return (
        <DefaultLayout>
            <Head title="注文の詳細" />

            <ShowPageSection
                {...props}
            />
        </DefaultLayout>
    )
};

export default Show;