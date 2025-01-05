import PrimaryButton from "@/Components/Button/PrimaryButton";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Box from "@/Components/Container/Box";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useFormat from "@/Fooks/useFormat";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    totalPrice: number;
    postage: number;
};

const CheckoutSection: FC<Props> = memo((props) => {
    const { totalPrice, postage } = props;

    const { getFormatNumber } = useFormat();

    return (
        <section>
            <Box display={{ base: "none", lg: "block" }}>
                <Card shadow>
                    <CardBody>
                        <Box>
                            <Title>合計金額</Title>
                            <Text
                                color="#f00"
                                fontWeight="bold"
                                fontSize="1.1em"
                                m={{ lg: "0 0 0 16px" }}
                            >
                                ￥{getFormatNumber(totalPrice + postage)}円 (送料込)
                            </Text>
                        </Box>
                        <Box w={{ lg: "100%" }} m={{ lg: "16px 0 0" }}>
                            <PrimaryButton w={{ lg: "100%" }}>注文を確定する</PrimaryButton>
                        </Box>
                    </CardBody>
                </Card>
            </Box>

            <PhoneNavDiv>
                <Box>
                    <Text fontWeight="bold" color="#fff">合計金額</Text>
                    <Text
                        color="#ff0"
                        fontWeight="bold"
                        fontSize="1.1em"
                        m={{ base: "0 0 0 8px" }}
                    >
                        ￥{getFormatNumber(totalPrice + postage)}円 (送料込)
                    </Text>
                </Box>
                <Box>
                    <PrimaryButton>注文を確定する</PrimaryButton>
                </Box>
            </PhoneNavDiv>
        </section>
    )
});

export default CheckoutSection;


/**
 * CSS Styles
 */
const PhoneNavDiv = styled.div`
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #aaa;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    @media screen and (max-width: 768px) {
        display: flex;
    }
`;