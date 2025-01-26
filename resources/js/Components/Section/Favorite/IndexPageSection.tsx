import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import PageLoading from "@/Components/Progress/PageLoading";
import ProductNotFound from "@/Components/Text/ProductNotFound";
import Title from "@/Components/Text/Title";
import useFavorite from "@/Fooks/Api/useFavorite";
import { FC, memo, useEffect } from "react";
import ProductSection from "./ProductSection";
import Flex from "@/Components/Container/Flex";
import DangerButton from "@/Components/Button/DangerButton";

const IndexPageSection: FC = memo(() => {

    const { loading, favorites, getAll } = useFavorite();

    useEffect(() => {
        getAll();
    }, []);

    return (
        <section>
            <Container size="md">
                <Title line>お気に入り</Title>

                <Box>
                    {loading ? (
                        <PageLoading />
                    ) : favorites && favorites.total > 0 ? (
                        favorites.data.map((favorite) => (
                            <Box key={favorite.id} m={{ lg: "0 0 32px" }}>
                                <Flex justify={{ lg: "end" }}>
                                    <DangerButton
                                        sm
                                        borderRadius="0"
                                    >
                                        お気に入り削除
                                    </DangerButton>
                                </Flex>
                                <ProductSection
                                    productId={favorite.product_id}
                                />
                            </Box>
                        ))
                    ) : (
                        <ProductNotFound />
                    )}
                </Box>
            </Container>
        </section>
    )
});

export default IndexPageSection;