import PrimaryButton from "@/Components/Button/PrimaryButton";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Box from "@/Components/Container/Box";
import Flex from "@/Components/Container/Flex";
import Text from "@/Components/Text/Text";
import useCart from "@/Fooks/Api/useCart";
import useFormat from "@/Fooks/useFormat";
import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
    updateCnt: number;
    disabledStatus: string;
}

const TotalSection: FC<Props> = memo((props) => {
    const { updateCnt, disabledStatus } = props;

    const { getTotalPrice, total, postage } = useCart();
    const { getFormatNumber } = useFormat();
    const [loading, setLoading] = useState(false);

    const onClickConfirm = () => {
        setLoading(true);
        location.href = route("orders.confirm");
    }

    useEffect(() => {
        getTotalPrice();
    }, [updateCnt]);

    return (
        <section>
            <Box display={{ md: "none", lg: "block" }}>
                <Card shadow>
                    <CardBody>
                        <Flex
                            direction={{ lg: "column" }}
                            justify={{ lg: "space-between" }}
                            gap={{ lg: "16px" }}
                        >
                            <Box>
                                <Flex gap={{ lg: "8px" }}>
                                    <Text fontWeight="bold">合計金額：</Text>
                                    <Text
                                        color="#f00"
                                        fontWeight="bold"
                                        fontSize="1.5em"
                                    >
                                        ￥{getFormatNumber(total)}円
                                    </Text>
                                </Flex>
                                <Flex gap={{ lg: "8px" }}>
                                    <Text fontWeight="bold">送料：</Text>
                                    {postage > 0 ? (
                                        <Text color="#00f">￥{postage}円</Text>
                                    ) : (
                                        <Text color="#00f">無料</Text>
                                    )}
                                </Flex>
                            </Box>

                            <Box w={{ base: "inherit", lg: "75%" }}>
                                {disabledStatus === "nonAuthUser" && (
                                    <SecondaryButton
                                        disabled
                                        w={{ lg: "100%" }}
                                    >
                                        ログイン後に購入可能
                                    </SecondaryButton>
                                )}
                                {disabledStatus === "nonUserDetail" && (
                                    <SecondaryButton
                                        disabled
                                        w={{ lg: "100%" }}
                                    >
                                        ユーザー情報が不足
                                    </SecondaryButton>
                                )}
                                {disabledStatus === "" && (
                                    <PrimaryButton
                                        w={{ lg: "100%" }}
                                        onClick={onClickConfirm}
                                        processing={loading}
                                    >
                                        レジへ進む
                                    </PrimaryButton>
                                )}
                            </Box>
                        </Flex>

                    </CardBody>
                </Card>
            </Box>

            <PhoneNavDiv>
                <Box>
                    <Flex gap={{ lg: "8px" }}>
                        <Text fontWeight="bold">合計金額：</Text>
                        <Text
                            color="#f00"
                            fontWeight="bold"
                            fontSize="1.5em"
                        >
                            ￥{getFormatNumber(total)}円
                        </Text>
                    </Flex>
                    <Flex gap={{ lg: "8px" }}>
                        <Text fontWeight="bold">送料：</Text>
                        {postage > 0 ? (
                            <Text color="#00f">￥{postage}円</Text>
                        ) : (
                            <Text color="#00f">無料</Text>
                        )}
                    </Flex>
                </Box>

                <Box>
                    {disabledStatus === "nonAuthUser" && (
                        <SecondaryButton
                            disabled
                        >
                            ログイン後に購入可能
                        </SecondaryButton>
                    )}
                    {disabledStatus === "nonUserDetail" && (
                        <SecondaryButton
                            disabled
                        >
                            ユーザー情報が不足
                        </SecondaryButton>
                    )}
                    {disabledStatus === "" && (
                        <PrimaryButton
                            onClick={onClickConfirm}
                            processing={loading}
                        >
                            レジへ進む
                        </PrimaryButton>
                    )}
                </Box>
            </PhoneNavDiv>
        </section>
    )
});

export default TotalSection;


/**
 * CSS Styles
 */
const PhoneNavDiv = styled.div`
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    position: fixed;
    background-color: #fff;
    border-top: 1px solid var(--sub-color);
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;

    @media screen and (max-width: 1100px) {
        display: flex;
    }
`;