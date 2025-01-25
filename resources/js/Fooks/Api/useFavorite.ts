import { useCallback, useState } from "react";

const useFavorite = () => {
    const [loading, setLoading] = useState(false);
    const [isRegisted, setIsRegisted] = useState(false);

    const toggleFavorite = useCallback(() => {

    }, []);

    return {
        loading,
        isRegisted,
        toggleFavorite,
    };
};

export default useFavorite;