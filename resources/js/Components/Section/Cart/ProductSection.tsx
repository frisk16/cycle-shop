import CartProductCard from "@/Components/Card/CartProductCard";
import useProduct from "@/Fooks/Api/useProduct";
import { Cart } from "@/types/base/cart";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

type Props = {
    cart: Cart | null;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const ProductSection: FC<Props> = (props) => {
    const { cart, setUpdateCnt } = props;
    
    const { product, getProduct } = useProduct();

    useEffect(() => {
        getProduct(cart!.product_id);
    }, []);

    return (
        <CartProductCard
            product={product}
            qty={cart!.qty}
            setUpdateCnt={setUpdateCnt}
        />
    )
};

export default ProductSection;