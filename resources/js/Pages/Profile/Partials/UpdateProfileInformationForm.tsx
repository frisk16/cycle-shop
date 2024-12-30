import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import CardHeader from '@/Components/Card/CardHeader';
import Box from '@/Components/Container/Box';
import AreaSelect from '@/Components/Form/AreaSelect';
import FormError from '@/Components/Form/FormError';
import FormGroup from '@/Components/Form/FormGroup';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import Message from '@/Components/Message/Message';
import useMessage from '@/Fooks/useMessage';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

type Props = {
    mustVerifyEmail: boolean;
    status?: string;
};

const UpdateProfileInformation: FC<Props> = memo((props) => {
    const { mustVerifyEmail, status = "" } = props;
    
    const { auth } = usePage<PageProps>().props;

    const { data, setData, patch, errors, processing } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        area: auth.user.area,
        address: auth.user.address,
    });

    const { isActive, setIsActive, msgState, value, getMessage } = useMessage();
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        setIsActive(false);
        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                getMessage({ status: "success", value: "会員情報を変更しました" });
            },
            onError: () => {
                getMessage({ status: "error", value: "入力内容に誤りがあります" });
            }
        });
    };

    return (
        <section>
            <Card
                m={{ lg: "0 0 32px" }}
            >
                <CardHeader bg="var(--section-color)" color="#fff">
                    <h5>会員情報変更</h5>
                </CardHeader>
                <CardBody>
                    <Box w={{ base: "100%", lg: "576px" }}>
                        <form onSubmit={submit}>
                            <FormGroup>
                                <Label htmlFor="name">ユーザー名</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    isInvalid={errors.name !== undefined}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <FormError>{errors.name}</FormError>
                            </FormGroup>
                    
                            <FormGroup>
                                <Label htmlFor="email">Eメールアドレス</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    isInvalid={errors.email !== undefined}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <FormError>{errors.email}</FormError>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="area">都道府県</Label>
                                <AreaSelect
                                    id="area"
                                    value={auth.user.area}
                                    onChange={(e) => setData("area", e.target.value)}
                                />
                                <FormError>{errors.area}</FormError>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="address">住所</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    isInvalid={errors.address !== undefined}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <FormError>{errors.address}</FormError>
                            </FormGroup>
                    
                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="mt-2 text-sm text-gray-800">
                                        Your email address is unverified.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>
                    
                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your
                                            email address.
                                        </div>
                                    )}
                                </div>
                            )}
                    
                            <div>
                                <PrimaryButton processing={processing}>会員情報変更</PrimaryButton>
                            </div>
                        </form>
                    </Box>
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

export default UpdateProfileInformation;