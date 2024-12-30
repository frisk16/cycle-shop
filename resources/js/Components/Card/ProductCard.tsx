import { Product } from "@/types/base/product";
import { FC, memo, useEffect } from "react";
import Card from "./Card";
import CardImage from "./CardImage";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import Box from "../Container/Box";
import ScoreBar from "../Progress/ScoreBar";
import Text from "../Text/Text";
import useAws from "@/Fooks/useAws";
import { Link } from "@inertiajs/react";
import useFormat from "@/Fooks/useFormat";
import useReview from "@/Fooks/Api/useReview";

type Props = {
    product: Product | null;
};

const ProductCard: FC<Props> = memo((props) => {
    const { product } = props;

    const { imageUrl } = useAws();
    const { getFormatNumber } = useFormat();
    const { avgScore, getAvgScore } = useReview();

    useEffect(() => {
        getAvgScore(product!.id);
    }, []);

    return (
        <Link href={route("products.show", product!.id)}>
            <Card
                w={{ base: "340px", lg: "250px" }}
                h={{ base: "470px", lg: "480px" }}
            >
                <CardImage
                    src={imageUrl+product!.image_url}
                    h={{ base: "250px", lg: "210px" }}
                />
                <CardHeader bg="var(--sub-theme-color)">
                    {product!.name}
                </CardHeader>
                <CardBody>
                    <Box>
                        <ScoreBar status={avgScore} />
                    </Box>
                    <Text
                        fontWeight="bold"
                        fontSize="1.3em"
                        color="#f00"
                    >
                        ￥{getFormatNumber(product!.price)}円
                    </Text>
                    <Text fontSize="0.9em" textAlign="right">
                        {product!.postage ? (
                            <Text color="#00c">送料：￥500円</Text>
                        ) : (
                            <Text>送料：無料</Text>
                        )}
                        
                    </Text>
                </CardBody>
            </Card>
        </Link>
    )
});

export default ProductCard;