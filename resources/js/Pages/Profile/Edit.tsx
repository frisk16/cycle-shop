import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { FC } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import Container from '@/Components/Container/Container';
import UpdateImage from './Partials/UpdateImage';

type Props = {
    mustVerifyEmail: boolean;
    status?: string;
};

const Edit: FC<Props> = (props) => {
    const { mustVerifyEmail, status = "" } = props;

    return (
        <DefaultLayout>
            <Head title="アカウント情報" />

            <Container size="lg">

                <UpdateImage />

                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />

                <UpdatePasswordForm />

                <DeleteUserForm />

            </Container>

        </DefaultLayout>
    )
};

export default Edit;
