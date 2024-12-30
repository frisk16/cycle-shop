import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    lastPage: number;
    currentPage: number;
};

const PageButton: FC<Props> = memo((props) => {
    const { lastPage, currentPage } = props;

    return (
        <>
            {[...Array(lastPage - 1)].map((data, index) => (
                <LinkStyle
                    key={index}
                    href={`?page=${index + 1}`}
                    data-active={currentPage === index + 1}
                >
                    {index + 1}
                </LinkStyle>
            ))}
        </>
    )
});

export default PageButton;


/**
 * CSS Styles
 */
const LinkStyle = styled.a`
    padding: 4px;
    text-align: center;
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-bottom: 3px solid #0af;

    &:not(:nth-child(2)) {
        border-left: 1px solid #aaa;
    }

    &:hover {
        background-color: #eef;
    }

    &[data-active=true] {
        background-color: #bbb;
        color: #fff;
        font-weight: bold;
        pointer-events: none;
    }
`;