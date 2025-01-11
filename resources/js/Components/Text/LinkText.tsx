import { FC, ReactNode } from "react";
import Text from "./Text";

type Props = {
    children: ReactNode;
};

const LinkText: FC<Props> = (props) => {
    const { children } = props;

    return (
        <Text
            color="#05f"
            fontWeight="bold"
            textDecoration="underline"
            m={{ lg: "0 0 16px" }}
        >
            {children}
        </Text>
    )
};

export default LinkText;