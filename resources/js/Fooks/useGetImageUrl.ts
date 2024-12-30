import { useEffect, useState } from 'react';

type Props = {
  image: File | null;
};

const useGetImageUrl = (props: Props) => {
    const { image } = props;

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (!image) {
            return;
        }

        let reader: FileReader | null = new FileReader();
        reader.onloadend = () => {
            // base64のimageUrlを生成する。
            const base64 = reader && reader.result;
            if (base64 && typeof base64 === 'string') {
            setImageUrl(base64);
            }
        };
        reader.readAsDataURL(image);

        return () => {
            reader = null;
        };
    }, [image]);

    return { imageUrl };
};

export default useGetImageUrl;