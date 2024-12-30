import Header from "@/Components/Header/Header";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    updateCnt?: number | null;
};

const DefaultLayout: FC<Props> = (props) => {
    const { children, updateCnt } = props;

    return (
        <>
            <Header updateCnt={updateCnt} />

            <main>
                {children}
            </main>
        </>
    )
};

export default DefaultLayout;
