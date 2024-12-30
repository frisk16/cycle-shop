import { FC } from "react";
import styled from "styled-components";
import Text from "../Text/Text";

type Props = {
    color?: string;
};

const PageLoading: FC<Props> = (props) => {
    return (
        <BackgroundDiv>
            <ContainerDiv>
                <AnimationDiv props={props} />
                <Text color="#fff" fontWeight="bold">お待ちください</Text>
            </ContainerDiv>
        </BackgroundDiv>
    )
};

export default PageLoading;


/**
 * CSS Styles
 */
const BackgroundDiv = styled.div`
    z-index: 1000;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;
const ContainerDiv = styled.div`
    position: fixed;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    inset: 0;
    width: 128px;
    height: 128px;
    padding-top: 16px;
    margin: auto;
`;
const AnimationDiv = styled.div<{props: Props}>`
    width: 64px;
    height: 64px;
    border: 8px solid ${(c) => c.props.color ? c.props.color : "#0af"};
    border-right: 8px solid #ccc;
    border-radius: 50%;
    animation: loading 0.7s linear infinite;

    @keyframes loading {
        100% { transform: rotate(360deg) }
    }
`;