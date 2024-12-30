import CartPageSection from "@/Components/Section/Cart/CartPageSection";
import useCart from "@/Fooks/Api/useCart";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const Index: FC = () => {
    const { updateCnt, setUpdateCnt } = useCart();

    return (
        <DefaultLayout updateCnt={updateCnt} >
            <Head title="商品カート" />

            <CartPageSection
                updateCnt={updateCnt}
                setUpdateCnt={setUpdateCnt}
            />

        </DefaultLayout>
    )
};

export default Index;