import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    w?: string | number;
    h?: string | number;
};

const Carousel: FC<Props> = (props) => {
    const { children } = props;

    return (
        <CarouselDiv props={props}>{children}</CarouselDiv>
    )
};

export default Carousel;


/**
 * CSS Styles
 */
const CarouselDiv = styled.div<{props: Props}>`
    position: relative;
    width: ${(w) => w.props.w};
    height: ${(h) => h.props.h};
`;