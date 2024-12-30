import TopImgCarousel from "@/Components/Carousel/TopImgCarousel";
import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import TopPageMemu from "@/Components/Section/Top/TopPageMenu";
import TopPageSection1 from "@/Components/Section/Top/TopPageSection1";
import TopPageSection2 from "@/Components/Section/Top/TopPageSection2";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Category } from "@/types/base/category";
import { MajorCategory } from "@/types/base/majorCategory";
import { Head } from "@inertiajs/react";
import { FC, memo } from "react";

type PageProps = {
    majorCategories: Array<MajorCategory>;
    categories: Array<Category>;
};

const Top: FC<PageProps> = memo((props) => {
    const { majorCategories, categories } = props;

    return (
        <DefaultLayout>
            <Head title="TOP" />
            
            <TopImgCarousel />

            <Box
                transform={{ base: "translateY(-540px)", lg: "translateY(-360px)" }}
            >
                <Container size="xl"> 
                    <TopPageSection1 />
                </Container>

                <TopPageMemu
                    majorCategories={majorCategories}
                    categories={categories}
                />

                <Container size="xl">
                    <TopPageSection2 />
                </Container>
            </Box>

        </DefaultLayout>
    )
});

export default Top;