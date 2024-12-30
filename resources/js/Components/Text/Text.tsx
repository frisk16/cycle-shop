import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    m?: { base?: string | number, lg?: string | number };
    p?: { base?: string | number, lg?: string | number };
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textDecoration?: string;
    textAlign?: string;
};

const Text: FC<Props> = (props) => {
    const { children } = props;

    return (
        <TextDiv
            props={props}
        >
            {children}
        </TextDiv>
    )
};

export default Text;


/**
 * CSS Styles
 */
const TextDiv = styled.div<{props: Props}>`
    margin: ${(m) => m.props.m?.lg};
    padding: ${(p) => p.props.p?.lg};
    color: ${(color) => color.props.color};
    font-size: ${(size) => size.props.fontSize};
    font-weight: ${(weight) => weight.props.fontWeight};
    text-decoration: ${(decoration) => decoration.props.textDecoration};
    text-align: ${(align) => align.props.textAlign};
    white-space: pre-wrap;

    @media screen and (max-width: 768px) {
        margin: ${(m) => m.props.m?.base};
        padding: ${(p) => p.props.p?.base};
    }
`;