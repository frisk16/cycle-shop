import Loading from "@/Components/Progress/Loading";
import ProgressBar from "@/Components/Progress/ProgressBar";
import useReview from "@/Fooks/Api/useReview";
import { FC, memo, useEffect } from "react";
import styled from "styled-components";

type Props = {
    updateCnt: number;
    productId: number;
}

const ReviewScoresSection: FC<Props> = memo((props) => {
    const { updateCnt, productId } = props;

    const { loading, scores, getReviewScore } = useReview();

    useEffect(() => {
        getReviewScore(productId);
    }, [updateCnt]);

    return (
        <>
            {loading ? (
                <Loading color="#07f" />
            ) : (
                <ContainerDiv>
                    <div>
                        <span>★5</span>
                        <ProgressBar status={scores[0]} />
                        <span>{scores[0]}%</span>
                    </div>
                    <div>
                        <span>★4</span>
                        <ProgressBar status={scores[1]} />
                        <span>{scores[1]}%</span>
                    </div>
                    <div>
                        <span>★3</span>
                        <ProgressBar status={scores[2]} />
                        <span>{scores[2]}%</span>
                    </div>
                    <div>
                        <span>★2</span>
                        <ProgressBar status={scores[3]} />
                        <span>{scores[3]}%</span>
                    </div>
                    <div>
                        <span>★1</span>
                        <ProgressBar status={scores[4]} />
                        <span>{scores[4]}%</span>
                    </div>
                </ContainerDiv>
            )}
        </>
    )
});

export default ReviewScoresSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    border: 1px solid #aaa;
    border-radius: 8px;
    padding: 16px 32px 16px 0;

    div {
        display: flex;
        align-items: center;
        width: 100%;
        word-break: normal;
        padding: 8px;
        gap: 16px;
    }

    div > span {
        display: block;
        width: 48px;
        text-align: end;
    }

`;