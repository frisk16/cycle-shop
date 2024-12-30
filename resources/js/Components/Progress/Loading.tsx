import { FC } from "react";
import styled from "styled-components";

type Props = {
    color?: string | "#fff";
    textColor?: string | "#fff";
    sm?: boolean;
};

const Loading: FC<Props> = (props) => {
    const { sm = false } = props;

    return (
        <LoadingContentDiv data-sm={sm}>
            <LoadingBodyDiv
                props={props}
                data-sm={sm}
            >

                <LoadingAnimationDiv
                    props={props}
                    data-sm={sm}
                />
                <p>読み込み中...</p>

            </LoadingBodyDiv>
        </LoadingContentDiv>
    )
};

export default Loading;


/**
 * CSS Styles
 */
const LoadingContentDiv = styled.div`
    position: relative;
    height: 240px;

    &[data-sm=true] {
        height: 120px;
    }
`;
const LoadingBodyDiv = styled.div<{props: Props}>`
    position: absolute;
    inset: 0;
    width: 128px;
    height: 128px;
    margin: auto;

    p {
        color: ${(c) => c.props.textColor};
        font-size: 0.9em;
        font-weight: bold;
        text-align: center;
        margin-top: 8px;
    }

    &[data-sm=true] {
        p {
            font-size: 0.7em;
        }
    }
`;
const LoadingAnimationDiv = styled.div<{props: Props}>`
    width: 64px;
    height: 64px;
    margin: auto;
    border: 8px solid ${(c) => c.props.color};
    border-right: 8px solid #aaa;
    border-radius: 50%;
    animation: rotate 0.5s linear infinite;
    
    &[data-sm=true] {
        width: 32px;
        height: 32px;
        border: 4px solid ${(c) => c.props.color};
        border-right: 4px solid #aaa;
    }

    @keyframes rotate {
        100% { transform: rotate(360deg); }
    }
`;
