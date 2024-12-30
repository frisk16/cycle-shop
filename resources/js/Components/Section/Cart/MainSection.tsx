import { Cart } from "@/types/base/cart";
import { Dispatch, FC, memo, SetStateAction } from "react";
import ProductSection from "./ProductSection";
import Box from "@/Components/Container/Box";
import ProductNotFound from "@/Components/Text/ProductNotFound";

type Props = {
    carts: Array<Cart>;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const MainSection: FC<Props> = memo((props) => {
    const { carts, setUpdateCnt } = props;

    return (
        <section>
            {carts && carts.length > 0 ? (
                carts.map((cart) => (
                    <Box key={cart.product_id} m={{ lg: "0 0 32px" }}>
                        <ProductSection
                            cart={cart}
                            setUpdateCnt={setUpdateCnt}
                        />
                    </Box>
                ))
            ) : (
                <ProductNotFound />
            )}
        </section>
    )
});

export default MainSection;