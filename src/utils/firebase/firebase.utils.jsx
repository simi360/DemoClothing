import {initializeApp} from 'firebase/app';
import {getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
  } from 'firebase/auth'
import {getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
  } from 'firebase/firestore'
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//Setting up firestore db to start the collection of users
  export const db = getFirestore();

  export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    


    // return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user: ', error.message);
        }
    }

    return userDocRef;
  };

  //authenticating with create username and password
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

    //authenticating with create username and password
    export const signInAuthUserWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return;
  
      return await signInWithEmailAndPassword(auth, email, password);
    }

    export const signOutUser = async () => {
      await signOut(auth);
    }

    export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)