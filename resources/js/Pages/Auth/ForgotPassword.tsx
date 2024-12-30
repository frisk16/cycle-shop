import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import Box from '@/Components/Container/Box';
import Container from '@/Components/Container/Container';
import FormError from '@/Components/Form/FormError';
import FormGroup from '@/Components/Form/FormGroup';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import Text from '@/Components/Text/Text';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

type Props = {
    status?: string;
}

const ForgotPassword: FC<Props> = memo((props) => {
    const { status = "" } = props;
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        post(route('password.email'));
    };

    return (
        <DefaultLayout>
            <Head title="Forgot Password" />

            <Container size="sm">

                <Text
                    m={{ lg: "0 0 16px" }}
                    fontSize="0.9em"
                >
                    登録済みのEメールアドレスを入力し、パスワード再発行メールを送信してください
                </Text>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Card m={{ base: "0 16px" }}>
                    <CardBody>
                        <Box p={{ base: "16px 0", lg: "16px 48px" }}>
                            <form onSubmit={submit}>
                                <FormGroup>
                                    <Label htmlFor="email">登録済みのEメールアドレス</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        isInvalid={errors.email !== undefined}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <FormError>{errors.email}</FormError>
                                </FormGroup>

                                <PrimaryButton
                                    w={{ base: "100%" }}
                                    processing={processing}
                                >
                                    再発行メールを送信
                                </PrimaryButton>
                            </form>
                        </Box>
                    </CardBody>
                </Card>
            </Container>

        </DefaultLayout>
    )
});

export default ForgotPassword;