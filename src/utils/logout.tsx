import React from 'react';
import { getAuth, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { app } from '../../firebase.config';

const auth = getAuth(app);

export function logout() {
    signOut(auth);
}