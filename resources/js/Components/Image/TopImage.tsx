import { FC } from "react";
import styled from "styled-components";
import Image from "./Image";

type Props = {
    src: string;
};

const TopImage: FC<Props> = (props) => {
    const { src } = props;

    return (
        <GradationDiv>
            <Image src={src} h={{ base: "360px", lg: "720px" }} w="100%" />
        </GradationDiv>
    )
};

export default TopImage;


/**
 * CSS Styles
 */
const GradationDiv = styled.div`
    position: relative;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(0deg, var(--theme-color), transparent);
    }
`;