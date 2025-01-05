import ConfirmPageSection from "@/Components/Section/Order/ConfirmPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Order } from "@/types/base/order";
import { Product } from "@/types/base/product";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    order: Order | null;
    products: Array<Product>;
    productQty: Array<number>;
};

const Confirm: FC<PageProps> = (props) => {
    const { order, products, productQty } = props;

    return (
        <DefaultLayout>
            <Head title="注文内容の確認" />

            <ConfirmPageSection
                order={order}
                products={products}
                productQty={productQty}
            />
        </DefaultLayout>
    )
}

export default Confirm;