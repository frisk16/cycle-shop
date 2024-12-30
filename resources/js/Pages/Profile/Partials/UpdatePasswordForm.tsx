import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import CardHeader from '@/Components/Card/CardHeader';
import Box from '@/Components/Container/Box';
import FormError from '@/Components/Form/FormError';
import FormGroup from '@/Components/Form/FormGroup';
import Input from '@/Components/Form/Input';
import Label from '@/Components/Form/Label';
import Message from '@/Components/Message/Message';
import useMessage from '@/Fooks/useMessage';
import { useForm } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

const UpdatePasswordForm: FC = memo(() => {    
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const { isActive, setIsActive, msgState, value, getMessage } = useMessage();
    
    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
    
        setIsActive(false);
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                getMessage({ status: "success", value: "パスワードが変更されました" });
                reset();
            },
            onError: (errors) => {
                getMessage({ status: "error", value: "入力内容に誤りがあります" });
                if (errors.password) {
                    reset('password', 'password_confirmation');
                }
    
                if (errors.current_password) {
                    reset('current_password');
                }
            },
        });
    };
    
    return (
        <section>
            <Card
                m={{ lg: "0 0 32px" }}
            >
                <CardHeader bg="var(--section-color)" color="#fff">
                    <h5>パスワード変更</h5>
                </CardHeader>
                <CardBody>
                    <Box w={{ base: "100%", lg: "576px" }}>
                        <form onSubmit={updatePassword}>
                            <FormGroup>
                                <Label htmlFor="current_password">現在のパスワード</Label>
                                <Input
                                    type="password"
                                    id="current_password"
                                    isInvalid={errors.current_password !== undefined}
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData('current_password', e.target.value)
                                    }
                                />
                                <FormError>{errors.current_password}</FormError>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">新しいパスワード</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="最低8文字以上"
                                    isInvalid={errors.password !== undefined}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <FormError>{errors.password}</FormError>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password_confirmation">新しいパスワード（確認用）</Label>
                                <Input
                                    type="password"
                                    id="password_confirmation"
                                    placeholder="確認の為、再度入力"
                                    isInvalid={errors.password_confirmation !== undefined}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                />
                                <FormError>{errors.password_confirmation}</FormError>
                            </FormGroup>

                            <div>
                                <PrimaryButton processing={processing}>パスワード変更</PrimaryButton>
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

export default UpdatePasswordForm;