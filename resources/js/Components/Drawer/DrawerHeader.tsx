import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    bg?: string;
};

const DrawerHeader: FC<Props> = (props) => {
    const { children } = props;

    return (
        <DrawerHeaderDiv props={props}>
            {children}
        </DrawerHeaderDiv>
    )
};

export default DrawerHeader;


/**
 * CSS Styles
 */
const DrawerHeaderDiv = styled.div<{props: Props}>`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.1em;
    background-color: ${(bg) => bg.props.bg};
`;