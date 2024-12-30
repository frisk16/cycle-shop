import { useCallback, useState } from "react";

type Props = {
    maxCount: number;
};

const useCarousel = () => {
    const [count, setCount] = useState(1);

    const actionCarousel = useCallback((props: Props) => {
        const { maxCount } = props;

        setTimeout(() => {
            if (count >= maxCount) {
                setCount(1);
            } else {
                setCount((cnt) => cnt + 1);
            }
        }, 10000);
    }, [count]);

    const handleNextSlider = useCallback((props: Props) => {
        const { maxCount } = props;

        if (count >= maxCount) {
            setCount(1);
        } else {
            setCount((cnt) => cnt + 1);
        }
    }, [count]);

    const handlePrevSlider = useCallback((props: Props) => {
        const { maxCount } = props;

        if (count <= 1) {
            setCount(maxCount);
        } else {
            setCount((cnt) => cnt - 1);
        }
    }, [count]);

    return { count, actionCarousel, handleNextSlider, handlePrevSlider };
};

export default useCarousel;