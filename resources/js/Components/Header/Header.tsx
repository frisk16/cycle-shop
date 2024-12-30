import { FC, memo, useEffect } from "react";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { RiFileList3Fill } from "react-icons/ri";
import SearchForm from "../Form/SearchForm";
import CategoryModal from "../Modal/CategoryModal";
import useModal from "@/Fooks/useModal";
import styled from "styled-components";
import { Link, usePage } from "@inertiajs/react";
import Box from "../Container/Box";
import Text from "../Text/Text";
import UserMenuAside from "../Drawer/UserMenuDrawer";
import useDrawer from "@/Fooks/useDrawer";
import Flex from "../Container/Flex";
import { FaSearch } from "react-icons/fa";
import { PageProps } from "@/types";
import UserImage from "../Image/UserImage";
import useCart from "@/Fooks/Api/useCart";

type Props = {
    updateCnt?: number | null;
};

const Header: FC<Props> = memo((props) => {
    const { updateCnt } = props;

    const { auth } = usePage<PageProps>().props;
    const { isOpen, onOpen, onClose } = useModal();
    const { isSlide, onSlide, onReturn } = useDrawer();
    const { getCartsCount, count } = useCart();

    useEffect(() => {
        getCartsCount();
    }, [updateCnt]);

    return (
        <HeaderStyle>
            <TopHeaderDiv>
                <TopNav>
                    <Link href={route("top")}>
                        <h1>CYCLE SHOP (仮)</h1>
                    </Link>
                    <SearchForm
                        onChange={() => {}}
                        phoneStyle
                    />
                </TopNav>
                <NavbarNav>
                    {auth.user ? (
                        // 会員ユーザー
                        <Box>
                            <a href="#" onClick={onSlide}>
                                <Flex
                                    gap={{ lg: "8px" }}
                                >
                                    <UserImage userImage={auth.user.image_url} size="32px" />
                                    <Text fontSize="0.9em" fontWeight="bold">ようこそ、{auth.user.name}様</Text>
                                </Flex>
                            </a>
                        </Box>
                    ) : (
                        // ゲストユーザー
                        <ul>
                            <li>
                                <span>登録済みの方</span>
                                <a href={route("login")}>ログイン</a>
                            </li>
                            <li>
                                <span>初めての方はこちらから</span>
                                <a href={route("register")}>会員登録</a>
                            </li>
                        </ul>
                    )}
                </NavbarNav>
            </TopHeaderDiv>
            <BottomHeaderDiv>
                <NavbarNav>
                    <ul>
                        <li>
                            <a style={{ cursor: "pointer" }} onClick={onOpen}>
                                <FaSearch />
                                商品をさがす
                            </a>
                        </li>
                        <li>
                            <a href={route("carts.index")}>
                                <FaCartShopping />
                                カート |
                                <span id="cart-count">{count}</span>
                            </a>
                        </li>
                        <li>
                            <a href={route("products.history")}>
                                <RiFileList3Fill />
                                閲覧履歴
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <FaHeart />
                                お気に入り
                            </a>
                        </li>
                    </ul>
                </NavbarNav>
            </BottomHeaderDiv>
            
            <UserMenuAside
                isSlide={isSlide}
                onReturn={onReturn}
            />
            <CategoryModal
                isOpen={isOpen}
                onClose={onClose}
            />

        </HeaderStyle>
    )
});

export default Header;


/**
 * CSS Styles
 */
const HeaderStyle = styled.header`
    z-index: 10;
    color: var(--header-text-color);
`;
const TopHeaderDiv = styled.div`
    width: 100%;
    height: 60px;
    background-color: var(--header-top-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
`;
const BottomHeaderDiv = styled.div`
    width: 100%;
    height: 40px;
    background-color: var(--header-bottom-color);
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 16px;

    ul > li:first-child {
        color: var(--sub-color);
        font-weight: bold;
    }
`;
const TopNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 24px;

    h1 {
        margin: 0;
    }
`;
const NavbarNav = styled.nav`
    ul {
        display: flex;
        gap: 16px;
    }
    ul > li {
        display: flex;
        flex-direction: column;
    }
    ul > li > span {
        font-size: 0.8em;
        opacity: 0.7;
    }
    ul > li > a {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    #cart-count {
        color: #f00;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        ul {
            font-size: 0.8em;
            gap: 8px;
        }
    }
`;
