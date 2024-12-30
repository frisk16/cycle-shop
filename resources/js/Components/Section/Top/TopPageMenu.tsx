import { FC, memo } from "react";
import styled from "styled-components";
import Container from "../../Container/Container";
import Title from "../../Text/Title";
import { MajorCategory } from "@/types/base/majorCategory";
import { Category } from "@/types/base/category";
import { Link } from "@inertiajs/react";

type Props = {
    majorCategories: Array<MajorCategory>;
    categories: Array<Category>;
};

const TopPageMemu: FC<Props> = memo((props) => {
    const { majorCategories, categories } = props;

    return (
        <TopPageSection>
            <Container>
                <Title>カテゴリーから探す</Title>

                <SectionGroupDiv>
                    {majorCategories.map((majorCategory) => (
                        <section key={majorCategory.id}>
                            <SectionTitleH5>{majorCategory.name}</SectionTitleH5>
                            <SectionListsUl>
                                {categories.map((category) => (
                                    category.major_category_id === majorCategory.id && (
                                        <li key={category.id}>
                                            <Link
                                                href={route("categories.show", category.id)}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    )
                                ))}
                            </SectionListsUl>
                        </section>
                    ))}
                </SectionGroupDiv>

            </Container>
        </TopPageSection>
    )
});

export default TopPageMemu;


/**
 * CSS Styles
 */
const TopPageSection = styled.section`
    padding: 32px 0;
    background-color: var(--section-color);
    color: #fff;
`;
const SectionGroupDiv = styled.div`
    display: flex;
    gap: 32px;
    justify-content: start;
    flex-wrap: wrap;
    margin-left: 64px;

    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;
const SectionTitleH5 = styled.h5`
    font-weight: bold;
    border-bottom: 1px solid #fff;
    margin-bottom: 8px;
    color: #0ff;
`;
const SectionListsUl = styled.ul`
    margin: auto;
`;
