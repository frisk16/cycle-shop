import { OrderForm } from "@/types/base/order";
import axios from "axios";
import { useCallback, useState } from "react";

const useOrder = () => {
    const [loading, setLoading] = useState(false);

    const addOrder = useCallback((data: OrderForm) => {
        setLoading(true);
        axios.post(route("orders.store"), {
            desName: data.desName,
            desPostalCode: data.desPostalCode,
            desAddress: data.desAddress,
            desPhoneNumber: data.desPhoneNumber,
            postage: data.postage,
            totalQty: data.totalQty,
            totalPrice: data.totalPrice,
            products: data.products,
            productQty: data.productQty
        })
        .then((res) => {
            res.data.orderCode && (
                location.href = route("orders.complete", { order_code: res.data.orderCode })
            );
        })
        .catch((err) => {
            alert("ERROR: "+err);
            console.log(err);
        });
    }, []);

    return {
        loading,
        addOrder,
    };
};

export default useOrder;