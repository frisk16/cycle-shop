import { Product } from "@/types/base/product";
import axios from "axios";
import { useCallback, useState } from "react";

const useProduct = () => {
    const [products, setProducts] = useState<Array<Product>>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    // 商品取得
    const getProduct = useCallback((productId: number) => {
        axios.get(route("products.get", productId))
            .then((res) => {
                setProduct(res.data.product);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    }, []);

    // おすすめ商品取得
    const getRecommendProducts = useCallback(() => {
        setLoading(true);
        axios.get(route("products.get_recommend"))
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);
        
    // 人気商品取得
    const getPopProducts = useCallback(() => {
        setLoading(true);
        axios.get(route("products.get_pop"))
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    // 閲覧履歴取得
    const getHistoryProducts = useCallback(() => {
        setLoading(true);
        axios.get(route("products.get_history"))
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        products,
        product,
        getProduct,
        getRecommendProducts,
        getPopProducts,
        getHistoryProducts,
    };
};

export default useProduct;