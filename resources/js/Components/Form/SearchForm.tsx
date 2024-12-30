import { ChangeEvent, FC } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    phoneStyle?: boolean;
};

const SearchForm: FC<Props> = (props) => {
    const { onChange, phoneStyle = false } = props;

    return (
        <SearchFormStyle data-phone={phoneStyle}>
            <SearchInput
                type="search"
                onChange={onChange}
            />
            <SearchButton>
                <FaSearch />
            </SearchButton>
        </SearchFormStyle>
    )
};

export default SearchForm;


/**
 * CSS Styles
 */
const SearchFormStyle = styled.form`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        &[data-phone=true] {
            display: none;
        }
    }
`;
const SearchInput = styled.input`
    border-radius: 8px 0 0 8px;
    height: 40px;
    border: 1px solid #aaa;
    background-color: #eee;

    @media screen and (max-width: 768px) {
        height: 32px;
    }
`;

const SearchButton = styled.button`
    background-color: #ea0;
    height: 40px;
    width: 40px;
    border: 1px solid #aaa;
    border-radius: 0 8px 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        height: 32px;
        width: 32px;
    }
`;