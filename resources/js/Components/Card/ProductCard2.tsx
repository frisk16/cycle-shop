import { Product } from "@/types/base/product";
import { FC, memo, useEffect } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import Box from "../Container/Box";
import ScoreBar from "../Progress/ScoreBar";
import Text from "../Text/Text";
import useAws from "@/Fooks/useAws";
import { Link } from "@inertiajs/react";
import useFormat from "@/Fooks/useFormat";
import useReview from "@/Fooks/Api/useReview";
import Flex from "../Container/Flex";
import Image from "../Image/Image";

type Props = {
    product: Product | null;
};

const ProductCard2: FC<Props> = memo((props) => {
    const { product } = props;

    const { imageUrl } = useAws();
    const { getFormatNumber } = useFormat();
    const { avgScore, getAvgScore } = useReview();

    useEffect(() => {
        getAvgScore(product!.id);
    }, []);

    return (
        <Link href={route("products.show", product!.id)}>
            <Flex justify={{ lg: "center" }} direction={{ base: "column" }}>
                <Box w={{ base: "100%", lg: "160px" }} h={{ base: "100%", lg: "140px" }}>
                    <Image h={{ lg: "100%" }} src={imageUrl+product!.image_url} />
                </Box>
                <Card
                    h={{ base: "100%", lg: "140px" }}
                    w={{ lg: "100%" }}
                >
                    <CardHeader bg="var(--main-color)" color="#fff">
                        <h5>{product!.name}</h5>
                    </CardHeader>
                    <CardBody>
                        <Flex gap={{ lg: "16px" }}>
                            <Text
                                fontSize="1.2em"
                                fontWeight="bold"
                                color="#f00"
                            >
                                ￥{getFormatNumber(product!.price)}円
                            </Text>
                            <ScoreBar status={avgScore} />
                        </Flex>
                    </CardBody>
                </Card>
            </Flex>
        </Link>
    )
});

export default ProductCard2;