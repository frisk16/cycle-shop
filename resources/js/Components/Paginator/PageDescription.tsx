import { ProductData } from "@/types/base/product";
import { ReviewData } from "@/types/base/review";
import { FC } from "react";
import styled from "styled-components";
import Flex from "../Container/Flex";
import Box from "../Container/Box";
type Props = {
    pageData: ProductData | ReviewData | null;
    m?: string | number;
};

const PageDescription: FC<Props> = (props) => {
    const { pageData } = props;

    return (
        <ContainerDiv props={props}>
            <Flex justify={{ lg: "space-between" }}>
                <Box>{pageData!.current_page} / {pageData!.last_page} Page</Box>
                <Box>全{pageData!.total}件中 {pageData!.data.length}件表示</Box>
            </Flex>
        </ContainerDiv>
    )
};

export default PageDescription;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div<{props: Props}>`
    margin: ${(m) => m.props.m};
`;