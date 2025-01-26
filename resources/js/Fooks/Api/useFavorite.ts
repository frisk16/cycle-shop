import { FavoriteData } from "@/types/base/favorite";
import axios from "axios";
import { useCallback, useState } from "react";

const useFavorite = () => {
    const [loading, setLoading] = useState(false);
    const [isRegisted, setIsRegisted] = useState(false);
    const [favorites, setFavorites] = useState<FavoriteData | null>(null);

    const hasRegisted = useCallback((productId: number) => {
        setLoading(true);
        axios.get(route('favorites.has_registed', { productId }))
            .then((res) => {
                setIsRegisted(res.data.isRegisted);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const getAll = useCallback(() => {
        setLoading(true);
        axios.get(route("favorites.get"))
            .then((res) => {
                setFavorites(res.data.favorites);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const toggleFavorite = useCallback((productId: number) => {
        setLoading(true);
        axios.post(route("favorites.toggle"), {
            productId
        })
        .then((res) => {
            if(res.data.status == 200) {
                setIsRegisted(false);
            } else if(res.data.status == 201) {
                setIsRegisted(true);
            }
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        })
        .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        isRegisted,
        favorites,
        getAll,
        hasRegisted,
        toggleFavorite,
    };
};

export default useFavorite;