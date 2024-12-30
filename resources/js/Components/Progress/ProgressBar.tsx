import { FC } from "react";
import styled from "styled-components";

type Props = {
    status: number;
    color?: string;
};

const ProgressBar: FC<Props> = (props) => {
    return (
        <ProgressDiv props={props} />
    )
};

export default ProgressBar;


/**
 * CSS Styles
 */
const ProgressDiv = styled.div<{props: Props}>`
    position: relative;
    width: 100%;

    &::before {
        content: '　';
        position: absolute;
        width: 100%;
        left: 0;
        right: 0;
        border: 2px solid #999;
        border-radius: 8px;
        background-color: #eee;
    }

    &::after {
        content: '　';
        position: absolute;
        left: 2px;
        width: ${(w) => w.props.status}%;
        border-radius: ${(w) => w.props.status === 100 ? "8px" : "8px 0 0 8px"};
        background-color: ${(c) => c.props.color ? c.props.color : "#fc0"};
    }
`;