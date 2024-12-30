import { useCallback } from "react";

const useFormat = () => {

    // 日時フォーマット　yyyy/mm/dd - HH:mm
    const getDateTime = useCallback((date: string): string => {
        const target = new Date(date);
        const year = target.getFullYear();
        const month = target.getMonth() + 1;
        const day = target.getDate();
        const hour = target.getHours();
        const formatFour = hour < 10 ? `0${hour}` : `${hour}`;
        const min = target.getMinutes();
        const formatMin = min < 10 ? `0${min}` : `${min}`;

        return `${year}/${month}/${day} - ${formatFour}:${formatMin}`;
    }, []);

    // 数値カンマ区切りフォーマット　0,000
    const getFormatNumber = useCallback((num: number | null): string => {
        return new Intl.NumberFormat().format(num!);
    }, []);

    return { getDateTime, getFormatNumber };
};

export default useFormat;