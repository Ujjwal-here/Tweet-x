import {UserCard} from "../components/UserCard";
import {useContext, useEffect, useState} from "react";

import {TweetXContext} from "../context/TweetXContext";
import {ClipLoader} from "react-spinners";
import {useUser} from "../hooks/useUser";
import {ErrorMessage} from "../components/ErrorMessage";
import {InfoMessage} from "../components/InfoMessage";

export const UsersScreen = () => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)
    const {getAllUsers,usersData}= useUser()


    useEffect(() => {
        getAllUsers()

        return () => {
            setIsLoading(false)
            setError("")
        }
    }, [])

    if (isLoading) {
        return <div className="flex flex-row justify-center items-center h-lvh"><ClipLoader size={50} color="black"/>
        </div>
    }

    return (
        <div className="md:mx-24 md:my-12 lg:mx-48 lg:my-16 xl:mx-72 xl:my-20 2xl:mx-96">
            {usersData.length ===0 && <InfoMessage message="No Users Found !"/>}
            {error && <ErrorMessage message={error}/> }
            {usersData && usersData.map((user) => {
                return <UserCard key={user.uid} user={user}/>
            })}
        </div>
    )
}
