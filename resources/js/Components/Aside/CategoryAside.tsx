import { FC, memo, useMemo, useState } from "react";
import styled from "styled-components";
import Title from "../Text/Title";
import Box from "../Container/Box";
import { Link, usePage } from "@inertiajs/react";
import { MajorCategory } from "@/types/base/majorCategory";
import { Category } from "@/types/base/category";

type Props = {
    majorCategories: Array<MajorCategory>;
    categories: Array<Category>;
}

const CategoryAside: FC<Props> = memo((props) => {
    const { majorCategories, categories } = props;
    
    const [targetId, setTargetId] = useState(0);
    
    useMemo(() => {
        const urlArray = usePage().url.split("/");
        setTargetId(Number(urlArray[2]));
    }, []);
    
    return (
        <aside>
            <AsideDiv>
                <Title
                    line
                >
                    商品をさがす
                </Title>

                <div>
                    {majorCategories.map((majorCategory) => (
                        <Box m={{ lg: "0 0 24px" }} key={majorCategory.id}>
                            <Title
                                sm
                                m={{ lg: "0 0 2px 16px" }}
                            >
                                {majorCategory.name}
                            </Title>
                            <ul>
                                {categories.map((category) => (
                                    majorCategory.id === category.major_category_id && (
                                        <li key={category.id}>
                                            <Link
                                                href={route("categories.show", category.id)}
                                            >
                                                <LinkSpan
                                                    data-target={category.id === targetId}
                                                >
                                                    {category.name}
                                                </LinkSpan>
                                            </Link>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </Box>
                    ))}
                </div>
            </AsideDiv>
        </aside>
    )
});

export default CategoryAside;


/**
 * CSS Styles
 */
const AsideDiv = styled.div`
    position: absolute;
    left: 0;
    top: 100px;
    background-color: var(--aside-color);
    width: 240px;
    padding: 16px;
    margin: 32px 0;
    border-right: 1px solid var(--main-color);
    color: var(--aside-text-color);

    ul {
        margin-left: 32px;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
const LinkSpan = styled.span`
    &[data-target=true] {
        color: var(--sub-color);
        font-weight: bold;
        border-bottom: 1px solid;
    }
`;