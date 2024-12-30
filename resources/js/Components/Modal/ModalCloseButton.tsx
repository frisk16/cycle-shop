import { FC } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";

type Props = {
    onClose: () => void;
};

const ModalCloseButton: FC<Props> = (props) => {
    const { onClose } = props;

    return (
        <ModalCloseButtonSpan onClick={onClose}>
            <IoIosCloseCircle />
        </ModalCloseButtonSpan>
    )
};

export default ModalCloseButton;


/**
 * CSS Styles
 */
const ModalCloseButtonSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    &:after {
        content: '閉じる';
        font-size: 0.8em;
        font-weight: bold;
    }
`;