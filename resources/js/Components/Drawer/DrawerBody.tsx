import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

const DrawerBody: FC<Props> = (props) => {
    const { children } = props;

    return (
        <DrawerBodyDiv>{children}</DrawerBodyDiv>
    )
};

export default DrawerBody;


/**
 * CSS Styles
 */
const DrawerBodyDiv = styled.div`
    padding: 16px;  
`;

