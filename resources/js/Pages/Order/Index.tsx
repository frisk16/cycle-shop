import IndexPageSection from "@/Components/Section/Order/IndexPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Order, OrderData } from "@/types/base/order";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    orders: OrderData;
};

const Index: FC<PageProps> = (props) => {
    const { orders } = props;

    return (
        <DefaultLayout>
            <Head title="注文履歴" />

            <IndexPageSection
                orders={orders}
            />
        </DefaultLayout>
    )
};

export default Index;