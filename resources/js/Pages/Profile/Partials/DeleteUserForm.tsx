import DangerButton from '@/Components/Button/DangerButton';
import Card from '@/Components/Card/Card';
import CardBody from '@/Components/Card/CardBody';
import CardHeader from '@/Components/Card/CardHeader';
import Divider from '@/Components/Text/Divider';
import DeleteUserModal from '@/Components/Modal/DeleteUserModal';
import useModal from '@/Fooks/useModal';
import { FC, memo } from 'react';

const DeleteUserForm: FC = memo(() => {
    const { isOpen, onOpen, onClose } = useModal();
            
    return (
        <section>
            
            <Card>
                <CardHeader>
                    <h5>※アカウントを停止する方はこちら</h5>
                </CardHeader>
                <Divider color="#ccc" />
                <CardBody>
                    <DangerButton onClick={onOpen}>
                        アカウントを停止
                    </DangerButton>

                    <DeleteUserModal
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </CardBody>
            </Card>
        </section>
    )
});

export default DeleteUserForm;