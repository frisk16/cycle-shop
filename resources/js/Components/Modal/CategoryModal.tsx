import { FC, useEffect } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalCloseButton from "./ModalCloseButton";
import ModalBody from "./ModalBody";
import styled from "styled-components";
import Box from "../Container/Box";
import SearchForm from "../Form/SearchForm";
import useCategory from "@/Fooks/Api/useCategory";
import Loading from "../Progress/Loading";
import { Link } from "@inertiajs/react";
import Divider from "../Text/Divider";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const CategoryModal: FC<Props> = (props) => {
    const { isOpen, onClose } = props;
    const {
        loading,
        majorCategories,
        categories,
        getCategories
    } = useCategory();

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Modal isOpen={isOpen}>

            <ModalHeader>
                <h5>カテゴリーから探す</h5>
                <ModalCloseButton onClose={onClose} />
            </ModalHeader>

            <Divider color="var(--sub-color)" />

            <ModalBody>
                {loading ? (
                    <Loading color="#dd0" textColor="#555" />
                ) : (
                    <SectionGroupDiv>
                        {majorCategories.map((majorCategory) => (
                            <section key={majorCategory.id}>
                                <SectionTitleH5>{majorCategory.name}</SectionTitleH5>
                                <SectionListsUl>
                                    {categories.map((category) => (
                                        majorCategory.id === category.major_category_id && (
                                            <li key={category.id}>
                                                <Link
                                                    href={route("categories.show", category.id)}
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        )
                                    ))}
                                </SectionListsUl>
                            </section>
                        ))}
                    </SectionGroupDiv>
                )}
                <Box m={{ lg: "16px 0 0" }}>
                    <SearchForm onChange={() => {}} />
                </Box>
            </ModalBody>

        </Modal>
    )
};

export default CategoryModal;


/**
 * CSS Styles
 */
const SectionGroupDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const SectionTitleH5 = styled.h5`
    font-weight: bold;
    border-bottom: 1px solid #333;
    margin-bottom: 8px;
`;
const SectionListsUl = styled.ul`
    margin-left: 8px;  
`;
