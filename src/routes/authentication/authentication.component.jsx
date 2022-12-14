// import { useEffect } from 'react';

// import {getRedirectResult} from 'firebase/auth'
// import {auth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import {AuthenticationContainer} from './authentication.styles.jsx'

const Authentication = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, [])



    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;