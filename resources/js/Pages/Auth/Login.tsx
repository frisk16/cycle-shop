import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import Box from '@/Components/Container/Box';
import Container from '@/Components/Container/Container';
import Flex from '@/Components/Container/Flex';
import Checkbox from '@/Components/Form/Checkbox';
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

type Props = {
    status?: String;
    canResetPassword: boolean;
};

const Login: FC<Props> = memo((props) => {
    const { status = "", canResetPassword } = props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { isActive, setIsActive, msgState, value, getMessage } = useMessage();
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        setIsActive(false);
        post(route('login'), {
            preserveScroll: true,
            onError: () => {
                getMessage({ status: "error", value: "入力内容に誤りがあります" });
            },
            onFinish: () => reset('password'),
        });
    };
    
    return (
        <DefaultLayout>
            <Head title="ログイン" />

            <Container size="sm">
                {status && (
                    <Text
                        color="#0a0"
                        fontWeight="bold"
                        m={{ lg: "0 0 16px" }}
                    >
                        {status}
                    </Text>
                )}
                <Card m={{ base: "0 16px" }}>
                    <CardBody>
                        <Box p={{ base: "16px 0", lg: "16px 48px" }}>
                            <form onSubmit={submit}>
                                <FormGroup>
                                    <Label htmlFor="email">Eメールアドレス</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        isInvalid={errors.email !== undefined}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <FormError>{errors.email}</FormError>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="password">パスワード</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        isInvalid={errors.password !== undefined}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <FormError>{errors.password}</FormError>
                                </FormGroup>

                                <FormGroup>
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    >
                                        ログイン状態を維持する
                                    </Checkbox>
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
                                        ログイン
                                    </PrimaryButton>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                        >
                                            <Text
                                                color="#333"
                                                fontSize="0.9em"
                                                textDecoration='underline'
                                            >
                                                パスワードをお忘れですか?
                                            </Text>
                                        </Link>
                                    )}
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

export default Login;
