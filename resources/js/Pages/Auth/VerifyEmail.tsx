import PrimaryButton from '@/Components/Button/PrimaryButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import Container from '@/Components/Container/Container';
import Flex from '@/Components/Container/Flex';
import Text from '@/Components/Text/Text';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FC, FormEventHandler, memo } from 'react';

type Props = {
    status?: string;
};

const VerifyEmail: FC<Props> = memo((props) => {
    const { status = "" } = props;

    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <DefaultLayout>
            <Head title="メールを確認してください" />

            <Container size="sm">

                <Card m={{ base: "0 16px" }}>
                    <CardBody>
                        <Text>ご利用ありがとうございます、現在まだ仮登録状態です。</Text>
                        <Text>ご登録いただいたEメールアドレス宛に本登録メールを送信しました、ご確認ください。</Text>

                        <Text m={{ lg: "16px 0 0" }}>もし、メールが届いていない場合は以下のボタンから登録メールを再発行してください。</Text>
                        {status === 'verification-link-sent' && (
                            <Text
                                fontWeight="bold"
                                fontSize="0.9em"
                                color="#0a0"
                                m={{ lg: "16px 0 0" }}
                            >
                                ※本登録メールを再発行しました、メールをご確認ください。
                            </Text>
                        )}

                        <form onSubmit={submit}>
                            <Flex
                                m={{ lg: "16px 0 0" }}
                                justify={{ lg: "space-between" }}
                                wrap="wrap"
                                gap={{ lg: "8px" }}
                            >
                                <PrimaryButton
                                    processing={processing}
                                    w={{ base: "100%" }}
                                >
                                    本登録メールを再発行
                                </PrimaryButton>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    <Text textDecoration="underline">ログアウトする</Text>
                                    
                                </Link>
                            </Flex>
                        </form>
                    </CardBody>
                </Card>

            </Container>
        </DefaultLayout>
    )
});

export default VerifyEmail;