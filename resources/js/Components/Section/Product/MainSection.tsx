import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Box from "@/Components/Container/Box";
import ScoreBar from "@/Components/Progress/ScoreBar";
import Divider from "@/Components/Text/Divider";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useReview from "@/Fooks/Api/useReview";
import useFormat from "@/Fooks/useFormat";
import { Category } from "@/types/base/category";
import { Product } from "@/types/base/product";
import { Link } from "@inertiajs/react";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    product: Product | null;
    category: Category | null;
    avgScore: number;
}

const MainSection: FC<Props> = memo((props) => {
    const { product, category, avgScore } = props;

    const { getFormatNumber } = useFormat();

    return (
        <ContainerDiv>
            <Box m={{ lg: "0 0 16px" }}>
                <Link href="/">TOP</Link> &raquo;
                <Link href={route("categories.show", product!.category_id)}> {category!.name}</Link>
            </Box>

            <Card m={{ lg: "0 0 16px" }}>
                <CardHeader bg="var(--main-color)" color="#fff">
                    {product!.name}
                </CardHeader>
            </Card>

            <Card>
                <CardBody>
                    <Box>
                        <ScoreBar status={avgScore} />
                    </Box>
                    <Text fontSize="2em" color="#f00">
                        ￥{getFormatNumber(product!.price)}円
                    </Text>
                    <Box>
                        {product!.postage > 0 ? (
                            <Text fontWeight="bold" color="#00c">送料：￥{product!.postage}円</Text>
                        ) : (
                            <Text fontWeight="bold" color="#00c">送料：無料</Text>
                        )}
                    </Box>
                    <Divider m="16px 0" />
                    <Title>商品概要</Title>
                    {product!.description}
                </CardBody>
            </Card>
        </ContainerDiv>
    )
});

export default MainSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    word-break: break-all;
    width: 100%;
    margin-bottom: 16px;
`