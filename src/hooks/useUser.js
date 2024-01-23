import {useContext, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/config";
import {TweetXContext} from "../context/TweetXContext";

export const useUser = () => {

    const [usersData, setUsersData] = useState([])
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)


    async function getAllUsers() {
        try {
            setIsLoading(true)
            const data = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().uid !== localStorage.getItem("uid")) {
                    data.push(doc.data())
                }
            })
            setUsersData(data)
            setIsLoading(false)
        } catch (e) {
            setError("Oops! Something went wrong. We couldn't fetch the users at the moment. Please try again later")
            setIsLoading(false)
        }

    }

    return {getAllUsers, usersData}
}
