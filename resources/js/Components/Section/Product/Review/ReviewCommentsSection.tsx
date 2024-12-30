import PrimaryOutlineButton from "@/Components/Button/PrimaryOutlineButton";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import ReviewCard from "@/Components/Card/ReviewCard";
import Box from "@/Components/Container/Box";
import Flex from "@/Components/Container/Flex";
import UserImage from "@/Components/Image/UserImage";
import Loading from "@/Components/Progress/Loading";
import ScoreBar from "@/Components/Progress/ScoreBar";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useFormat from "@/Fooks/useFormat";
import { Review } from "@/types/base/review"
import { Link } from "@inertiajs/react";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    productId: number;
    reviews: Array<Review>;
    loading: boolean;
};

const ReviewCommentsSection: FC<Props> = memo((props) => {
    const { productId, reviews, loading } = props;

    const { getDateTime } = useFormat();

    return (
        <ContainerDiv>
            <Title>みんなのレビュー</Title>

            {loading ? (
                <Loading color="#07f" />
            ) : (
                <>
                    {reviews.map((review, index) => (
                        index < 5 && (
                            <ReviewCard review={review} />
                        )
                    ))}

                    {reviews.length > 4 && (
                        <Link href={route("reviews.show", productId)}>
                            <PrimaryOutlineButton w={{ base: "100%" }}>
                                ＞＞＞全てのレビューを見る
                            </PrimaryOutlineButton>
                        </Link>
                    )}
                </>
            )}

        </ContainerDiv>
    )
});

export default ReviewCommentsSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    margin-top: 32px;
    padding-right: 240px;

    @media screen and (max-width: 1100px) {
        padding: 0;
    }
`;