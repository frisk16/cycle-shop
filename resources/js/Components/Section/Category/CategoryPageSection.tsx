import { FC, memo, useEffect } from "react";
import { Category } from "@/types/base/category";
import useCategory from "@/Fooks/Api/useCategory";
import Container from "@/Components/Container/Container";
import Box from "@/Components/Container/Box";
import Title from "@/Components/Text/Title";
import Loading from "@/Components/Progress/Loading";
import Flex from "@/Components/Container/Flex";
import ProductCard from "@/Components/Card/ProductCard";
import ProductNotFound from "@/Components/Text/ProductNotFound";
import Paginator from "@/Components/Paginator/Paginator";
import PageDescription from "@/Components/Paginator/PageDescription";
import Divider from "@/Components/Text/Divider";

type Props = {
    category: Category | null;
};

const CategoryPageSection: FC<Props> = memo((props) => {
    const { category } = props;

    const { loading, products, getProducts } = useCategory();

    useEffect(() => {
        getProducts({ categoryId: category!.id });
    }, []);

    return (
        <section>
            <Container>

                <Box m={{ lg: "16px 0" }}>
                    <Title>{category!.name}の商品</Title>
                </Box>

                {products && (
                    <Box>
                        <PageDescription pageData={products} m="32px 0 0" />
                        <Divider m="0 0 32px" color="var(--sub-color)" />
                    </Box>
                )}

                <Box>
                    {loading ? (
                        <Loading color="#05f" />
                    ) : (
                        products && products.total > 0 ? (

                            <Flex
                                gap={{ base: "32px", lg: "16px" }}
                                wrap="wrap"
                                justify={{ lg: "center" }}
                            >
                                {products!.data.map((product) => (
                                    <ProductCard product={product} key={product.id} />
                                ))}
                            </Flex>

                        ) : (

                            <ProductNotFound />

                        )
                    )}
                </Box>

                {products && products!.last_page > 1 && (
                    <Box m={{ lg: "32px 0 0" }}>
                        <Paginator pageData={products} />
                    </Box>
                )}
                
            </Container>
        </section>
    )
});

export default CategoryPageSection;

