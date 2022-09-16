import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAJHrL_f8NIcYRCczTFe0Fm5ikKQGHTFKM",
    authDomain: "fir-clothing-db-284c4.firebaseapp.com",
    projectId: "fir-clothing-db-284c4",
    storageBucket: "fir-clothing-db-284c4.appspot.com",
    messagingSenderId: "888451626690",
    appId: "1:888451626690:web:6816e4a57c9313389aed5b"
  };

  
//Setting up signinwithpopup
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Setting up firestore db to start the collection of users
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user: ', error.message);
        }
    }

    return userDocRef;
  };