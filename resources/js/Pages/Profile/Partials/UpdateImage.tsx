import DangerButton from '@/Components/Button/DangerButton';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import CardHeader from '@/Components/Card/CardHeader';
import Box from '@/Components/Container/Box';
import Flex from '@/Components/Container/Flex';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import UserImage from '@/Components/Image/UserImage';
import Message from '@/Components/Message/Message';
import PageLoading from '@/Components/Progress/PageLoading';
import Text from '@/Components/Text/Text';
import useGetImageUrl from '@/Fooks/useGetImageUrl';
import useMessage from '@/Fooks/useMessage';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

const UpdateImage: FC = memo(() => {    
    const { isActive, setIsActive, msgState, value, getMessage } = useMessage();

    const { auth } = usePage<PageProps>().props;
    
    const {data, setData, post, reset, processing} = useForm<{userImage: File | null}>({
        userImage: null,
    });
    const { imageUrl } = useGetImageUrl({ image: data.userImage });

    const onSubmitUpdate: FormEventHandler = (e) => {
        e.preventDefault();

        setIsActive(false);
        post(route("profile.update_image"), {
            preserveScroll: true,
            onSuccess: () => {
                getMessage({ status: "success", value: "プロフィール画像を更新しました" });
                reset();
            },
            onError: (err) => {
                getMessage({ status: "error", value: "更新中に問題が発生しました" });
                console.log(err);
            },
        });
    }
    
    return (
        <section>
            
            {processing && (
                <PageLoading />
            )}

            <Card m={{ lg: "0 0 32px" }}>
                <CardHeader bg="var(--section-color)" color="#fff">
                    <h5>アイコン画像</h5>
                </CardHeader>
                <CardBody>
                    <Flex gap={{ lg: "16px" }}>

                        {/* 現在の画像 */}
                        <Box>
                            <UserImage userImage={auth.user.image_url} />
                        </Box>

                        {/* プレビュー画像 */}
                        {data.userImage ? (
                            <>
                                <Text fontSize="2em">&raquo;</Text>
                                <Box>
                                    <UserImage userImage={imageUrl} />
                                </Box>
                            </>
                        ) : (
                            <></>
                        )}

                        {/* 画像取り込みフォーム */}
                        <Box>
                            <form method="post" encType="multipart/form-data" onSubmit={onSubmitUpdate}>
                                <Label htmlFor="userImage">テーマ画像</Label>
                                <Input type="file" id="userImage" onChange={(e) => setData("userImage", e.target.files![0])} />
                                {auth.user.image_url && !data.userImage ? (
                                    <DangerButton
                                        sm
                                        m={{ lg: "8px 0 0" }}
                                        processing={processing}
                                    >
                                        削除
                                    </DangerButton>
                                ) : (
                                    <PrimaryButton
                                        sm
                                        m={{ lg: "8px 0 0" }}
                                        disabled={auth.user.image_url === null && !data.userImage}
                                        processing={processing}
                                    >
                                        更新
                                    </PrimaryButton>
                                )}
                            </form>
                        </Box>
                    </Flex>
                </CardBody>
            </Card>

            <Message
                isActive={isActive}
                status={msgState}
                value={value}
            />
        </section>
    )
});

export default UpdateImage;