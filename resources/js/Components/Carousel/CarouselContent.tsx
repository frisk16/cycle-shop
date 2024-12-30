import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    count?: number;
};

const CarouselContent: FC<Props> = (props) => {
    const { children } = props;

    return (
        <CarouselContentUl props={props}>{children}</CarouselContentUl>
    )
};

export default CarouselContent;


/**
 * CSS Styles
 */
const CarouselContentUl = styled.ul<{props: Props}>`
    width: 100%;
    position: relative;

    li {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.3s;
    }
    li#carousel-id-${(cnt) => cnt.props.count} {
        opacity: 1;
    }
`;