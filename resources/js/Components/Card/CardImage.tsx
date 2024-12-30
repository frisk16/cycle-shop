import { FC } from "react";
import Image from "../Image/Image";

type Props = {
    src?: string;
    h?: { base?: string, lg?: string };
};

const CardImage: FC<Props> = ((props) => {
    const { src = "/img/dummy.png", h = {} } = props;

    return (
        <Image src={src} w="100%" h={{ base: h.base, lg: h.lg}} />
    )
});

export default CardImage;

