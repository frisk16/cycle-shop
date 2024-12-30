import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import Box from '@/Components/Container/Box';
import Container from '@/Components/Container/Container';
import Flex from '@/Components/Container/Flex';
import FormError from '@/Components/Form/FormError';
import FormGroup from '@/Components/Form/FormGroup';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import Message from '@/Components/Message/Message';
import Text from '@/Components/Text/Text';
import useMessage from '@/Fooks/useMessage';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

const Register: FC = memo(() => {

        const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

        const { isActive, setIsActive, msgState, value, getMessage } = useMessage();

        const submit: FormEventHandler = (e) => {
            e.preventDefault();

            setIsActive(false);
            post(route('register'), {
                preserveScroll: true,
                onError: () => {
                    getMessage({ status: "error", value: "入力内容に誤りがあります" });
                },
                onFinish: () => reset('password', 'password_confirmation'),
            });
        };

        return (
            <DefaultLayout>
                <Head title="会員登録" />

                <Container size="sm">
                    <Card m={{ base: "0 16px" }}> 
                        <CardBody>
                            <Box p={{ base: "16px 0", lg: "16px 48px" }}>
                                <form onSubmit={submit}>
                                    <FormGroup>
                                        <Label htmlFor="name" required>ユーザー名</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="10文字以内"
                                            value={data.name}
                                            isInvalid={errors.name !== undefined}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <FormError>{errors.name}</FormError>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="email" required>Eメールアドレス</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="xxx@yyy.zzz"
                                            value={data.email}
                                            isInvalid={errors.email !== undefined}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <FormError>{errors.email}</FormError>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="password" required>パスワード</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="最低8文字以上"
                                            value={data.password}
                                            isInvalid={errors.password !== undefined}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <FormError>{errors.password}</FormError>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="password_confirmation" required>パスワード（確認用）</Label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="確認の為、再度入力"
                                            value={data.password_confirmation}
                                            isInvalid={errors.password_confirmation !== undefined}
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                        />
                                        <FormError>{errors.password_confirmation}</FormError>
                                    </FormGroup>

                                    <Flex
                                        wrap="wrap"
                                        gap={{ lg: "16px" }}
                                        p={{ lg: "16px 0 0" }}
                                    >
                                        <PrimaryButton
                                            processing={processing}
                                            w={{ base: "100%" }}
                                        >
                                            この内容で登録
                                        </PrimaryButton>

                                        <Link
                                            href={route('login')}
                                        >
                                            <Text
                                                color="#333"
                                                fontSize="0.9em"
                                                textDecoration='underline'
                                            >
                                                既にアカウントをお持ちの方はこちら
                                            </Text>
                                    </Link>
                                </Flex>
                                </form>
                            </Box>
                        </CardBody>

                    </Card>
                </Container>

                <Message
                    isActive={isActive}
                    status={msgState}
                    value={value}
                />
            </DefaultLayout>
        )
});

export default Register;