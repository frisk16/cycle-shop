import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    m?: { base?: string | number, lg?: string | number };
    p?: { base?: string | number, lg?: string | number };
    line?: boolean;
    color?: string;
    sm?: boolean;
};

const Title: FC<Props> = (props) => {
    const { children, line = false, sm = false } = props;

    return (
        <TitleH5
            props={props}
            data-line={line}
            data-sm={sm}
        >
            {children}
        </TitleH5>
    )
};

export default Title;


/**
 * CSS Styles
 */
const TitleH5 = styled.h5<{ props: Props }>`
    margin-bottom: 16px;
    margin: ${(m) => m.props.m?.lg};
    padding: ${(p) => p.props.p?.lg};
    color: ${(c) => c.props.color};
    font-weight: bold;
    font-size: 1.1em;
    
    &::before {
        content: '▶';
        margin-right: 8px;
    }

    &[data-line=true] {
        border-bottom: 1px solid;
    }
    &[data-sm=true] {
        font-size: 0.95em;
    }
    
    @media screen and (max-width: 768px) {
        margin: ${(m) => m.props.m?.base};
        padding: ${(p) => p.props.p?.base};
    }
`;