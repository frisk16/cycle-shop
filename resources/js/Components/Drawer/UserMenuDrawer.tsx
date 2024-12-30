import { FC, memo, MouseEvent, useState } from "react";
import Drawer from "./Drawer";
import DrawerHeader from "./DrawerHeader";
import DrawerCloseButton from "./DrawerCloseButton";
import DrawerBody from "./DrawerBody";
import { IoHome } from "react-icons/io5";
import Flex from "../Container/Flex";
import Text from "../Text/Text";
import { FaUser } from "react-icons/fa";
import { FaCoins, FaDoorOpen } from "react-icons/fa6";
import Divider from "../Text/Divider";
import UserImage from "../Image/UserImage";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import axios from "axios";
import PageLoading from "../Progress/PageLoading";

type Props = {
    isSlide: boolean;
    onReturn: () => void;
};

const UserMenuDrawer: FC<Props> = memo((props) => {
    const { isSlide, onReturn } = props;

    const { auth } = usePage<PageProps>().props;

    const [loading, setLoading] = useState(false);
    const onClickLogout = (e: MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        axios.post(route("logout"))
            .then(() => location.reload())
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    };

    return (
        <>
            {loading && (
                <PageLoading />
            )}
            <Drawer isSlide={isSlide}>
                <DrawerHeader bg="#aaa">
                    {auth.user && (
                        <Flex gap={{ lg: "8px" }}>
                            <UserImage userImage={auth.user.image_url} size="32px" />
                            <Text>{auth.user.name}</Text>
                        </Flex>
                    )}
                </DrawerHeader>
                <DrawerBody>
                    <Flex justify={{ lg: "space-between" }}>
                        <h5>メニュー</h5>
                        <DrawerCloseButton onReturn={onReturn} />
                    </Flex>
                    <Divider m="0 0 8px" />
                    <ul>
                        <li>
                            <a href={route("profile.mypage")}>
                                <Flex gap={{ lg: "4px" }} m={{ lg: "0 0 8px" }}>
                                    <IoHome />
                                    <Text fontWeight="bold">マイページ</Text>
                                </Flex>
                            </a>
                        </li>
                        <li>
                            <a href={route("profile.edit")}>
                                <Flex gap={{ lg: "4px" }} m={{ lg: "0 0 8px" }}>
                                    <FaUser />
                                    <Text fontWeight="bold">アカウント情報</Text>
                                </Flex>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Flex gap={{ lg: "4px" }} m={{ lg: "0 0 8px" }}>
                                    <FaCoins />
                                    <Text fontWeight="bold">お支払い情報</Text>
                                </Flex>
                            </a>
                        </li>
                        <li>
                            <Link href="#" onClick={onClickLogout}>
                                <Flex gap={{ lg: "4px" }}>
                                    <FaDoorOpen />
                                    <Text fontWeight="bold">ログアウト</Text>
                                </Flex>
                            </Link>
                        </li>
                    </ul>
                </DrawerBody>
            </Drawer>
        </>
    )
});

export default UserMenuDrawer;
