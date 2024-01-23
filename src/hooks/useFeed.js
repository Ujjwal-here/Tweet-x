import {useContext, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/config";
import {TweetXContext} from "../context/TweetXContext";

export const useFeed = () => {
    const [posts, setPosts] = useState([])
    const {setIsOpen, isLoading, setIsLoading, error, setError} = useContext(TweetXContext)

    function openModalHandler() {
        setIsOpen(true)
    }

    async function fetchAllPosts() {
        try {
            setIsLoading(true)
            const data = []
            const collectionRef = collection(db, "posts")
            const querySnapshot = await getDocs(collectionRef)
            querySnapshot.forEach((doc) => {
                const sortByTimestamp = doc.data().posts.sort(function (a, b) {
                    return b.timestamp.seconds - a.timestamp.seconds
                })
                data.push(...sortByTimestamp)
            })
            setPosts(data)
            setIsLoading(false)
        } catch (e) {
            setError("Oops! Something went wrong. We couldn't fetch the posts at the moment. Please try again later")
            setIsLoading(false)
        }

    }

    return {openModalHandler, posts, fetchAllPosts}
}
