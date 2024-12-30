import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    justify?: { base?: string, lg?: string };
    align?: { base?: string, lg?: string };
    gap?: { base?: string, lg?: string };
    wrap?: string;
    direction?: { base?: string, lg?: string };
    p?: { base?: string | number, lg?: string | number };
    m?: { base?: string | number, lg?: string | number };
    w?: { base?: string, lg?: string };
};

const Flex: FC<Props> = (props) => {
    const { children } = props;

    return (
        <FlexDiv
            props={props}
        >
            {children}
        </FlexDiv>
    )
};

export default Flex;


/**
 * CSS Styles
 */
const FlexDiv = styled.div<{props: Props}>`
    display: flex;
    justify-content: ${(justify) => justify.props.justify?.lg};
    align-items: ${(align) => align.props.align?.lg ? align.props.align?.lg : "center"};
    gap: ${(gap) => gap.props.gap?.lg};
    flex-wrap: ${(wrap) => wrap.props.wrap};
    flex-direction: ${(direction) => direction.props.direction?.lg};
    padding: ${(p) => p.props.p?.lg};
    margin: ${(m) => m.props.m?.lg};
    width: ${(w) => w.props.w?.lg};
    
    @media screen and (max-width: 768px) {
        justify-content: ${(justify) => justify.props.justify?.base};
        align-items: ${(align) => align.props.align?.base ? align.props.align?.base : "center"};
        gap: ${(gap) => gap.props.gap?.base};
        flex-wrap: ${(wrap) => wrap.props.wrap};
        flex-direction: ${(direction) => direction.props.direction?.base};
        padding: ${(p) => p.props.p?.base};
        margin: ${(m) => m.props.m?.base};
        width: ${(w) => w.props.w?.base};
    }
`;
