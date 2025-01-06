import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    bg?: string;
    color?: string;
    p?: { base?: string | number, lg?: string | number };
};

const CardBody: FC<Props> = (props) => {
    const { children } = props;

    return (
        <CardBodyDiv
            props={props}
        >
            {children}
        </CardBodyDiv>
    )
};

export default CardBody;


/**
 * CSS Styles
 */
const CardBodyDiv = styled.div<{props: Props}>`
    padding: ${(p) => p.props.p?.lg ? p.props.p?.lg : "16px"};
    word-break: break-all;
    background-color: ${(bg) => bg.props.bg};
    color: ${(c) => c.props.color};

    @media screen and (max-width: 768px) {
        font-size: 0.8em;
        padding: ${(p) => p.props.p?.base ? p.props.p?.base : "16px"};
    }
`;