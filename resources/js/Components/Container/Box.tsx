import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    position?: string;
    top?: string | number;
    bottom?: string | number;
    right?: string | number;
    left?: string | number;
    float?: string;
    m?: { base?: string | number, lg?: string | number };
    p?: { base?: string | number, lg?: string | number };
    w?: { base?: string, lg?: string };
    h?: { base?: string, lg?: string };
    fontSize?: string;
    textAlign?: { base?: string, lg?: string };
    transform?: { base?: string, lg?: string };
};

const Box: FC<Props> = (props) => {
    const { children } = props;

    return (
        <BoxDiv
            props={props}
        >
            {children}
        </BoxDiv>
    )
};

export default Box;


/**
 * CSS Styles
 */
const BoxDiv = styled.div<{props: Props}>`
    position: ${(pos) => pos.props.position};
    top: ${(t) => t.props.top};
    bottom: ${(b) => b.props.bottom};
    right: ${(r) => r.props.right};
    left: ${(l) => l.props.left};
    margin: ${(m) => m.props.m?.lg};
    padding: ${(p) => p.props.p?.lg};
    width: ${(w) => w.props.w?.lg};
    height: ${(h) => h.props.h?.lg};
    text-align: ${(align) => align.props.textAlign?.lg};
    font-size: ${(size) => size.props.fontSize};
    float: ${(f) => f.props.float};
    transform: ${(trans) => trans.props.transform?.lg};
    
    @media screen and (max-width: 768px) {
        margin: ${(m) => m.props.m?.base};
        padding: ${(p) => p.props.p?.base};
        width: ${(w) => w.props.w?.base};
        height: ${(h) => h.props.h?.base};
        text-align: ${(align) => align.props.textAlign?.base};
        transform: ${(trans) => trans.props.transform?.base};
    }
`;