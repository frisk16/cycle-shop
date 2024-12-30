import { FC } from "react";
import { FaAngleLeft } from "react-icons/fa";
import styled from "styled-components";

type Props = {
    onClick: () => void;
};

const CarouselPrevButton: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <PrevButtonSpan onClick={onClick}>
            <FaAngleLeft />
        </PrevButtonSpan>
    )
};

export default CarouselPrevButton;


/**
 * CSS Styles
 */
const PrevButtonSpan = styled.span`
    position: absolute;
    left: 64px;
    top: 25%;
    font-size: 4em;
    color: #ff0;
    cursor: pointer;

    @media screen and (max-width: 768px) {
        top: 15%;
        left: 16px;
        font-size: 3em;
    }
`;