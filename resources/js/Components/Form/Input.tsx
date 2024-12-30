import { ChangeEvent, FC } from "react";
import { IoWarning } from "react-icons/io5";
import styled from "styled-components";

type Props = {
    type: "text" | "email" | "password" | "number" | "radio" | "tel" | "search" | "checkbox" | "datetime-local" | "button" | "submit" | "file" | "hidden";
    id: string;
    name?: string;
    value?: string | number;
    placeholder?: string;
    checked?: boolean;
    disabled?: boolean;
    isInvalid?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
};

const Input: FC<Props> = (props) => {
    const { type, id, name = "", value = "", placeholder = "", checked = false, disabled = false, isInvalid = false, onChange = undefined } = props;

    return (
        <InputGroupDiv>
            <InputStyle
                type={type}
                id={id}
                data-invalid={isInvalid}
                name={name}
                value={value}
                placeholder={placeholder}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            {isInvalid && (
                <ErrorIconSpan>
                    <IoWarning />
                </ErrorIconSpan>
            )}
        </InputGroupDiv>
    )
}

export default Input;


/**
 * CSS Style
 */
const InputGroupDiv = styled.div`
    position: relative;
    max-width: 100%;
`;
const InputStyle = styled.input`
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 6px;
    &[type=file] {
        &::file-selector-button {
            border: none;
            background-color: #0af;
            border-radius: 6px;
            color: #fff;
        }
    }

    &[data-invalid=true] {
        border: 1px solid #f00;
    }

    @media screen and (max-width: 768px) {
        height: 32px;
        &[type=file] {
            height: 100%;
        }
    }
`;
const ErrorIconSpan = styled.span`
    position: absolute;
    right: 16px;
    top: 25%;
    margin: auto;
    color: #f50;
`;