import { FC, memo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

type Props = {
    onClick: () => void;
};

const TrashButton: FC<Props> = memo((props) => {
    const { onClick } = props;

    return (
        <ButtonStyle onClick={onClick}>
            <FaTrashAlt />
        </ButtonStyle>
    )
});

export default TrashButton;


/**
 * CSS Styles
 */
const ButtonStyle = styled.button`
    color: #f00;

    @media screen and (max-width: 768px) {
        font-size: 1.2em;
    }
`;