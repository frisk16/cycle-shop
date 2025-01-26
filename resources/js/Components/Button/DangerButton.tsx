import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    w?: { base?: string | number, lg?: string | number };
    m?: { base?: string | number, lg?: string | number };
    processing?: boolean;
    disabled?: boolean;
    shadow?: boolean;
    sm?: boolean;
    borderRadius?: string;
    onClick?: () => void;
};

const DangerButton: FC<Props> = (props) => {
    const { children, processing = false, disabled = false, shadow = false, sm = false, onClick = undefined } = props;

    return (
        <DangerButtonStyle
            props={props}
            disabled={processing || disabled}
            data-loading={processing}
            data-shadow={shadow}
            data-sm={sm}
            onClick={onClick}
        >
            {children}
        </DangerButtonStyle>
    )
};

export default DangerButton;


/**
 * CSS Styles
 */
const DangerButtonStyle = styled.button<{props: Props}>`
    position: relative;
    background-color: #f33;
    color: #fff;
    padding: 6px 16px;
    border-radius: ${(r) => r.props.borderRadius ? r.props.borderRadius : "4px"};
    transition: background-color 0.3s;
    width: ${(w) => w.props.w?.lg};
    margin: ${(m) => m.props.m?.lg};
    &[data-shadow=true] {
        box-shadow: 0 0 4px 1px #f88;
    }
    &[data-sm=true] {
        font-size: 0.8em;
        padding: 2px 12px;
    }

    &:hover {
        background-color: #f88;
    }
    &:after {
        display: ${(d) => d.props.processing ? "block" : "none"};
        content: '';
        position: absolute;
        inset: 0;
        margin: auto;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        border-left: 2px solid transparent;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: loading 0.5s infinite linear;
    }
    &[data-loading=true] {
        background-color: #f88;
        color: #f88;
    }
    &:disabled {
        background-color: #f88;
    }

    @keyframes loading {
        100% { transform: rotate(360deg) }        
    }

    @media screen and (max-width: 768px) {
        width: ${(w) => w.props.w?.base};
        margin: ${(m) => m.props.m?.base};
    }
`;