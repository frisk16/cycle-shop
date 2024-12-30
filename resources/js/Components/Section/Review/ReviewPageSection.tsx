import ProductCard2 from "@/Components/Card/ProductCard2";
import ReviewCard from "@/Components/Card/ReviewCard";
import Box from "@/Components/Container/Box";
import Container from "@/Components/Container/Container";
import PageDescription from "@/Components/Paginator/PageDescription";
import Paginator from "@/Components/Paginator/Paginator";
import Divider from "@/Components/Text/Divider";
import { Product } from "@/types/base/product";
import { ReviewData } from "@/types/base/review";
import { FC, memo } from "react";

type Props = {
    reviews: ReviewData | null;
    product: Product | null;
};

const ReviewPageSection: FC<Props> = memo((props) => {
    const { reviews, product } = props;

    return (
        <section>
            <Container size="lg">

                <ProductCard2 product={product} />

                <PageDescription pageData={reviews} m="32px 0 0" />

                <Divider m="0 0 32px" />

                {reviews!.data.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}

                {reviews && reviews!.last_page > 1} {
                    <Box m={{ lg: "32px 0 0" }}>
                        <Paginator pageData={reviews} />
                    </Box>
                }
                
            </Container>    
        </section>
    )
});

export default ReviewPageSection;