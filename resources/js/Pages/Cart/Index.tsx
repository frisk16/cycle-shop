import CartPageSection from "@/Components/Section/Cart/CartPageSection";
import useCart from "@/Fooks/Api/useCart";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    disabledStatus: string;
};

const Index: FC<PageProps> = (props) => {
    const { disabledStatus } = props;

    const { updateCnt, setUpdateCnt } = useCart();

    return (
        <DefaultLayout updateCnt={updateCnt} >
            <Head title="商品カート" />

            <CartPageSection
                updateCnt={updateCnt}
                setUpdateCnt={setUpdateCnt}
                disabledStatus={disabledStatus}
            />

        </DefaultLayout>
    )
};

export default Index;