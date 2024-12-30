import { FC, ReactNode } from "react"
import styled from "styled-components";

type Props = {
    children: ReactNode;
};

const FormGroup: FC<Props> = (props) => {
    const { children } = props;

    return (
        <FormGroupDiv>
            {children}
        </FormGroupDiv>
    )
};

export default FormGroup;


/**
 * CSS Styles
 */
const FormGroupDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    gap: 2px;
`;
