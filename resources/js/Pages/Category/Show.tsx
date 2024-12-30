import Box from "@/Components/Container/Box";
import CategoryPageSection from "@/Components/Section/Category/CategoryPageSection";
import CategoryLayout from "@/Layouts/CategoryLayout";
import { Category } from "@/types/base/category";
import { MajorCategory } from "@/types/base/majorCategory";
import { Head } from "@inertiajs/react";
import { FC, memo } from "react";

type PageProps = {
    category: Category | null;
    majorCategories: Array<MajorCategory>;
    categories: Array<Category>;
};

const Show: FC<PageProps> = memo((props) => {
    const { category, majorCategories, categories } = props;

    return (
        <CategoryLayout
            majorCategories={majorCategories}
            categories={categories}
        >
            
            <Head title={category!.name} />
            
            <Box
                w={{ base: "100%", lg: "calc(100% - 240px)" }}
                m={{ base: 0, lg: "0 0 0 auto" }}
            >
                <CategoryPageSection
                    category={category}
                />
            </Box>

        </CategoryLayout>
    )
});

export default Show;