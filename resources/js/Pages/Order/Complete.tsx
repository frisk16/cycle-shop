import CompletePageSection from "@/Components/Section/Order/CompletePageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const Complete: FC = () => {
    return (
        <DefaultLayout>
            <Head title="注文完了" />

            <CompletePageSection />
        </DefaultLayout>
    )
}

export default Complete;