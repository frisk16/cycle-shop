import { useCallback, useState } from "react";

const useDrawer = () => {
    const [isSlide, setIsSlide] = useState(false);

    const onSlide = useCallback(() => {
        setIsSlide(true);
    }, []);

    const onReturn = useCallback(() => {
        setIsSlide(false);
    }, []);

    return { isSlide, onSlide, onReturn };
};

export default useDrawer;