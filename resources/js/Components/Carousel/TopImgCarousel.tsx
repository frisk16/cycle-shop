import { FC, memo, useEffect } from "react";
import Carousel from "./Carousel";
import CarouselContent from "./CarouselContent";
import TopImage from "../Image/TopImage";
import useCarousel from "@/Fooks/useCarousel";


const TopImgCarousel: FC = memo(() => {
    const { count, actionCarousel } = useCarousel();

    const images = [
        "img/top1.jpg",
        "img/top2.jpg",
    ];

    useEffect(() => {
        actionCarousel({ maxCount: images.length });
    }, [count]);

    return (
        <Carousel h="720px">
            <CarouselContent count={count}>
                {images.map((image, index) => (
                    <li key={index} id={`carousel-id-${index + 1}`}>
                        <TopImage src={image} />
                    </li>
                ))}
            </CarouselContent>
        </Carousel>
    )
});

export default TopImgCarousel;