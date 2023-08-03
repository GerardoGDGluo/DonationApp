import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import store from '../redux/store';
import {updateToken} from '../redux/reducers/User';
import sendVerificationEmail from './sendEmail';

export const createUser = async (fullName, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: fullName});
    await firestore().collection('users').add({
      name: fullName,
      email,
      role: 'user',
    });

    await sendVerificationEmail(email);
    // await auth().currentUser.sendEmailVerification();
    return user;
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/email-already-in-use') {
      return {error: 'That email address is already in use!'};
    } else if (error.code === 'auth/invalid-email') {
      return {error: 'That email address is invalid!'};
    }
    return {error: 'Something went wrong with your request!'};
  }
};

export const loginUser = async (email, password) => {
  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    if (!user.emailVerified) {
      return {status: false, error: 'Para poder entrar debe validar su email'};
    }

    const token = await user.getIdToken();
    return {
      status: true,
      data: {
        displayName: user.displayName,
        email: user.email,
        token,
      },
    };
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      return {status: false, error: 'Wrong credentials.'};
    } else if (error.code === 'auth/user-not-found') {
      return {
        status: false,
        error: 'The email you entered does not exists. Please crate an account',
      };
    }
    return {status: false, error: 'Something went wrong with your request!'};
  }
};

export const logOut = async () => {
  await auth().signOut();
};

export const chechToken = async () => {
  try {
    let response = await auth().currentUser.getIdToken(true);
    // console.log('We are updating the token');
    store.dispatch(updateToken(response));
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
