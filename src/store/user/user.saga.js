import { takeLatest, call, all, put } from 'redux-saga/effects';
import  USER_ACTION_TYPES  from './user.types';
import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
} from './user.action';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword, 
    createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
        //call basically sends back function name as first param and parameters to that function as the subsequent params
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        
    } catch(error) {
        yield put(signInFailed(error));
    }
}
//SIGN UP
export function* signUp({payload: {email, password, displayName}}) {
    try{
       const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
       yield put(signUpSuccess(user, {displayName}));
    }catch(error){
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

//SIGN IN
export function* signInWithGoogle() {
    try{
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user)
    }catch(error){
        yield put(signInFailed(error));
    }
}

//CHECKING SESSION
export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error));
    }
}
//SIGN UP


export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

//SIGN IN
export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
//CHECKING SESSION
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}



export function* userSaga() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}

