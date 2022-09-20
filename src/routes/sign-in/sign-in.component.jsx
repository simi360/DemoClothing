// import { useEffect } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils'
// import {getRedirectResult} from 'firebase/auth'
// import {auth} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1> Sign In Page</h1>
            <button onClick={logGoogleUser}> Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;