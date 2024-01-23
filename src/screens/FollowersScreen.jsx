import {UserCard} from "../components/UserCard";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/config";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";
import {InfoMessage} from "../components/InfoMessage";

export const FollowersScreen = () => {
    const {isLoading, setIsLoading, success, setSuccess, error, setError} = useContext(TweetXContext)

    const [followerDetail, setFollowerDetail] = useState([])

    const loggedInUid = localStorage.getItem("uid")

    async function getUserFollowingsDetail() {
        try {
            setIsLoading(true)
            let userFollowers = []
            const usersRef = collection(db, 'users')
            const queryOne = query(usersRef, where(documentId(), '==', loggedInUid))
            const docSnapOne = await getDocs(queryOne)
            docSnapOne.forEach((doc) => {
                userFollowers = doc.data().followers
            })

            if (userFollowers.length !== 0) {
                const userDetails = []
                const queryTwo = query(usersRef, where(documentId(), 'in', userFollowers))
                const docSnapTwo = await getDocs(queryTwo)
                docSnapTwo.forEach((doc) => {
                    userDetails.push(doc.data())
                })
                setFollowerDetail(userDetails)
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
            setIsLoading(true)
            setError("")
            setSuccess("")
        }
    }, []);

    if (isLoading) {
        return <div className="flex flex-row justify-center items-center my-20"><ClipLoader size={50} color="black"/>
        </div>
    }

    return (
        <div>
            {error && <div className="flex flex-row justify-center"><ErrorMessage message={error}/></div>}
            {followerDetail.length === 0 &&
                <div className="flex flex-row justify-center"><InfoMessage message="No Followers Found"/></div>}
            {followerDetail && followerDetail.map((data) => {
                return <UserCard user={data} profileStyle={true}/>
            })}
        </div>
    )
}
