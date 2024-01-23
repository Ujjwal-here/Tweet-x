import {arrayRemove, arrayUnion, doc, updateDoc} from "firebase/firestore"
import {db} from "../firebase/config";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";

export const UserCard = ({user}) => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)
    const loggedInUid = localStorage.getItem("uid")
    const [follow, setFollow] = useState("Follow")

    function checkIfFollowing() {
        if (user.followers.includes(loggedInUid)) {
            setFollow("Following")
        } else {
            setFollow("Follow")
        }
    }

    useEffect(() => {
        checkIfFollowing()
        return () => {
            setIsLoading(false)
            setError("")
        }
    }, []);

    async function followButtonHandler() {
        const loggedInRef = doc(db, "users", loggedInUid);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(loggedInRef, {
            following: arrayUnion(user.uid)
        })
        await updateDoc(userRef, {
            followers: arrayUnion(loggedInUid)
        })
    }

    async function unfollowButtonHandler() {
        const loggedInRef = doc(db, "users", loggedInUid);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(loggedInRef, {
            following: arrayRemove(user.uid)
        })
        await updateDoc(userRef, {
            followers: arrayRemove(loggedInUid)
        })
    }

    function followUnfollowHandler() {
        if (follow === "Follow") {
            followButtonHandler()
            setFollow("Following")
        } else {
            unfollowButtonHandler()
            setFollow("Follow")
        }
    }
    return (
        <div className="md:px-16 lg:px-20 xl:px-24">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center md:gap-8">
                    <div>
                        <img
                            className="inline-block md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 rounded-full ring-2 ring-white"
                             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                             alt="profile_pic"/>
                    </div>
                    <div>
                        <h3 className="font-medium md:text-lg lg:text-xl text-[#8F8F8F]">{user.name}</h3>
                        <p className="font-light text-xs text-[#8F8F8F] md:my-1 xl:my-1">Following
                            : {user.following.length}</p>
                    </div>
                </div>
                <div>
                    <button onClick={followUnfollowHandler}
                            className={`${follow === "Following" ? "text-black" : "bg-[#FF748D] text-white"} rounded font-normal md:text-xs xl:text-sm md:px-5 md:py-1 xl:px-6 xl:py-2`}>{follow}
                    </button>
                </div>
            </div>
            <hr className="md:my-10 xl:my-11"/>
        </div>
    )
}
