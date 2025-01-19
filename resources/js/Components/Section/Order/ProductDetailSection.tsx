import ProductCard2 from "@/Components/Card/ProductCard2";
import Box from "@/Components/Container/Box";
import Flex from "@/Components/Container/Flex";
import Loading from "@/Components/Progress/Loading";
import Text from "@/Components/Text/Text";
import useProduct from "@/Fooks/Api/useProduct";
import { OrderedProduct } from "@/types/base/orderedProduct";
import { FC, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Props = {
    orderedProduct: OrderedProduct | null;
};

const ProductDetailSection: FC<Props> = (props) => {
    const { orderedProduct } = props;

    const { getProduct, product, loading } = useProduct();

    useEffect(() => {
        getProduct(orderedProduct!.product_id);
    }, []);

    return (
        <Box m={{ lg: "0 0 32px" }}>
            {loading ? (
                <Loading />
            ) : (
                product && (
                    <Box>
                        <ProductCard2 product={product} />
                        <Box
                            bg="#eee"
                            p={{ lg: "8px" }}
                        >
                            <Flex justify={{ lg: "space-between" }}>
                                <Text fontWeight="bold">数量：{orderedProduct!.qty}</Text>
                                {orderedProduct!.completed ? (
                                    <Text fontWeight="bold" color="#0a0">
                                        <Flex gap={{ lg: "8px" }}>
                                            <FaCheckCircle />
                                            お届け済み
                                        </Flex>
                                    </Text>
                                ) : (
                                    <Text fontWeight="bold" color="#f00">
                                        <Flex gap={{ lg: "8px" }}>
                                            <FaTimesCircle />
                                            未到着
                                        </Flex>
                                    </Text>
                                )}
                            </Flex>
                        </Box>
                    </Box>
                )
            )}
        </Box>
    )
};

export default ProductDetailSection;