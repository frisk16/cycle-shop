import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import ProductCard2 from "@/Components/Card/ProductCard2";
import Box from "@/Components/Container/Box";
import FormGroup from "@/Components/Form/FormGroup";
import Label from "@/Components/Form/Label";
import Divider from "@/Components/Text/Divider";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import { Order } from "@/types/base/order";
import { Product } from "@/types/base/product";
import { FC, memo } from "react";

type Props = {
    order: Order | null;
    products: Array<Product>;
    productQty: Array<number>;
};

const DetailSection: FC<Props> = memo((props) => {
    const { order, products, productQty } = props;

    return (
        <section>

            {/* お届け先情報 */}
            <Box>
                <Card>
                    <CardHeader bg="var(--main-color)" color="#fff">
                        お届け先情報
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Title line m={{ lg: 0 }}>お届け先氏名</Title>
                            <Text fontSize="1.2em" m={{ lg: "0 0 0 16px" }}>{order!.des_name}</Text>
                        </FormGroup>
                        <FormGroup>
                            <Title line m={{ lg: 0 }}>郵便番号</Title>
                            <Text fontSize="1.2em" m={{ lg: "0 0 0 16px" }}>〒{order!.des_postal_code}</Text>
                        </FormGroup>
                        <FormGroup>
                            <Title line m={{ lg: 0 }}>住所</Title>
                            <Text fontSize="1.2em" m={{ lg: "0 0 0 16px" }}>{order!.des_address}</Text>
                        </FormGroup>
                        <FormGroup>
                            <Title line m={{ lg: 0 }}>電話番号</Title>
                            <Text fontSize="1.2em" m={{ lg: "0 0 0 16px" }}>(Tel) {order!.des_phone_number}</Text>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Box>

            {/* 購入商品 */}
            <Box m={{ lg: "32px 0 0" }}>
                <Card>
                    <CardHeader>
                        購入商品 （{products.length}点）
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        {products.map((product) => (
                            <Box key={product.id} m={{ lg: "0 0 32px" }}>
                                <Text fontWeight="bold" fontSize="1.1em" color="#0a0">数量：{productQty[product.id]}</Text>
                                <ProductCard2 product={product} />
                            </Box>
                        ))}
                    </CardBody>
                </Card>
            </Box>
        </section>
    )
});

export default DetailSection;