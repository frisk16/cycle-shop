import ProductCard2 from "@/Components/Card/ProductCard2";
import useProduct from "@/Fooks/Api/useProduct";
import { FC, useEffect } from "react";

type Props = {
    productId: number;
};

const ProductSection: FC<Props> = (props) => {
    const { productId } = props;

    const { getProduct, product } = useProduct();

    useEffect(() => {
        getProduct(productId);
    }, []);

    return (
        product && (
            <ProductCard2
                product={product}
            />
        )
    )
};

export default ProductSection;