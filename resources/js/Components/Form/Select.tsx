import { ChangeEvent, FC, ReactNode } from "react";
import { IoWarning } from "react-icons/io5";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    id: string;
    value: string | number;
    isInvalid?: boolean;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void | undefined;
};

const Select: FC<Props> = (props) => {
    const { children, id, value, isInvalid = false, onChange } = props;

    return (
        <SelectGroupDiv>
            <SelectStyle
                id={id}
                value={value}
                onChange={onChange}
                data-invalid={isInvalid}
            >
                {children}
            </SelectStyle>
            {isInvalid && (
                <ErrorIconSpan>
                    <IoWarning />
                </ErrorIconSpan>
            )}
        </SelectGroupDiv>
    )
};

export default Select;


/**
 * CSS Styles
 */
const SelectGroupDiv = styled.div`
    position: relative;
    max-width: 100%;
`;
const SelectStyle = styled.select`
    width: 100%;
    border: 1px solid #aaa;
    &[data-invalid=true] {
        border: 1px solid #f00;
    }
    border-radius: 6px;

    @media screen and (max-width: 768px) {
        padding: 6px;
        font-size: 0.9em;
        height: 32px;
        line-height: 16px;
    }
`;
const ErrorIconSpan = styled.span`
    position: absolute;
    right: 32px;
    top: 25%;
    margin: auto;
    color: #f50;
`;