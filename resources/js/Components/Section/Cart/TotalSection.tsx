import PrimaryButton from "@/Components/Button/PrimaryButton";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Box from "@/Components/Container/Box";
import Flex from "@/Components/Container/Flex";
import Text from "@/Components/Text/Text";
import useCart from "@/Fooks/Api/useCart";
import useFormat from "@/Fooks/useFormat";
import { FC, memo, useEffect } from "react";

type Props = {
    updateCnt: number;
}

const TotalSection: FC<Props> = memo((props) => {
    const { updateCnt } = props;

    const { getTotalPrice, total, postage } = useCart();
    const { getFormatNumber } = useFormat();

    useEffect(() => {
        getTotalPrice();
    }, [updateCnt]);

    return (
        <section>
            <Card>
                <CardBody>
                    <Flex
                        direction={{ base: "row", lg: "column" }}
                        justify={{ base: "space-between" }}
                        gap={{ lg: "16px" }}
                    >
                        <Box>
                            <Flex gap={{ lg: "16px" }}>
                                <Text fontWeight="bold">合計金額</Text>
                                <Text
                                    color="#f00"
                                    fontWeight="bold"
                                    fontSize="1.5em"
                                >
                                    ￥{getFormatNumber(total)}円
                                </Text>
                            </Flex>
                            <Flex gap={{ lg: "16px" }}>
                                <Text fontWeight="bold">送料</Text>
                                {postage > 0 ? (
                                    <Text color="#00f">￥{postage}円</Text>
                                ) : (
                                    <Text color="#00f">無料</Text>
                                )}
                            </Flex>
                        </Box>

                        <Box w={{ base: "inherit", lg: "75%" }}>
                            <PrimaryButton
                                w={{ lg: "100%" }}
                            >
                                レジへ進む
                            </PrimaryButton>
                        </Box>
                    </Flex>

                </CardBody>
            </Card>
        </section>
    )
});

export default TotalSection;