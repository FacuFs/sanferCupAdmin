// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGTfo0z1bJLuxHeG5OT5w_zEM6tY6qLEE",
    authDomain: "torneocsfsingles-8044f.firebaseapp.com",
    projectId: "torneocsfsingles-8044f",
    storageBucket: "torneocsfsingles-8044f.appspot.com",
    messagingSenderId: "286544091521",
    appId: "1:286544091521:web:02c933af64e72da4927080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();


export const savePlayer = (nombre, edad, telefono, sexo, nivel, instagram, email) =>{
    addDoc(collection(db, 'jugadores'), {nombre, edad, telefono, sexo, nivel, instagram, email})
}

export const getPlayers = () => {
    return getDocs(collection(db, 'jugadores'))
}

export const onGetPlayers = (callback) => onSnapshot(collection(db, 'jugadores'), callback)

export const deletePlayer = (id) => deleteDoc(doc(db, 'jugadores', id))

export const getPlayer = (id) => getDoc(doc(db, 'jugadores', id))

export const updatePlayer = (id, data) => updateDoc(doc(db, 'jugadores', id), data)




