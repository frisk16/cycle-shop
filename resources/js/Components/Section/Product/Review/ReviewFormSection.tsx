import PrimaryButton from "@/Components/Button/PrimaryButton";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import Flex from "@/Components/Container/Flex";
import FormError from "@/Components/Form/FormError";
import FormGroup from "@/Components/Form/FormGroup";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import Select from "@/Components/Form/Select";
import Textarea from "@/Components/Form/Textarea";
import Message from "@/Components/Message/Message";
import Text from "@/Components/Text/Text";
import Title from "@/Components/Text/Title";
import useReview from "@/Fooks/Api/useReview";
import useMessage from "@/Fooks/useMessage";
import { PageProps } from "@/types";
import { Review, ReviewForm } from "@/types/base/review";
import { useForm, usePage } from "@inertiajs/react";
import { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import styled from "styled-components";

type Props = {
    productId: number;
    reviews: Array<Review>;
    setUpdateCnt: Dispatch<SetStateAction<number>>;
}

const ReviewFormSection: FC<Props> = memo((props) => {
    const { productId, reviews, setUpdateCnt } = props;

    const { isActive, setIsActive, value, msgState, getMessage } = useMessage();
    const { status, errors, loading, storeReview } = useReview();
    const { auth } = usePage<PageProps>().props;
    
    const { data, setData } = useForm<ReviewForm>({
        title: "",
        score: 5,
        comment: "",
    });

    useEffect(() => {
        setIsActive(false);
        if (status === 201) {
            setUpdateCnt((cnt) => cnt + 1);
            setData({
                title: "",
                score: 5,
                comment: "",
            });
            getMessage({ status: "success", value: "レビューを投稿しました" });
        } else if (status === 400) {
            getMessage({ status: "error", value: "入力内容に誤りがあります" });
        } else if (status === 502) {
            getMessage({ status: "warning", value: "レビュー投稿は3回までです" });
        }
    }, [status]);
    

    const onSubmit = () => {
        storeReview(productId, data, reviews);
    }

    return (
        <ContainerDiv>
            <Title>投稿</Title>
            <Text fontSize="0.9em" color="#00f">※投稿は3回まで可能です</Text>
            <form>

                <FormGroup>
                    <Label htmlFor="title">タイトル</Label>
                    <Input
                        type="text"
                        value={data.title}
                        id="title"
                        isInvalid={errors.title !== ""}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <FormError>{errors.title}</FormError>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="score">評価</Label>
                    <Select
                        id="score"
                        value={data.score}
                        onChange={(e) => setData("score", Number(e.target.value))}
                    >
                        <option value="5">★★★★★ 5</option>
                        <option value="4">★★★★ 4</option>
                        <option value="3">★★★ 3</option>
                        <option value="2">★★ 2</option>
                        <option value="1">★ 1</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="comment">コメント</Label>
                    <Textarea
                        id="comment"
                        value={data.comment}
                        isInvalid={errors.comment !== ""}
                        onChange={(e) => setData("comment", e.target.value)}
                    ></Textarea>
                    <FormError>{errors.comment}</FormError>
                </FormGroup>

                <Flex justify={{ lg: "end" }}>
                    {auth.user ? (
                        <PrimaryButton
                            w={{ base: "100%" }}
                            processing={loading}
                            onClick={onSubmit}
                        >
                            投稿する
                        </PrimaryButton>
                    ) : (
                        <SecondaryButton
                            w={{ base: "100%" }}
                            disabled
                        >
                            ログイン後に投稿可能
                        </SecondaryButton>
                    )}
                </Flex>

            </form>

            <Message
                isActive={isActive}
                status={msgState}
                value={value}
            />
        </ContainerDiv>
    )
});

export default ReviewFormSection;


/**
 * CSS Styles
 */
const ContainerDiv = styled.div`
    border: 1px solid #aaa;
    border-radius: 8px;
    padding: 16px;
`;