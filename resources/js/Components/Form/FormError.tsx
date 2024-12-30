import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

const FormError: FC<Props> = (props) => {
    const { children } = props;

    return (
        <FormErrorSpan>
            {children}
        </FormErrorSpan>
    )
};

export default FormError;


/**
 * CSS Styles
 */
const FormErrorSpan = styled.span`
    font-size: 0.8em;
    color: #f00;
`;
