import { ChangeEvent, FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
    children: ReactNode;
    id: string;
    name?: string;
    value?: string | number;
    checked?: boolean;
    isInvalid?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
};

const Checkbox: FC<Props> = (props) => {
    const { children, id, name = "", value = "", checked = false, isInvalid = false, onChange } = props;

    const invalidStyle = {
        border: "1px solid #f00",
    };

    return (
        <Label htmlFor={id}>
            <CheckboxInput
                type="checkbox"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                style={isInvalid ? invalidStyle : undefined}
            />
            <span>
                {children}
            </span>
        </Label>
    )
};

export default Checkbox;


/**
 * CSS Styles
 */
const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9em;
    cursor: pointer;
`;
const CheckboxInput = styled.input`
    border: 1px solid #aaa;
    border-radius: 4px;
`;


