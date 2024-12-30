import { FC, memo, useEffect } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import Box from "../Container/Box";
import Flex from "../Container/Flex";
import UserImage from "../Image/UserImage";
import Text from "../Text/Text";
import ScoreBar from "../Progress/ScoreBar";
import { Review } from "@/types/base/review";
import CardBody from "./CardBody";
import useFormat from "@/Fooks/useFormat";
import useReview from "@/Fooks/Api/useReview";

type Props = {
    review: Review | null;
};

const ReviewCard: FC<Props> = memo((props) => {
    const { review } = props;

    const { getDateTime } = useFormat();
    const { userImageUrl, getUserImage } = useReview();

    useEffect(() => {
        getUserImage(review!.id);
    }, []);

    return (
        <Card key={review!.id} shadow borderRadius="8px" m={{ lg: "0 0 16px" }}>
            <CardHeader p="16px 16px 0">
                <Box>
                    <Flex gap={{ lg: "8px" }}>
                        <UserImage userImage={userImageUrl} size="32px" />
                        <Text fontWeight="normal" fontSize="0.9em">{review!.name}</Text>
                    </Flex>
                    <ScoreBar status={review!.score} />
                    <Text fontWeight="normal" fontSize="0.8em">{getDateTime(review!.created_at)}</Text>
                    <Text>{review!.title}</Text>
                </Box>
            </CardHeader>
            <CardBody>
                {review!.comment}
            </CardBody>
        </Card>
    )
});

export default ReviewCard;