import { ChangeEvent, FC } from "react";
import { IoWarning } from "react-icons/io5";
import styled from "styled-components";

type Props = {
    id: string;
    value: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    isInvalid?: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: FC<Props> = (props) => {
    const { id, value, name = "", placeholder = "", disabled = false, isInvalid = false, onChange } = props;

    return (
        <TextareaGroupDiv>
            <TextareaStyle
                id={id}
                data-invalid={isInvalid}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
            />
            {isInvalid && (
                <ErrorIconSpan>
                    <IoWarning />
                </ErrorIconSpan>
            )}
        </TextareaGroupDiv>
    )
};

export default Textarea;


/**
 * CSS Styles
 */
const TextareaGroupDiv = styled.div`
    position: relative;
    width: 100%;
`;
const TextareaStyle = styled.textarea`
    border: 1px solid #aaa;
    &[data-invalid=true] {
        border: 1px solid #f00;
    }
    width: 100%;
    border-radius: 6px;

    @media screen and (max-width: 768px) {
        height: 90%;
    }
`;
const ErrorIconSpan = styled.span`
    position: absolute;
    right: 8px;
    top: 8px;
    margin: auto;
    color: #f50;
`;