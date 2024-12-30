import { ProductData } from "@/types/base/product";
import { ReviewData } from "@/types/base/review";
import { FC } from "react";
import PageButton from "./PageButton";
import styled from "styled-components";
import FirstPageButton from "./FirstPageButton";
import LastPageButton from "./LastPageButton";

type Props = {
    pageData: ProductData | ReviewData | null;
};

const Paginator: FC<Props> = (props) => {
    const { pageData } = props;

    return (
        <ContainerDiv>

            <FirstPageButton
                currentPage={pageData!.current_page}
            />

            <PageButton
                lastPage={pageData!.last_page}
                currentPage={pageData!.current_page}
            />

            <LastPageButton
                lastPage={pageData!.last_page}
                currentPage={pageData!.current_page}
            />

        </ContainerDiv>
    )
};

export default Paginator;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;