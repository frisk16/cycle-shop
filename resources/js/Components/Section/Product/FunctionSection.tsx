import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Flex from "@/Components/Container/Flex";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import CartSelect from "@/Components/Form/CartSelect";
import Text from "@/Components/Text/Text";
import { Product } from "@/types/base/product";
import FavoriteButton from "@/Components/Button/FavoriteButton";
import useFavorite from "@/Fooks/Api/useFavorite";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

type Props = {
    product: Product | null;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const FunctionSection: FC<Props> = memo((props) => {
    const { product, setUpdateCnt } = props;

    const { loading, isRegisted, hasRegisted, toggleFavorite } = useFavorite();
    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        auth.user && hasRegisted(product!.id);
    }, [isRegisted]);

    const onToggleFavorite = () => {
        toggleFavorite(product!.id);
    };

    return (
        <ContainerDiv>

            <Grid templateCols="repeat(2, 1fr)" gap={{ lg: "16px" }}>

                {/* Cart Section */}
                <GridItem col={{ md: "1 / 3", lg: "1 / 2" }}>
                    <Card w={{ lg: "100%" }}>
                        <CardBody>
                            <Flex gap={{ lg: "8px" }} wrap="wrap" justify={{ lg: "space-between" }}>

                                <CartSelect
                                    product={product}
                                    setUpdateCnt={setUpdateCnt}
                                />

                                <Text fontSize="0.9em">
                                    ※送料
                                    <Text fontWeight="bold">￥{product!.postage}円</Text>
                                </Text>

                            </Flex>
                        </CardBody>
                    </Card>
                </GridItem>
                
                {/* Favorite Section */}
                <GridItem col={{ md: "1 / 3", lg: "2 / 3" }}>
                    <Card w={{ lg: "100%" }}>
                        <CardBody>

                            {auth.user ? (
                                <FavoriteButton
                                    onClick={onToggleFavorite}
                                    isRegisted={isRegisted}
                                    processing={loading}
                                    w={{ base: "100%" }}
                                    m={{ lg: "0 auto" }}
                                />
                            ) : (
                                <Link href={route("login")}>
                                    <FavoriteButton
                                        w={{ base: "100%" }}
                                        m={{ lg: "0 auto" }}
                                    />
                                </Link>
                            )}
                            
                        </CardBody>
                    </Card>
                </GridItem>

            </Grid>


        </ContainerDiv>
    )
});

export default FunctionSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    width: 100%;
    margin-bottom: 16px;
`;