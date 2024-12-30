import { FC } from "react";
import styled from "styled-components";

type Props = {
    src?: string;
    h?: { base?: string, lg?: string };
    w?: string;
    borderRadius?: string;
};

const Image: FC<Props> = (props) => {
    const { src = "/img/dummy.png" } = props;

    return (
        <ImageStyle
            props={props}
            src={src}
        />
    )
};

export default Image;


/**
 * CSS Styles
 */
const ImageStyle = styled.img<{props: Props}>`
    vertical-align: bottom;
    object-fit: cover;
    width: ${(w) => w.props.w};
    height: ${(h) => h.props.h?.lg};
    border-radius: ${(b) => b.props.borderRadius};

    @media screen and (max-width: 768px) {
        height: ${(h) => h.props.h?.base};
    }
`;
