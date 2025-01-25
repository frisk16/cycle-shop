import { FC, memo } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import styled from "styled-components";

type Props = {
    processing: boolean;
    w?: { base?: string,  lg?: string };
    m?: { base?: string, lg?: string };
    isRegisted: boolean;
    onClick: () => void;
};

const FavoriteButton: FC<Props> = memo((props) => {
    const { processing, isRegisted, onClick } = props;

    return (
        <form>
            <FavoriteButtonStyle
                props={props}
                disabled={processing}
                data-loading={processing}
                data-is-favorite={isRegisted}
                onClick={onClick}
            >
                {isRegisted ? (
                    <>
                        <FaHeartBroken />
                        お気に入り解除
                    </>
                ) : (
                    <>
                        <FiHeart />
                        お気に入りに追加
                    </>
                )}
            </FavoriteButtonStyle>
        </form>
    )
});

export default FavoriteButton;


/**
 * CSS Styles
 */
const FavoriteButtonStyle = styled.button<{props: Props}>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #fdd;
    color: #f00;
    border: 1px solid #f77;
    padding: 6px 16px;
    border-radius: 8px;
    transition: background-color 0.3s;
    width: ${(w) => w.props.w?.lg};
    margin: ${(m) => m.props.m?.lg};
    &[data-shadow=true] {
        box-shadow: 0 0 4px 1px #faa;
    }

    &:hover {
        background-color: #f77;
        color: #fff;
    }
    &[data-loading=true] {
        background-color: #faa;
        color: #faa;
    }
    &:after {
        display: ${(d) => d.props.processing ? "block" : "none"};
        content: '';
        position: absolute;
        inset: 0;
        margin: auto;
        border: 2px solid #fff;
        border-left: 2px solid transparent;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: loading 0.5s infinite linear;
    }
    &[data-is-favorite=true] {
        background-color: #f77;
        color: #fff;
    }
    &:disabled {
        background-color: #faa;
    }

    @keyframes loading {
        100% { transform: rotate(360deg); }        
    }

    @media screen and (max-width: 768px) {
        width: ${(w) => w.props.w?.base};
        margin: ${(m) => m.props.m?.base};
    }
`;