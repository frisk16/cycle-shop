import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    isOpen: boolean;
};

const Modal: FC<Props> = (props) => {
    const { children, isOpen } = props;

    return (
        <ModalDiv
            data-open={isOpen}
        >
            <ModalContentDiv>
                {children}
            </ModalContentDiv>
        </ModalDiv>
    )
};

export default Modal;


/**
 * CSS Styles
 */
const ModalDiv = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    color: #333;
    inset: 0;
    z-index: -1;
    opacity: 0;
    transition: z-index 0.3s, opacity 0.3s;
    &[data-open=true] {
        opacity: 1;
        z-index: 100;
    }
`;

const ModalContentDiv = styled.div`
    background-color: #fff;
    width: 768px;
    margin: 64px auto 0;
    border-radius: 4px;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;
