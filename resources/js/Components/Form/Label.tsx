import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    htmlFor?: string;
    required?: boolean;
};

const Label: FC<Props> = (props) => {
    const { children, htmlFor = "", required = false } = props;

    return (
        <LabelStyle
            htmlFor={htmlFor}
            data-required={required}
        >
            {children}
        </LabelStyle>
    )
};

export default Label;


/**
 * CSS Styles
 */
const LabelStyle = styled.label`
    font-weight: bold;
    font-size: 0.9em;

    &[data-required=true] {
        &:before {
            content: "*";
            color: #f00;
            padding-right: 4px;
        }
    }

    @media screen and (max-width: 768px) {
        font-size: 0.8em;
    }
`;
