import Card from "@/Components/Card/Card";
import CardImage from "@/Components/Card/CardImage";
import Image from "@/Components/Image/Image";
import useAws from "@/Fooks/useAws";
import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
    image: string;
}

const ImageSection: FC<Props> = memo((props) => {
    const { image } = props;

    const { imageUrl } = useAws();

    return (
        <ContainerDiv>
            <Card>
                <CardImage src={imageUrl+image} />
            </Card>
        </ContainerDiv>
    )
});

export default ImageSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    width: 100%;
`;