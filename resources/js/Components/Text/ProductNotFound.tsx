import { FC } from "react";
import Flex from "../Container/Flex";
import Box from "../Container/Box";
import Text from "./Text";
import { BiSearch } from "react-icons/bi";

const ProductNotFound: FC = () => {
    return (
        <Flex
            direction={{ lg: "column" }}
            m={{ lg: "64px" }}
        >
            <Box
                fontSize="5em"
            >
                <BiSearch />
            </Box>
            <Text
                fontWeight="bold"
            >
                お探しの商品は見つかりませんでした
            </Text>
        </Flex>
    )
};

export default ProductNotFound;