import { FC, memo, MouseEvent, useState } from "react";
import { FaCoins, FaHeart, FaUser } from "react-icons/fa6";
import styled from "styled-components";
import { Link } from "@inertiajs/react";
import { RiFileList3Fill } from "react-icons/ri";
import Grid from "@/Components/Grid/Grid";
import GridItem from "@/Components/Grid/GridItem";
import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import Flex from "@/Components/Container/Flex";
import Box from "@/Components/Container/Box";
import Text from "@/Components/Text/Text";
import { FaDoorOpen, FaRegCommentDots } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import axios from "axios";
import PageLoading from "@/Components/Progress/PageLoading";

const MypageSection: FC = memo(() => {
    const [loading, setLoading] = useState(false);

    const onClickLogout = (e: MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        axios.post(route("logout"))
        .then(() => {
            location.reload();
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        });
    };

    return (
        <section>
            {loading && (
                <PageLoading />
            )}

            <Grid
                templateCols="repeat(2, 1fr)"
                gap={{ lg: "8px" }}
            >

                <GridItem col={{ base: "1 / 3", lg: "1 / 2" }}>
                    <Link href={route("profile.edit")}>
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <FaUser />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>アカウント情報</CardTitle>
                                        <Text fontSize="0.8em">
                                            Eメールアドレス、パスワード等の変更
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ base: "1 / 3", lg: "2 / 3" }}>
                    <Link href="#">
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <FaCoins />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>お支払い情報</CardTitle>
                                        <Text fontSize="0.8em">
                                            お支払い方法の変更
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ base: "1 / 3", lg: "1 / 2" }}>
                    <Link href={route("orders.index")}>
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <RiFileList3Fill />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>注文履歴</CardTitle>
                                        <Text fontSize="0.8em">
                                            過去購入した商品の履歴
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ base: "1 / 3", lg: "2 / 3" }}>
                    <Link href="#">
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <FaHeart />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>お気に入り</CardTitle>
                                        <Text fontSize="0.8em">
                                            保存した商品のリスト
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ base: "1 / 3", lg: "1 / 2" }}>
                    <Link href="#">
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <FaRegCommentDots />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>レビュー一覧</CardTitle>
                                        <Text fontSize="0.8em">
                                            各商品ごとのレビュー一覧
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ base: "1 / 3", lg: "2 / 3" }}>
                    <Link href={route("products.history")}>
                        <Card shadow>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <GoHistory />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>閲覧履歴</CardTitle>
                                        <Text fontSize="0.8em">
                                            過去に閲覧した商品の履歴
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

                <GridItem col={{ lg: "1 / 3" }}>
                    <Link href="#" onClick={onClickLogout}>
                        <Card shadow w={{ base: "100%", lg: "50%" }} m={{ lg: "32px auto" }}>
                            <CardBody>
                                <Flex
                                    gap={{ lg: "16px" }}
                                >
                                    <Box fontSize="3em">
                                        <FaDoorOpen />
                                    </Box>
                                    <Box w={{ lg: "100%" }}>
                                        <CardTitle>ログアウト</CardTitle>
                                        <Text fontSize="0.8em">
                                            ログアウト後、TOPへ戻ります
                                        </Text>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>
                </GridItem>

            </Grid>
        </section>
    )
});

export default MypageSection;


/**
 * CSS Styles
 */
const CardTitle = styled.h5`
    font-weight: bold;
    border-bottom: 1px solid #333;
    margin-bottom: 8px;
`;
