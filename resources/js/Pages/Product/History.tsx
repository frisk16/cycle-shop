import HistoryPageSection from "@/Components/Section/Product/HistoryPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const History: FC = () => {
    return (
        <DefaultLayout>

            <Head title="閲覧履歴" />

            <HistoryPageSection />

        </DefaultLayout>
    )
}

export default History;