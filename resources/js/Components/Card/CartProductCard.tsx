import { Product } from "@/types/base/product";
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
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
import CartQtyForm from "../Form/CartQtyForm";
import DangerButton from "../Button/DangerButton";
import { FaTrashAlt } from "react-icons/fa";
import useCart from "@/Fooks/Api/useCart";
import TrashButton from "../Button/TrashButton";

type Props = {
    product: Product | null;
    qty: number;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const CartProductCard: FC<Props> = memo((props) => {
    const { product, qty, setUpdateCnt } = props;

    const { imageUrl } = useAws();
    const { getFormatNumber } = useFormat();
    const { avgScore, getAvgScore } = useReview();
    const { status, deleteCart } = useCart();

    useEffect(() => {
        product && getAvgScore(product.id);
    }, [product]);

    useEffect(() => {
        if(status === 204) {
            setUpdateCnt((cnt) => cnt + 1);
        }
    }, [status]);

    const onSubmitDelete = () => {
        deleteCart(product!.id);
    };

    return (
        <Flex
            justify={{ lg: "center" }}
        >
            <Link href={product ? route("products.show", product.id) : "#"}>
                <Box w={{ lg: "160px" }} h={{  base: "180px", lg: "140px" }}>
                    <Image h={{ lg: "100%" }} src={imageUrl+product?.image_url} />
                </Box>
            </Link>
            <Card
                h={{ base: "180px", lg: "140px" }}
                w={{ lg: "100%" }}
            >
                <CardHeader bg="var(--main-color)" color="#fff">
                    <h5>{product?.name}</h5>
                </CardHeader>
                <CardBody>
                    <Flex
                        direction={{ base: "column" }}
                        justify={{ lg: "space-between" }}
                        align={{ base: "start" }}
                        gap={{ base: "8px" }}
                    >
                        <Text
                            fontSize="1.2em"
                            fontWeight="bold"
                            color="#f00"
                        >
                            ￥{getFormatNumber(product && product.price)}円
                        </Text>

                        <Flex gap={{ lg: "16px" }}>
                            {/* 数量変更ボタン */}
                            <Box>
                                {product && (
                                    <CartQtyForm
                                        productId={product.id}
                                        qty={qty}
                                        setUpdateCnt={setUpdateCnt}
                                    />
                                )}
                            </Box>

                            {/* 削除ボタン */}
                            <Box>
                                <TrashButton onClick={onSubmitDelete} />
                            </Box>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>
        </Flex>
    )
});

export default CartProductCard;