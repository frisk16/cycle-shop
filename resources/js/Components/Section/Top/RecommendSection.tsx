import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import Image from "@/Components/Image/Image";
import Loading from "@/Components/Progress/Loading";
import Divider from "@/Components/Text/Divider";
import useProduct from "@/Fooks/Api/useProduct";
import useAws from "@/Fooks/useAws";
import { Link } from "@inertiajs/react";
import { FC, memo, useEffect } from "react";

const RecommendSection: FC = memo(() => {
    const { imageUrl } = useAws();

    const { loading, products, getRecommendProducts } = useProduct();

    useEffect(() => {
        getRecommendProducts();
    }, []);

    return (
        <Card>
            <CardHeader>
                <h5>おすすめ商品</h5>
            </CardHeader>
            <Divider color="var(--main-color)" />
            <CardBody>
                {loading ? (
                    <Loading sm />
                ) : (
                    <Grid templateCols="repeat(2, 1fr)" gap={{ base: "8px", lg: "32px" }}>
                        {products.map((product) => (
                            <Link key={product.id} href={route("products.show", product.id)}>
                                <GridItem>
                                    <Image src={imageUrl+product.image_url} />
                                </GridItem>
                            </Link>
                        ))}
                    </Grid>
                )}
            </CardBody>
        </Card>
    )
});

export default RecommendSection;