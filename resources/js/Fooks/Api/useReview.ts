import { Review, ReviewForm } from "@/types/base/review";
import axios from "axios";
import { useCallback, useState } from "react";

const useReview = () => {
    const [reviews, setReviews] = useState<Array<Review>>([]);
    const [scores, setScores] = useState<Array<number>>([]);
    const [userImageUrl, setUserImageUrl] = useState("");
    const [avgScore, setAvgScore] = useState(0);
    const [status, setStatus] = useState(0);
    const [updateCnt, setUpdateCnt] = useState(0);
    const [errors, setErrors] = useState({
        title: "",
        comment: "",
    });
    const [loading, setLoading] = useState(false);


    /**
     * レビュー一覧取得
     */
    const getReviews = useCallback((productId: number) => {
        setLoading(true);

        axios.get(route("reviews.get", productId))
            .then((res) => {
                setReviews(res.data.reviews);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    /**
     * レビュー投稿
     */
    const storeReview = useCallback((
        productId: number,
        data: ReviewForm,
        reviews: Array<Review>,
    ) => {
        setLoading(true);
        setStatus(0);

        axios.post(route("reviews.store", productId), {
            title: data.title,
            score: data.score,
            comment: data.comment,
        })
        .then((res) => {
            if (res.data.status === 201) {
                setReviews([...reviews, res.data.review]);
                setErrors({
                    title: "",
                    comment: "",
                });
                setStatus(res.data.status);
            } else if (res.data.status === 400) {
                setErrors({
                    title: res.data.errors.title ? res.data.errors.title : "",
                    comment: res.data.errors.comment ? res.data.errors.comment : "",
                });
                setStatus(res.data.status);
            } else if (res.data.status === 502) {
                setStatus(res.data.status);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false));
    }, []);

    /**
     * レビュースコア一覧取得
     */
    const getReviewScore = useCallback((productId: number) => {
        setLoading(true);

        axios.get(route("reviews.get_score", productId))
            .then((res) => {
                setScores(res.data.scores);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    /**
     * レビュースコア平均値取得
     */
    const getAvgScore = useCallback((productId: number | null) => {
        axios.get(route("reviews.get_avg_score", productId!))
            .then((res) => {
                setAvgScore(res.data.avgScore);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    }, []);

    /**
     * ユーザー画像取得
     */
    const getUserImage = useCallback((reviewId: number) => {
        axios.get(route("reviews.get_user_image", reviewId))
            .then((res) => {
                setUserImageUrl(res.data.image);
            })
            .catch((err) => {
                alert("ERROR: "+err);
                console.log(err);
            });
    }, []);

    return {
        loading,
        reviews,
        scores,
        avgScore,
        errors,
        status,
        updateCnt,
        userImageUrl,
        setUpdateCnt,
        getReviews,
        storeReview,
        getReviewScore,
        getAvgScore,
        getUserImage,
    };
};

export default useReview;