import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

const ModalBody: FC<Props> = (props) => {
    const { children } = props;

    return (
        <ModalBodyDiv>{children}</ModalBodyDiv>
    )
};

export default ModalBody;


/**
 * CSS Styles
 */
const ModalBodyDiv = styled.div`
    padding: 16px;  
`;

