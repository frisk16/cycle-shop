import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Box from "@/Components/Container/Box";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import ScoreBar from "@/Components/Progress/ScoreBar";
import { FC, memo, useEffect } from "react";
import styled from "styled-components";
import ReviewScoresSection from "./ReviewScoresSection";
import ReviewFormSection from "./ReviewFormSection";
import ReviewCommentsSection from "./ReviewCommentsSection";
import useReview from "@/Fooks/Api/useReview";
import Divider from "@/Components/Text/Divider";

type Props = {
    productId: number;
    avgScore: number;
};

const ReviewSection: FC<Props> = memo((props) => {
    const { productId, avgScore } = props;

    const { loading, reviews, updateCnt, setUpdateCnt, getReviews } = useReview();
    
    useEffect(() => {
        getReviews(productId);
    }, [updateCnt]);    
    
    return (
        <ContainerDiv>
            <Card>
                <CardHeader>
                    <h5>レビュー</h5>
                    <Box>
                        <ScoreBar status={avgScore} />
                    </Box>
                </CardHeader>
                <Divider color="var(--sub-color)" />
                <CardBody>

                    <Grid templateCols="repeat(2, 1fr)" gap={{ lg: "16px" }}>

                        <GridItem col={{ md: "1 / 3", lg: "1 / 2" }}>
                            <ReviewScoresSection
                                updateCnt={updateCnt}
                                productId={productId}
                            />
                        </GridItem>
                        
                        <GridItem col={{ md: "1 / 3", lg: "2 / 3" }}>
                            <ReviewFormSection
                                productId={productId}
                                reviews={reviews}
                                setUpdateCnt={setUpdateCnt}
                            />
                        </GridItem>

                        <GridItem col={{ lg: "1 / 3" }}>
                            <ReviewCommentsSection
                                productId={productId}
                                reviews={reviews}
                                loading={loading}
                            />
                        </GridItem>

                    </Grid>

                </CardBody>
            </Card>
        </ContainerDiv>
    )
});

export default ReviewSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    word-break: break-all;

    @media screen and (max-width: 1100px) {
        width: 100%;
    }
`