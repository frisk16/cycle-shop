import Container from "@/Components/Container/Container";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import TotalSection from "./TotalSection";
import MainSection from "./MainSection";
import useCart from "@/Fooks/Api/useCart";
import PageLoading from "@/Components/Progress/PageLoading";

type Props = {
    updateCnt: number;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
    disabledStatus: string;
};

const CartPageSection: FC<Props> = (props) => {
    const { updateCnt, setUpdateCnt, disabledStatus } = props;

    const { loading, carts, getCarts } = useCart();

    useEffect(() => {
        getCarts();
    }, [updateCnt]);

    return (
        <Container size="xl">
            {loading && (
                <PageLoading />
            )}

            <Grid
                templateCols="repeat(3, 1fr)"
                gap={{ lg: "32px" }}
            >

                <GridItem col={{ md: "1 / 4", lg: "1 / 2" }}>
                    <TotalSection
                        updateCnt={updateCnt}
                        disabledStatus={disabledStatus}
                    />
                </GridItem>

                <GridItem col={{ md: "1 / 4", lg: "2 / 4" }}>
                    <MainSection
                        carts={carts}
                        setUpdateCnt={setUpdateCnt}
                    />
                </GridItem>
                
            </Grid>
        </Container>
    )
};

export default CartPageSection;