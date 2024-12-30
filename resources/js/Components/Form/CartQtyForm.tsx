import useCart from "@/Fooks/Api/useCart";
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import styled from "styled-components";

type Props = {
    productId: number;
    qty: number;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
};

const CartQtyForm: FC<Props> = memo((props) => {
    const { productId, qty, setUpdateCnt } = props;

    const { status, updateQty } = useCart();
    
    const onMinusSubmit = () => {
        updateQty({ plus: false, productId: productId });
    };
    const onPlusSubmit = () => {
        updateQty({ plus: true, productId: productId })
    };

    useEffect(() => {
        if(status === 200) {
            setUpdateCnt((cnt) => cnt + 1);
        }
    }, [status]);

    return (
        <div>
            <ContentFlex>
                <MinusButton onClick={onMinusSubmit} />
                <QtyNumberDiv>{qty}</QtyNumberDiv>
                <PlusButton onClick={onPlusSubmit} />
            </ContentFlex>
        </div>
    )
});

export default CartQtyForm;


/**
 * CSS Styles
 */
const ContentFlex = styled.div`
    display: flex;
    align-items: center;
    height: 32px;

    @media screen and (max-width: 768px) {
        height: 28px;
    }
`;
const PlusButton = styled.button`
    &:before {
        content: '+';
    }

    background-color: var(--section-color);
    width: 32px;
    height: 100%;
    color: #fff;
    padding: 4px;
    border-radius: 0 8px 8px 0;
    font-weight: bold;
`;
const MinusButton = styled.button`
    &:before {
        content: '-';
    }

    background-color: var(--section-color);
    width: 32px;
    height: 100%;
    color: #fff;
    padding: 4px;
    border-radius: 8px 0 0 8px;
    font-weight: bold;
`;
const QtyNumberDiv = styled.div`
    width: 32px;
    height: 100%;
    border: 1px solid #aaa;
    text-align: center;
    padding: 4px 0;
`;