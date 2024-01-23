import {useContext, useEffect, useState} from "react";
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/config";
import {UserCard} from "../components/UserCard";
import {TweetXContext} from "../context/TweetXContext";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";
import {InfoMessage} from "../components/InfoMessage";

export const FollowingScreen = () => {
    const {isLoading, setIsLoading, success, setSuccess, error, setError} = useContext(TweetXContext)

    const [followingsDetail, setFollowingsDetail] = useState([])

    const loggedInUid = localStorage.getItem("uid")

    async function getUserFollowingsDetail() {
        try {
            setIsLoading(true)
            let userFollowings = []
            const usersRef = collection(db, 'users')
            const queryOne = query(usersRef, where(documentId(), '==', loggedInUid))
            const docSnapOne = await getDocs(queryOne)
            docSnapOne.forEach((doc) => {
                userFollowings = doc.data().following
            })

            if (userFollowings.length !== 0) {
                const userDetails = []
                const queryTwo = query(usersRef, where(documentId(), 'in', userFollowings))
                const docSnapTwo = await getDocs(queryTwo)
                docSnapTwo.forEach((doc) => {
                    userDetails.push(doc.data())
                })
                setFollowingsDetail(userDetails)
            }
            setIsLoading(false)
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        getUserFollowingsDetail()
        return () => {
            setError("")
            setIsLoading(false)
            setSuccess("")
        }
    }, []);

    if (isLoading) {
        return <div className="flex flex-row justify-center items-center my-20"><ClipLoader size={50} color="black"/>
        </div>
    }
    return (
        <div className="sm:my-10">
            {error && <div className="flex flex-row justify-center"><ErrorMessage message={error}/></div>}
            {followingsDetail.length === 0 &&
                <div className="flex flex-row justify-center"><InfoMessage message="No Followings Found"/></div>}
            {followingsDetail && followingsDetail.map((data) => {
                return <UserCard user={data}/>
            })}
        </div>
    )
}
