import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    bg?: string;
    color?: string;
    p?: string;
};

const CardHeader: FC<Props> = (props) => {
    const { children } = props;

    return (
        <CardHeaderDiv
            props={props}
        >
            {children}
        </CardHeaderDiv>
    )
};

export default CardHeader;


/**
 * CSS Styles
 */
const CardHeaderDiv = styled.div<{props: Props}>`
    padding: ${(p) => p.props.p ? p.props.p : "16px"};
    word-break: break-all;
    background-color: ${(bg) => bg.props.bg};
    color: ${(c) => c.props.color};
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    @media screen and (max-width: 768px) {
        font-size: 0.8em;
    }
`;