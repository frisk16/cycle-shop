import ProductCard2 from "@/Components/Card/ProductCard2";
import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import Loading from "@/Components/Progress/Loading";
import HistoryNotFound from "@/Components/Text/HistoryNotFound";
import Title from "@/Components/Text/Title";
import useProduct from "@/Fooks/Api/useProduct";
import { FC, memo, useEffect } from "react";

const HistoryPageSection: FC = memo(() => {
    const { loading, getHistoryProducts, products } = useProduct();

    useEffect(() => {
        getHistoryProducts();
    }, []);

    return (
        <Container size="md">
            <Title line>閲覧履歴</Title>
            <Box>
                {loading ? (
                    <Loading color="#05f" />
                ) : (
                    products && products.length < 1 ? (
                        <HistoryNotFound />
                        ) : (
                        products.map((product) => (
                            <Box key={product.id} m={{ lg: "0 0 24px" }}>
                                <ProductCard2 product={product} />
                            </Box>
                        ))
                    )
                )}

            </Box>
        </Container>
    )
});

export default HistoryPageSection;