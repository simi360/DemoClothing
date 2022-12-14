import { useState } from "react";
import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.action";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
// import { UserContext } from "../../contexts/user.context";
import Button from '../button/button.component'

import {SignupContainer} from './sign-up-form.styles.jsx'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    // const {setCurrentUser} = useContext(UserContext) <- happening in user.context

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert ("Passwords do not match, please try again");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            // const {user} = await createAuthUserWithEmailAndPassword( email, password); <- using redux-saga instead
            // // setCurrentUser(user); <- happening in user.context
            // // can't create user document from auth in user.context as we need to add displayName
            // await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error){
            if (error.code === 'auth/email-already-in-use'){
                alert('Unable to create user, email already in use');
            } else if (error.code === 'auth/weak-password'){
                alert('Password should be at least 6 characters, try again');
            }else {
                console.log('User creation encounteres an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    }

    return (
        <SignupContainer>
        <h2> Don't have an account?</h2>
        <span> Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Display Name"
                type='text' 
                required 
                onChange={handleChange}  
                name='displayName'
                value={displayName}
            />
            <FormInput
                label="Email"
                type='email' 
                required 
                onChange={handleChange}  
                name='email' 
                value={email}
            />
            <FormInput
                label="Password"
                type='password' 
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
            />
            <FormInput
                label="Confirm Password"
                type='password' 
                required 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
            />
            
            <Button type='submit'>Sign Up </Button>
        </form>
        </SignupContainer>
    );
};

export default SignUpForm;