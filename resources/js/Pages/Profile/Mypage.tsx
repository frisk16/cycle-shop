import Container from "@/Components/Container/Container";
import MypageSection from "@/Components/Section/Mypage/MypageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC, memo } from "react";

const Mypage: FC = memo(() => {

    return (
        <DefaultLayout>
            <Head title="マイページ" />

            <Container size="md">
                
                <MypageSection />
                
            </Container>
        </DefaultLayout>
    )
});

export default Mypage;