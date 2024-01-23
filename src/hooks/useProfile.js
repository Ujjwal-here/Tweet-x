import {useContext, useState} from "react";
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/config";
import {TweetXContext} from "../context/TweetXContext";

export const useProfile = () => {
    const [profileLoader, setProfileLoader] = useState(false)
    const {setError} = useContext(TweetXContext)
    const loggedInUid = localStorage.getItem("uid")

    const [userData, setUserData] = useState()

    async function getAllLoggedInUserData() {
        try {
            setProfileLoader(true)
            const data = []
            const userRef = collection(db, 'users')
            const q = query(userRef, where(documentId(), '==', loggedInUid))
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                data.push(doc.data())
            })
            setUserData(data)
            setProfileLoader(false)
        } catch (e) {
            setError("We couldn't fetch user data. Please try again.")
            setProfileLoader(false)
        }
    }

    return {profileLoader, getAllLoggedInUserData, userData}
}
