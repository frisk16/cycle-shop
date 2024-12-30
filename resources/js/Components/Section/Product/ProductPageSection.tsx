import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import { Product } from "@/types/base/product";
import styled from "styled-components";
import { Category } from "@/types/base/category";
import Container from "@/Components/Container/Container";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import ImageSection from "./ImageSection";
import MainSection from "./MainSection";
import ReviewSection from "./Review/ReviewSection";
import FunctionSection from "./FunctionSection";
import useReview from "@/Fooks/Api/useReview";

type Props = {
    product: Product | null;
    category: Category | null;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const ProductPageSection: FC<Props> = memo((props) => {
    const { product, category, setUpdateCnt } = props;

    const { avgScore, getAvgScore } = useReview();
    useEffect(() => {
        getAvgScore(product!.id);
    }, []);

    return (
        <section>
            <Container>

                <Grid templateCols="repeat(3, 1fr)" gap={{ lg: "16px" }}>

                    <GridItem col={{ base: "1 / 4", lg: "1 / 2" }}>

                        <ImageSection image={product!.image_url} />

                    </GridItem>

                    <GridItem col={{ base: "1 / 4", lg: "2 / 4" }}>
                    
                        <MainSection
                            product={product}
                            category={category}
                            avgScore={avgScore}
                        />

                        <FunctionSection
                            product={product}
                            setUpdateCnt={setUpdateCnt}
                        />

                        <ReviewSection
                            productId={product!.id}
                            avgScore={avgScore}
                        />

                    </GridItem>

                </Grid>
                


            </Container>
        </section>
    )
});

export default ProductPageSection;


/**
 * CSS Styles
 */
const MainDiv = styled.div`
    max-width: 100%;
    display: flex;
    gap: 16px;
    margin-bottom: 16px;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
    }
`

