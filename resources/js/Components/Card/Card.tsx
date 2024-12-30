import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    w?: { base?: string, lg?: string };
    h?: { base?: string, lg?: string };
    m?: { base?: string | number, lg?: string | number };
    bg?: string;
    borderRadius?: string;
    shadow?: boolean;
};

const Card: FC<Props> = (props) => {
    const { children, shadow = false } = props;

    return (
        <CardDiv
            props={props}
            data-shadow={shadow}
        >
            {children}
        </CardDiv>
    )
};

export default Card;


/**
 * CSS Styles
 */
const CardDiv = styled.div<{props: Props}>`
    background-color: ${(bg) => bg.props.bg ? bg.props.bg : "#fff"};
    width: ${(w) => w.props.w?.lg};
    height: ${(h) => h.props.h?.lg};
    margin: ${(m) => m.props.m?.lg};
    border-radius: ${(b) => b.props.borderRadius};

    &[data-shadow=true] {
        box-shadow: 0 0 8px 2px #bbb;
    }

    @media screen and (max-width: 768px) {
        width: ${(w) => w.props.w?.base};
        height: ${(h) => h.props.h?.base};
        margin: ${(m) => m.props.m?.base};
    }
`;
