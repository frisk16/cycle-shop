import { FC, memo } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import styled from "styled-components";

type Props = {
    lastPage: number;
    currentPage: number;
};

const LastPageButton: FC<Props> = memo((props) => {
    const { lastPage, currentPage } = props;

    return (
        <LinkStyle
            href={`?page=${lastPage - 1}`}
            data-disabled={currentPage === lastPage - 1}
        >
            <FaAnglesRight />
        </LinkStyle>
    )
});

export default LastPageButton;


/**
 * CSS Styles
 */
const LinkStyle = styled.a`
    padding: 8px;
    width: 32px;
    height: 32px;
    background-color: #0af;
    border-radius: 0 8px 8px 0;
    color: #fff;
    border-left: 1px solid #aaa;

    &[data-disabled=true] {
        opacity: 0.5;
        pointer-events: none;
    }
`;