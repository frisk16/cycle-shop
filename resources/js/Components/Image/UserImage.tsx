import { FC, memo } from "react";
import styled from "styled-components";
import Image from "./Image";

type Props = {
    userImage: string | null;
    size?: string;
};

const UserImage: FC<Props> = memo((props) => {
    const { userImage, size = "64px" } = props;

    return (
        <ContainerDiv props={props}>
            {userImage ? (
                <Image
                    src={userImage}
                    borderRadius="50%"
                    w={size}
                    h={{ lg: size }}
                />
            ) : (
                <Image
                    src="/img/dummy_user.png"
                    borderRadius="50%"
                />
            )}
        </ContainerDiv>
    )
});

export default UserImage;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div<{props: Props}>`
    width: ${(w) => w.props.size ? w.props.size : "64px"};
    height: ${(h) => h.props.size ? h.props.size : "64px"};
`;