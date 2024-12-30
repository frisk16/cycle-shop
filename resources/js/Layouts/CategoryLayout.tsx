import CategoryAside from "@/Components/Aside/CategoryAside";
import Header from "@/Components/Header/Header";
import { Category } from "@/types/base/category";
import { MajorCategory } from "@/types/base/majorCategory";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    majorCategories: Array<MajorCategory>;
    categories: Array<Category>;
};

const CategoryLayout: FC<Props> = (props) => {
    const { children, majorCategories, categories } = props;

    return (
        <>
            <Header />

            <CategoryAside
                majorCategories={majorCategories}
                categories={categories}
            />

            <main>
                {children}
            </main>
        </>
    )
};

export default CategoryLayout;
