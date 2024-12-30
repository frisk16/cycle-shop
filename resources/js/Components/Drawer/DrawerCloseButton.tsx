import { FC } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";

type Props = {
    onReturn: () => void;
};

const DrawerCloseButton: FC<Props> = (props) => {
    const { onReturn } = props;

    return (
        <DrawerCloseButtonSpan onClick={onReturn}>
            <IoIosCloseCircle />
        </DrawerCloseButtonSpan>
    )
};

export default DrawerCloseButton;


/**
 * CSS Styles
 */
const DrawerCloseButtonSpan = styled.span`
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