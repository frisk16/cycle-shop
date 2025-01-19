import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Container from "@/Components/Container/Container";
import ProductNotFound from "@/Components/Text/ProductNotFound";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useFormat from "@/Fooks/useFormat";
import { OrderData } from "@/types/base/order";
import { Link } from "@inertiajs/react";
import { FC, memo } from "react";

type Props = {
    orders: OrderData;
};

const IndexPageSection: FC<Props> = memo((props) => {
    const { orders } = props;

    const { getDateTime, getFormatNumber } = useFormat();

    return (
        <section>
            <Container size="md">
                <Title line>過去の注文履歴</Title>

                {orders.data.length > 0 ? (
                    orders.data.map((order) => (
                        <Link href={route("orders.show", order.id)} key={order.id}>
                            <Card m={{ lg: "0 0 32px" }}>
                                <CardHeader>
                                    <h5>注文コード：{order.order_code}</h5>
                                    <h5>{getDateTime(order.created_at)}</h5>
                                </CardHeader>
                                <CardBody bg="var(--sub-theme-color)">
                                    <h5>全{order.total_qty}商品</h5>
                                    <Text fontWeight="bold" color="#05a">合計金額：￥{getFormatNumber(order.total_price)}円</Text>
                                    <h5>(送料￥{getFormatNumber(order.postage)}円込み)</h5>
                                </CardBody>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <ProductNotFound />
                )}
            </Container>
        </section>
    )
});

export default IndexPageSection;