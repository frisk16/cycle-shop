import { FC } from "react";
import { FaAngleRight } from "react-icons/fa";
import styled from "styled-components";

type Props = {
    onClick: () => void;
};

const CarouselNextButton: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <NextButtonSpan onClick={onClick}>
            <FaAngleRight />
        </NextButtonSpan>
    )
};

export default CarouselNextButton;


/**
 * CSS Styles
 */
const NextButtonSpan = styled.span`
    position: absolute;
    right: 64px;
    top: 25%;
    font-size: 4em;
    color: #ff0;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        top: 15%;
        right: 16px;
        font-size: 3em;
    }
`;