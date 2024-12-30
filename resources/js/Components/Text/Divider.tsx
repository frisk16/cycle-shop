import { FC } from "react";
import styled from "styled-components";

type Props = {
    color?: string;
    m?: string | number;
};

const Divider: FC<Props> = (props) => {
    return (
        <HrStyle
            props={props}
        />
    )
};

export default Divider;


/**
 * CSS Styles
 */
const HrStyle = styled.hr<{props: Props}>`
    border: 1px solid ${(c) => c.props.color};
    margin: ${(m) => m.props.m};
`;