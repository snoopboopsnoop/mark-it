import React, { useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../../../firebase.config';

const auth = getAuth(app);

export function useAuthentication() {
    const [user, setUser] = useState<User>();

    React.useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if(user) {
                console.log("not set user");
                setUser(user);
                console.log("set user");
            }
            else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatusChanged;
    }, []);

    return { user} ;
}
