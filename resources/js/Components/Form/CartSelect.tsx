import { Dispatch, FC, FormEventHandler, memo, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { Product } from "@/types/base/product";
import useCart from "@/Fooks/Api/useCart";
import { useForm } from "@inertiajs/react";
import useMessage from "@/Fooks/useMessage";
import Message from "../Message/Message";
import PageLoading from "../Progress/PageLoading";

type Props = {
    product: Product | null;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const CartSelect: FC<Props> = memo((props) => {
    const { product, setUpdateCnt } = props;

    const { isActive, setIsActive, value, msgState, getMessage } = useMessage();
    const { loading, status, addCart } = useCart();
    const { data, setData } = useForm({
        productId: product!.id,
        qty: 1,
    });

    useEffect(() => {
        setIsActive(false);
        if(status === 201) {
            getMessage({ status: "success", value: `カートに追加しました「${data.qty}商品」` })
            setData({
                productId: product!.id,
                qty: 1,
            });
            setUpdateCnt((cnt) => cnt + 1);
        }
    }, [status]);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        addCart(data);
    };

    return (
        <form>
            {loading && (
                <PageLoading />
            )}

            <ContentFlex>
                <LabelDiv>
                    数量：
                </LabelDiv>
                <SelectStyle id="qty" onChange={(e) => setData("qty", Number(e.target.value))}>
                    {[...Array(10)].map((data, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                    ))}
                </SelectStyle>
                <ButtonStyle onClick={onSubmit}>
                    カートに追加
                </ButtonStyle>
            </ContentFlex>

            <Message
                isActive={isActive}
                status={msgState}
                value={value}
            />
        </form>
    )
});

export default CartSelect;


/**
 * CSS Styles
 */
const ContentFlex = styled.div`
    display: flex;
    height: 40px;

    @media screen and (max-width: 768px) {
        height: 32px;
    }
`;
const LabelDiv = styled.div`
    background-color: #ddd;
    border: 1px solid #aaa;
    border-right: 1px solid transparent;
    border-radius: 8px 0 0 8px;
    height: 100%;
    padding: 8px;
`;
const SelectStyle = styled.select`
    padding: 8px 32px 8px 16px;
    border: 1px solid #aaa;
    height: 100%;

    @media screen and (max-width: 768px) {
        padding: 2px 32px 2px 16px;
    }
`;
const ButtonStyle = styled.button`
    background-color: #f75;
    color: #fff;
    padding: 8px 16px;
    border: 1px solid #aaa;
    border-left: 1px solid transparent;
    border-radius: 0 8px 8px 0;
    height: 100%;

    &:hover {
        opacity: 0.7;
        transition: opacity 0.3s;
    }
`;