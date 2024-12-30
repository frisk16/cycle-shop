import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    row?: { base?: string, md?: string, lg?: string };
    col?: { base?: string, md?: string, lg?: string };
    bg?: string;
};

const GridItem: FC<Props> = (props) => {
    const { children } = props;

    return (
        <GridItemDiv
            props={props}
        >
            {children}
        </GridItemDiv>
    )
};

export default GridItem;


/**
 * CSS Styles
 */
const GridItemDiv = styled.div<{props: Props}>`
    grid-row: ${(row) => row.props.row?.lg};
    grid-column: ${(col) => col.props.col?.lg};
    background-color: ${(bg) => bg.props.bg};

    @media screen and (max-width: 768px) {
        grid-row: ${(row) => row.props.row?.base};
        grid-column: ${(col) => col.props.col?.base};
    }
    
    @media screen and (max-width: 1100px) {
        grid-row: ${(row) => row.props.row?.md};
        grid-column: ${(col) => col.props.col?.md};
    }
`;