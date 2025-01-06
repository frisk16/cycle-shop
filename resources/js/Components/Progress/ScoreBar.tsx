import { FC } from "react";
import styled from "styled-components";
import Text from "../Text/Text";

type Props = {
    status: number;
    color?: string; 
};

const ScoreBar: FC<Props> = (props) => {
    const { status } = props;

    return (
        <div>
            <ScoreSpan props={props} />
            <Text m={{ lg: "0 0 0 5em" }}>：{status}</Text>
        </div>
    )
};

export default ScoreBar;


/**j
 * CSS Styles
 */
const ScoreSpan = styled.span<{ props: Props }>`
    position: relative;
    width: 5em;
    
    &::before {
        content: '★★★★★';
        position: absolute;
        word-break: normal;
        width: 5em;
        color: #aaa;
    }

    &::after {
        content: '★★★★★';
        position: absolute;
        width: ${(w) => w.props.status}em;
        color: ${(c) => c.props.color ? c.props.color : "#fc0"};
        overflow-x: hidden;
        word-break: normal;
        transition: width 0.3s;
    }
`