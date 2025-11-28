// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, update } from "firebase/database";
import { WordRushGameObject } from "./WordRushGameObject.js";
import { MatchGameDataObject } from "./MatchGameDataObject.js";
import Cookies from "js-cookie";
import { UpdateMiniGameDataObject } from "./MiniGameDataObject.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGF3-zASzVYB55mIlv4hePRCRZ0XBQ9no",
  authDomain: "bacon-hub.firebaseapp.com",
  databaseURL: "https://bacon-hub-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bacon-hub",
  storageBucket: "bacon-hub.firebasestorage.app",
  messagingSenderId: "609840217142",
  appId: "1:609840217142:web:c338dd01b0851c35adec97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export function CreateUserDataObject(name, password){
    const user = {
        name: name,
        password: password,
        wordrush: WordRushGameObject(),
        match: MatchGameDataObject()
    }
    return user
}

export async function UserExist(name){
    try{
        const table = ref(db,"users")
        const snapshot = await get(table)

        if (!snapshot.exists) return false

        const user = snapshot.val()

        const exist = Object.values(user).some((u) => u.name === name)

        return exist
    } catch(err){
        console.log({error: err.message})
        return undefined
    }
}

export async function getUser(name, password) {
    try{
        const table = ref(db,"users")
        const snapshot = await get(table)
        const users = snapshot.val()
        for(const [id,user] of Object.entries(users)){
            if (user.name === name && user.password === password){
                return {id, ...user}
            }
        }
        return undefined
    } catch(err){
        console.log({error: err.message})
    }
}

export async function UpdateMatchGameScore(score){
    try{
        const cookieUser = Cookies.get("user")
        if (cookieUser === undefined || cookieUser === "") return false
        const userSave = JSON.parse(cookieUser)
        const user = await getUser(userSave.name, userSave.password)
        const userRef = ref(db,"users/" + user.id + "/match")
        await update(userRef, UpdateMiniGameDataObject(user.match,score))
        console.log("Update MatchGame Score with success")
        return true
    } catch(err){
        console.log({error: err.message})
        return false
    }
}

export async function UpdateWordRushGameScore(score) {
    try{
        const cookieUser = Cookies.get("user")
        if (cookieUser === undefined || cookieUser === "") return false
        const userSave = JSON.parse(cookieUser)
        const user = await getUser(userSave.name, userSave.password)
        const userRef = ref(db,"users/" + user.id + "/wordrush")
        await update(userRef, UpdateMiniGameDataObject(user.wordrush,score))
        console.log("Update WordRush Score with success")
    } catch(err){
        console.log({error: err.message})
        return false
    }
}

export async function CreateNewUser(user){
    try{
        console.log(user)
        if (user.name === undefined || user.name === "" || user.name.length === 0){
            alert("Name con not be null")
            return false
        }
        const exist = await UserExist(user.name)
        if (exist){
            alert("This Nick Name was register")
            console.log("This user exist")
            return false
        }
        const table = ref(db,"users")
        await push(table,user)
        return true
    } catch(err){
        console.log({error: err.message})
        return false
    }
}