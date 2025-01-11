import Card from "@/Components/Card/Card";
import CardBody from "@/Components/Card/CardBody";
import CardHeader from "@/Components/Card/CardHeader";
import Container from "@/Components/Container/Container";
import LinkText from "@/Components/Text/LinkText";
import Text from "@/Components/Text/Text";
import { Link } from "@inertiajs/react";
import { FC, memo } from "react";

const CompletePageSection: FC = memo(() => {
    return (
        <section>
            <Container size="xl">

                <Link href="/">
                    <LinkText>&laquo; TOPへ戻る</LinkText>
                </Link>

                <Card>
                    <CardHeader bg="var(--main-color)">
                        <h5>注文受付完了</h5>
                    </CardHeader>
                    <CardBody>
                        <Text>
                            注文が完了しました、お買い上げありがとうございます。
                        </Text>
                    </CardBody>
                </Card>
            </Container>
        </section>
    )
});

export default CompletePageSection;