import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, query, orderBy, limit, collection, getDocs, getDoc, where, or, and, } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Constants from 'expo-constants';
import FriendDetail from './src/Pages/FriendDetail';

const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,    
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
    measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//     if(user) {
//         const uid = user.uid;
//         const email = user.email;
//         console.log(`current ueser: ${uid}, ${email}`)
//     }
// })

const db = getFirestore(app);

const friendships = collection(db, "friendships");
const transactions = collection(db, "transactions");

export async function registration(email, password, firstName, lastName, username) {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("user created")
    const user = auth.currentUser;
    console.log("got user info")
    console.log(`info: uid: ${user.uid}, email: ${user.email}, lastName: ${lastName}, firstName: ${firstName}, username: ${username}`)

    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        lastName: lastName,
        firstName: firstName,
        username: username,
        pfp: "bobr"
    })
    console.log("done")
}

export async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}


export async function getFriends() {
    const user = auth.currentUser;
    const q = query(friendships, or(
        where('friend1', '==', user.uid),
        where('friend2', '==', user.uid),
        ));
    const querySnapshot = await getDocs(q);

    let friends = [];
    await querySnapshot.forEach(async (document) => {
        // console.log(document.id, " => ", document.data());
        const data = document.data();
        const first = (data.friend1 == user.uid) ? true : false;
        const friendUID = (first) ? data.friend2 : data.friend1;
        const friendData = await getDoc(doc(db, "users", friendUID));
        const friend = friendData.data();
        
        await friends.push({
            username: friend.username,
            pfp: '../assets/bucket-gorilla.jpg',
            balance: (first) ? data.balance : -data.balance,
            lastTransaction: new Date(),
        })
        
        console.log("printing entries inside getFriend");
        friends.forEach((entry) => {
            console.log(entry);
        })
    })

    return friends;
}

export { app };