import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //setting up current user and creating user document from auth in user.context
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            
            resetFormFields();
        } catch (error){
            if (error.code === 'auth/wrong-password'){
                alert('Incorrect Email/Password. Please try again.');
            } else if (error.code === 'auth/user-not-found') {
                alert('No user associated with this email. Please sign up');
            }else {
                console.log('Error while signing in: ', error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value });
    }

    return (
        <div className="sign-in-container">
        <h2> Already have an account?</h2>
        <span> Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
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
            <div className="buttons-container">
                <Button type='submit'>Sign In </Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
            </div>
            </form>
        </div>
    );
};

export default SignInForm;