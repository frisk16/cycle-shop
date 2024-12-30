import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    bg?: string;
    color?: string;
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
    padding: 16px;
    word-break: break-all;
    background-color: ${(bg) => bg.props.bg};
    color: ${(c) => c.props.color};

    @media screen and (max-width: 768px) {
        font-size: 0.8em;
    }
`;