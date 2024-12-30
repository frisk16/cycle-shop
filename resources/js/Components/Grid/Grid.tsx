import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    templateRows?: string;
    templateCols?: string;
    gap?: { base?: string, lg?: string };
};

const Grid: FC<Props> = (props) => {
    const { children } = props;

    return (
        <GridDiv
            props={props}
        >
            {children}
        </GridDiv>
    )
};

export default Grid;


/**
 * CSS Styles
 */
const GridDiv = styled.div<{props: Props}>`
    display: grid;
    grid-template-rows: ${(row) => row.props.templateRows};
    grid-template-columns: ${(col) => col.props.templateCols};
    gap: ${(gap) => gap.props.gap?.lg};

    @media screen and (max-width: 768px) {
        gap: ${(gap) => gap.props.gap?.base};
    }
`;