import { useCallback, useState } from "react";

type Props = {
    status: "primary" | "error" | "info" | "success" | "warning";
    value: string;
};

const useMessage = () => {
    const [msgState, setMsgState] = useState("");
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useState(false);

    const getMessage = useCallback((props: Props) => {
        const { status, value } = props;

        setMsgState(status);
        setValue(value);
        setIsActive(true);
    }, []);

    return { msgState, value, isActive, setIsActive, getMessage };
};

export default useMessage;