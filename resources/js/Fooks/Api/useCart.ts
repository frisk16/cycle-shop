import { Cart, CartForm } from "@/types/base/cart";
import axios from "axios";
import { useCallback, useState } from "react";

const useCart = () => {
    const [carts, setCarts] = useState<Array<Cart>>([]);
    const [loading, setLoading] = useState(false);
    const [postage, setPostage] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(0);
    const [updateCnt, setUpdateCnt] = useState(0);

    // カート情報取得
    const getCarts = useCallback(() => {
        setLoading(true);
        axios.get(route("carts.get"))
            .then((res) => {
                setCarts(res.data.carts);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    // カート追加
    const addCart = useCallback((data: CartForm) => {
        setStatus(0);
        setLoading(true);
        axios.post(route("carts.add"), {
            productId: data.productId,
            qty: data.qty,
        })
        .then((res) => {
            if(res.data.status === 201) {
                setStatus(res.data.status);
            }
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        })
        .finally(() => setLoading(false));
    }, []);

    // カート合計金額取得
    const getTotalPrice = useCallback(() => {
        axios.get(route("carts.get_total_price"))
            .then((res) => {
                setTotal(res.data.total);
                setPostage(res.data.postage);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    }, []);

    // カート個数取得
    const getCartsCount = useCallback(() => {
        axios.get(route("carts.get_carts_count"))
            .then((res) => {
                setCount(res.data.count);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    }, []);

    // 数量変更
    const updateQty = useCallback((props: {plus: boolean, productId: number}) => {
        setStatus(0);
        axios.put(route("carts.update_qty"), {
            plus: props.plus,
            productId: props.productId,
        })
        .then((res) => {
            setStatus(res.data.status);
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        });
    }, []);

    // カート削除
    const deleteCart = useCallback((productId: number) => {
        setStatus(0);
        axios.post(route("carts.destroy"), {
            productId: productId,
        })
        .then((res) => {
            setStatus(res.data.status);
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        });
    }, []);

    return {
        loading,
        status,
        updateCnt,
        carts,
        total,
        count,
        postage,
        setUpdateCnt,
        getCarts,
        getTotalPrice,
        getCartsCount,
        addCart,
        updateQty,
        deleteCart,
    };
};

export default useCart;