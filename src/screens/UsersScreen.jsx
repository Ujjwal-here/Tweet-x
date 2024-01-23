import {UserCard} from "../components/UserCard";
import {useContext, useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/config";
import {TweetXContext} from "../context/TweetXContext";
import {ClipLoader} from "react-spinners";

export const UsersScreen = () => {
    const [usersData, setUsersData] = useState([])
    const {isLoading, setIsLoading, success, setSuccess, error, setError} = useContext(TweetXContext)


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
            setSuccess("User Fetched Successfully")
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        getAllUsers()

        return () => {
            setIsLoading(false)
            setError("")
            setSuccess("")
        }
    }, [])

    if (isLoading){
        return <div className="flex flex-row justify-center items-center h-lvh"><ClipLoader size={50} color="black"/></div>
    }

    return (
        <div className="md:mx-24 lg:mx-48 xl:mx-72 xl:my-20">
            {usersData && usersData.map((user) => {
                return <UserCard key={user.uid} user={user}/>
            })}
        </div>
    )
}
