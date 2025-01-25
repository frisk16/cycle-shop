import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useFormat from "@/Fooks/useFormat";
import { Order } from "@/types/base/order";
import { OrderedProduct } from "@/types/base/orderedProduct";
import { FC, memo } from "react";
import ProductDetailSection from "./ProductDetailSection";

type Props = {
    order: Order | null;
    products: Array<OrderedProduct>;
};

const ShowPageSection: FC<Props> = memo((props) => {
    const { order, products } = props;

    const { getDateTime } = useFormat();

    return (
        <section>
            <Container size="md">
                <Text fontWeight="bold" color="#777">{getDateTime(order!.created_at)}の注文</Text>
                <Title line>注文コード：{order!.order_code}</Title>

                <Card m={{ lg: "0 0 32px" }}>
                    <CardHeader bg="var(--main-color)" color="#fff">
                        <h5>お届け先詳細</h5>
                    </CardHeader>
                    <CardBody>
                        <p>お名前：　{order!.des_name}様</p>
                        <p>郵便番号：　〒{order!.des_postal_code}</p>
                        <p>住所：　{order!.des_address}</p>
                        <p>電話番号：　TEL - {order!.des_phone_number}</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader bg="var(--section-color)" color="#fff">
                        <h5>購入商品</h5>
                    </CardHeader>
                    <CardBody>
                        {products.map((data) => (
                            <ProductDetailSection
                                orderedProduct={data}
                                key={data.id}
                            />
                        ))}
                    </CardBody>
                </Card>
            </Container>
        </section>
    )
});

export default ShowPageSection;