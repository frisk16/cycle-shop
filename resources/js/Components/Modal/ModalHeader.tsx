import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    bg?: string;
};

const ModalHeader: FC<Props> = (props) => {
    const { children } = props;

    return (
        <ModalHeaderDiv props={props}>
            {children}
        </ModalHeaderDiv>
    )
};

export default ModalHeader;


/**
 * CSS Styles
 */
const ModalHeaderDiv = styled.div<{props: Props}>`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.1em;
    background-color: ${(bg) => bg.props.bg};
`;