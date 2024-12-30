import ProductPageSection from "@/Components/Section/Product/ProductPageSection";
import useCart from "@/Fooks/Api/useCart";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Category } from "@/types/base/category";
import { Product } from "@/types/base/product";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    product: Product | null;
    category: Category | null;
};

const Show: FC<PageProps> = (props) => {
    const { product, category } = props;
    
    const { updateCnt, setUpdateCnt } = useCart();

    return (
        <DefaultLayout updateCnt={updateCnt}>

            <Head title={product!.name} />

            <ProductPageSection
                product={product}
                category={category}
                setUpdateCnt={setUpdateCnt}
            />
            
        </DefaultLayout>
    )
};

export default Show;