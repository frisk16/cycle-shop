import { FC, ReactNode } from "react"
import styled from "styled-components";

type Props = {
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
};

const Container: FC<Props> = (props) => {
    const { children, size = "" } = props;

    return (
        <ContainerDiv
            props={props}
            data-size={size}
        >
            {children}
        </ContainerDiv>
    )
};

export default Container;


/**
 * CSS Styles
*/
const ContainerDiv = styled.div<{props: Props}>`
    padding: 16px;

    &[data-size=xl] {
        max-width: 1200px;
        margin: 64px auto;
        padding: 0;
        @media screen and (max-width: 1200px) {
            max-width: 100%;
            margin: 32px 16px;
        }
    }
    &[data-size=lg] {
        max-width: 992px;
        margin: 64px auto;
        padding: 0;
        @media screen and (max-width: 992px) {
            max-width: 100%;
            margin: 32px 16px;
        }
    }
    &[data-size=md] {
        max-width: 768px;
        margin: 64px auto;
        padding: 0;
        @media screen and (max-width: 768px) {
            max-width: 100%;
            margin: 32px 16px;
        }
    }
    &[data-size=sm] {
        max-width: 576px;
        margin: 64px auto;
        padding: 0;
        @media screen and (max-width: 576px) {
            max-width: 100%;
            margin: 32px 16px;
        }
    }

`;