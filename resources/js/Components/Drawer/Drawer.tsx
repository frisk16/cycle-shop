import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    isSlide: boolean;
};

const Drawer: FC<Props> = (props) => {
    const { children, isSlide } = props;

    return (
        <DrawerDiv data-slide={isSlide}>
            <DrawerContentDiv data-slide={isSlide}>
                {children}
            </DrawerContentDiv>
        </DrawerDiv>
    );
};

export default Drawer;


/**
 * CSS Styles
 */
const DrawerDiv = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    color: #333;
    inset: 0;
    z-index: -1;
    opacity: 0;
    transition: z-index 0.3s, opacity 0.3s;
    &[data-slide=true] {
        opacity: 1;
        z-index: 100;
    }
`;
const DrawerContentDiv = styled.div`
    position: fixed;
    transform: translateX(256px);
    top: 0;
    right: 0;
    bottom: 0;
    width: 256px;
    background-color: #eee;
    color: #333;
    transition: transform 0.3s;

    &[data-slide=true] {
        transform: translateX(0);
    }
`;