import { FC } from "react";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleXmark, FaTriangleExclamation } from "react-icons/fa6";
import styled from "styled-components";

type Props = {
    isActive: boolean;
    value: string;
    status: "info" | "success" | "error" | "warning" | "primary" | string;
};

const Message: FC<Props> = (props) => {
    const { isActive, value, status } = props;

    return (
        <MessageDiv
            data-state={status}
            data-active={isActive}
        >
            {status === "primary" && (
                <span>
                    <FaCircleExclamation />
                </span>
            )}
            {status === "error" && (
                <span>
                    <FaCircleXmark />
                </span>
            )}
            {status === "success" && (
                <span>
                    <FaCircleCheck />
                </span>
            )}
            {status === "warning" && (
                <span>
                    <FaTriangleExclamation />
                </span>
            )}
            {status === "info" && (
                <span>
                    <FaCircleInfo />
                </span>
            )}
            {value}
        </MessageDiv>
    )
};

export default Message;


/**
 * CSS Styles
 */
const MessageDiv = styled.div`
    position: fixed;
    max-width: 320px;
    top: 24px;
    right: 0;
    left: 0;
    margin: auto;
    padding: 16px 32px;
    font-weight: bold;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    opacity: 0;
    z-index: -1;
    transform: translateY(-64px);
    &[data-active=true] {
        animation: active 3s ease-out;
    }

    span {
        font-size: 1.4em;
    }

    @keyframes active {
        0% {
            z-index: -1;
            opacity: 0;
            transform: translateY(-64px);
        }
        15% {
            z-index: 10;
            opacity: 1;
            transform: translateY(0);
        }
        85% {
            z-index: 10;
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            z-index: -1;
            opacity: 0;
            transform: translateY(-64px);
        }
    }

    &[data-state=info] {
        background-color: #0cc;
        box-shadow: 0 0 6px 1px #088;
    }
    &[data-state=success] {
        color: #fff;
        background-color: #4c4;
        box-shadow: 0 0 6px 1px #080;
    }
    &[data-state=error] {
        color: #fff;
        background-color: #f44;
        box-shadow: 0 0 6px 1px #b00;
    }
    &[data-state=warning] {
        background-color: #cc0;
        box-shadow: 0 0 6px 1px #880;
    }
    &[data-state=primary] {
        color: #fff;
        background-color: #55f;
        box-shadow: 0 0 6px 1px #11b;
    }
`;