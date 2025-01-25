import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import ProductNotFound from "@/Components/Text/ProductNotFound";
import Title from "@/Components/Text/Title";
import { FavoriteData } from "@/types/base/favorite";
import { FC, memo } from "react";

type Props = {
    favorites: FavoriteData;
};

const IndexPageSection: FC<Props> = memo((props) => {
    const { favorites } = props;

    return (
        <section>
            <Container size="md">
                <Title line>お気に入り</Title>

                <Box>
                    {favorites.data.length > 0 ? (
                        <></>
                    ) : (
                        <ProductNotFound />
                    ) }
                </Box>
            </Container>
        </section>
    )
});

export default IndexPageSection;