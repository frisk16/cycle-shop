import ReviewPageSection from "@/Components/Section/Review/ReviewPageSection";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Product } from "@/types/base/product";
import { ReviewData } from "@/types/base/review";
import { Head } from "@inertiajs/react";
import { FC } from "react";

type PageProps = {
    reviews: ReviewData | null;
    product: Product | null;
};

const Show: FC<PageProps> = (props) => {
    const { reviews, product } = props;    

    return (
        <DefaultLayout>

            <Head title={product!.name} />

            <ReviewPageSection
                reviews={reviews}
                product={product}
            />
            
        </DefaultLayout>
    )
};

export default Show;