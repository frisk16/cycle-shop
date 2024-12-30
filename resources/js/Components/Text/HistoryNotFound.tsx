import { FC } from "react";
import Flex from "../Container/Flex";
import Box from "../Container/Box";
import Text from "./Text";
import { RiFileList3Fill } from "react-icons/ri";

const HistoryNotFound: FC = () => {
    return (
        <Flex
            direction={{ lg: "column" }}
            m={{ lg: "64px" }}
        >
            <Box
                fontSize="5em"
            >
                <RiFileList3Fill />
            </Box>
            <Text
                fontWeight="bold"
            >
                閲覧履歴がありません
            </Text>
        </Flex>
    )
};

export default HistoryNotFound;