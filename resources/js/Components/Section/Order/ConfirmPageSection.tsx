import Container from "@/Components/Container/Container";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import { Order } from "@/types/base/order";
import { Product } from "@/types/base/product";
import { FC } from "react";
import CheckoutSection from "./CheckoutSection";
import DetailSection from "./DetailSection";
import Title from "@/Components/Text/Title";

type Props = {
    order: Order | null;
    products: Array<Product>;
    productQty: Array<number>;
};

const ConfirmPageSection: FC<Props> = (props) => {
    return (
        <Container size="xl">
            <Title m={{ lg: "0 0 32px" }} line>注文内容の確認</Title>
            <Grid
                templateCols="repeat(3, 1fr)"
                gap={{ lg: "32px" }}
            >

                <GridItem col={{ base: "1 / 4", lg: "1 / 2" }}>
                    <CheckoutSection
                        {...props}
                    />
                </GridItem>

                <GridItem col={{ base: "1 / 4", lg: "2 / 4" }}>
                    <DetailSection
                        {...props}
                    />
                </GridItem>
                
            </Grid>
        </Container>
    )
};

export default ConfirmPageSection;