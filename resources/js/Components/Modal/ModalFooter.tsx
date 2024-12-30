import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

const ModalFooter: FC<Props> = (props) => {
    const { children } = props;

    return (
        <ModalFooterDiv>{children}</ModalFooterDiv>
    );
};

export default ModalFooter;


/**
 * CSS Styles
 */
const ModalFooterDiv = styled.div`
    padding: 8px 16px 16px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 16px;
`;