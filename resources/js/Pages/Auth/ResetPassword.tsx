import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import Box from '@/Components/Container/Box';
import Container from '@/Components/Container/Container';
import FormError from '@/Components/Form/FormError';
import FormGroup from '@/Components/Form/FormGroup';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

type Props = {
    token: string;
    email: string;
};

const ResetPassword: FC<Props> = memo((props) => {
    const { token, email } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <DefaultLayout>
            <Head title="Reset Password" />

            <Container size="sm">
                <Card m={{ base: "0 16px" }}>
                    <CardBody>
                        <Box p={{ base: "16px 0", lg: "16px 48px" }}>
                            <form onSubmit={submit}>

                                <FormGroup>
                                    <Label htmlFor="email" required>現在のEメールアドレス</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        isInvalid={errors.email !== undefined}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <FormError>{errors.email}</FormError>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="password" required>新しいパスワード</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="最低8文字以上"
                                        isInvalid={errors.password !== undefined}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <FormError>{errors.password}</FormError>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="password_confirmation" required>新しいパスワード（確認用）</Label>
                                    <Input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder="確認の為、再度入力"
                                        isInvalid={errors.password_confirmation !== undefined}
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                    />
                                    <FormError>{errors.password_confirmation}</FormError>
                                </FormGroup>

                                <Box>
                                        <PrimaryButton
                                            processing={processing}
                                            w={{ base: "100%" }}
                                        >
                                            パスワードを更新する
                                        </PrimaryButton>
                                </Box>
                                
                            </form>
                        </Box>
                    </CardBody>
                </Card>
            </Container>
        </DefaultLayout>
    )
});

export default ResetPassword;