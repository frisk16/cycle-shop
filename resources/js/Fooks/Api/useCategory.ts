import { Category } from "@/types/base/category";
import { MajorCategory } from "@/types/base/majorCategory";
import { ProductData } from "@/types/base/product";
import axios from "axios";
import { useCallback, useState } from "react";

const useCategory = () => {
    const [majorCategories, setMajorCategories] = useState<Array<MajorCategory>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [products, setProducts] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(false);

    // カテゴリー取得
    const getCategories = useCallback(() => {
        setLoading(true);
        axios.get(route("categories.get"))
            .then((res) => {
                setMajorCategories(res.data.majorCategories);
                setCategories(res.data.categories);
            })
            .catch((err) => {
                alert("読み込みエラー："+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    // カテゴリー毎の商品データ取得
    const getProducts = useCallback((props: {categoryId: number}) => {
        const { categoryId } = props;

        setLoading(true);
        axios.get(route("categories.get_products", categoryId))
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((err) => {
                alert("読み込みエラー："+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        majorCategories,
        categories,
        products,
        getCategories,
        getProducts,
    }
};

export default useCategory;