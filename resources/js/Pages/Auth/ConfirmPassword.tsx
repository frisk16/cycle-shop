import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import CardHeader from '@/Components/Card/CardHeader';
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

const ConfirmPassword: FC = memo(() => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <DefaultLayout>
            <Head title="パスワード確認" />

            <Container size="sm">
                <CardHeader>
                    <h5>確認の為、パスワードを入力してください</h5>
                </CardHeader>
                <Card m={{ base: "0 16px" }}>
                    <CardBody>
                        <Box p={{ base: "16px 0", lg: "16px 48px" }}>

                            <Text m={{ lg: "0 0 16px" }}>ここから先は保護されたページの為、パスワードでの確認が必須です</Text>
                            <form onSubmit={submit}>
                                <FormGroup>
                                    <Label htmlFor="password">現在のパスワード</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        isInvalid={errors.password !== undefined}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <FormError>{errors.password}</FormError>
                                </FormGroup>

                                <div>
                                    <PrimaryButton
                                        processing={processing}
                                        w={{ base: "100%" }}
                                    >
                                        確認
                                    </PrimaryButton>
                                </div>
                            </form>
                        </Box>
                    </CardBody>
                </Card>
            </Container>
        </DefaultLayout>
    )
});

export default ConfirmPassword;