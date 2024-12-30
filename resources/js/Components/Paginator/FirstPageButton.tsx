import { FC, memo } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import styled from "styled-components";

type Props = {
    currentPage?: number;
};

const FirstPageButton: FC<Props> = memo((props) => {
    const { currentPage } = props;

    return (
        <LinkStyle
            href="?page=1"
            data-disabled={currentPage === 1}
        >
            <FaAnglesLeft />
        </LinkStyle>
    )
});

export default FirstPageButton;


/**
 * CSS Styles
 */
const LinkStyle = styled.a`
    padding: 8px;
    width: 32px;
    height: 32px;
    background-color: #0af;
    border-radius: 8px 0 0 8px;
    color: #fff;
    border-right: 1px solid #aaa;

    &[data-disabled=true] {
        opacity: 0.5;
        pointer-events: none;
    }
`;