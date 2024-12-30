import { FC, memo, useEffect } from "react";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import Text from "../Text/Text";
import FormGroup from "../Form/FormGroup";
import { useForm } from "@inertiajs/react";
import Label from "../Form/Label";
import Input from "../Form/Input";
import FormError from "../Form/FormError";
import ModalFooter from "./ModalFooter";
import DangerButton from "../Button/DangerButton";
import SecondaryButton from "../Button/SecondaryButton";
import Box from "../Container/Box";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const DeleteUserModal: FC<Props> = memo((props) => {
    const { isOpen, onClose } = props;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        clearErrors,
        errors,
    } = useForm({
        password: '',
    });
        
    useEffect(() => {
        clearErrors();
    }, [isOpen]);

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => onClose(),
            onFinish: () => reset(),
        });
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <h5>アカウントを削除します、本当によろしいですか？</h5>
            </ModalHeader>
            <ModalBody>
                <Box w={{ base: "100%", lg: "480px" }}>
                    <Text fontSize="0.9em" m={{ lg: "0 0 16px" }}>
                        一度削除を行うと、再度ログインを行うことができなくなります。<br />
                        よろしければ確認の為、設定中のパスワードを入力してください。
                    </Text>
                    <FormGroup>
                        <Label>現在のパスワード</Label>
                        <Input
                            type="password"
                            id="password"
                            isInvalid={errors.password !== undefined}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                        />
                        <FormError>{errors.password}</FormError>
                    </FormGroup>
                </Box>
            </ModalBody>
            <ModalFooter>
                <SecondaryButton onClick={onClose}>キャンセル</SecondaryButton>
                <DangerButton
                    processing={processing}
                    onClick={deleteUser}
                >
                    アカウントを削除
                </DangerButton>
            </ModalFooter>
        </Modal>
    )
});

export default DeleteUserModal;