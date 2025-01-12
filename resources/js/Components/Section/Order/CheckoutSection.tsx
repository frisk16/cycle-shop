import PrimaryButton from "@/Components/Button/PrimaryButton";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Box from "@/Components/Container/Box";
import PageLoading from "@/Components/Progress/PageLoading";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useOrder from "@/Fooks/Api/useOrder";
import useFormat from "@/Fooks/useFormat";
import { Order } from "@/types/base/order";
import { Product } from "@/types/base/product";
import { useForm } from "@inertiajs/react";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    order: Order | null;
    products: Array<Product>;
    productQty: Array<number>;
};

const CheckoutSection: FC<Props> = memo((props) => {
    const { order, products, productQty } = props;

    const { getFormatNumber } = useFormat();

    const { loading, addOrder } = useOrder();

    const { data } = useForm({
        desName: order!.des_name,
        desPostalCode: order!.des_postal_code,
        desAddress: order!.des_address,
        desPhoneNumber: order!.des_phone_number,
        postage: order!.postage,
        totalQty: order!.total_qty,
        totalPrice: order!.total_price,
        products: products,
        productQty: productQty
    });

    const onSubmit = () => {
        addOrder(data);
    };

    return (
        <section>
            {loading && (
                <PageLoading />
            )}

            <Box display={{ base: "none", lg: "block" }}>
                <Card shadow>
                    <CardBody>
                        <Box>
                            <Title>合計金額</Title>
                            <Box fontSize="0.9em">
                                {order!.postage > 0 ? (
                                    <Text color="#00f">送料：￥{order!.postage}円</Text>
                                ) : (
                                    <Text>送料：無料</Text>
                                )}
                            </Box>
                            <Text
                                color="#f00"
                                fontWeight="bold"
                                fontSize="1.3em"
                                m={{ lg: "0 0 0 16px" }}
                            >
                                ￥{getFormatNumber(order!.total_price + order!.postage)}円 (送料込)
                            </Text>
                        </Box>
                        <Box w={{ lg: "100%" }} m={{ lg: "16px 0 0" }}>
                            <PrimaryButton
                                w={{ lg: "100%" }}
                                onClick={onSubmit}
                            >
                                注文を確定する
                            </PrimaryButton>
                        </Box>
                    </CardBody>
                </Card>
            </Box>

            <PhoneNavDiv>
                <Box>
                    <Box fontSize="0.9em">
                        {order!.postage > 0 ? (
                            <Text color="#0ff">送料：￥{order!.postage}円</Text>
                        ) : (
                            <Text color="#fff">送料：無料</Text>
                        )} 
                    </Box>
                    <Text fontWeight="bold" color="#fff">合計金額</Text>
                    <Text
                        color="#ff0"
                        fontWeight="bold"
                        fontSize="1.1em"
                        m={{ base: "0 0 0 8px" }}
                    >
                        ￥{getFormatNumber(order!.total_price + order!.postage)}円 (送料込)
                    </Text>
                </Box>
                <Box>
                    <PrimaryButton onClick={onSubmit}>注文を確定する</PrimaryButton>
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