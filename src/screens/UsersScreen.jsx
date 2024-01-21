import {UserCard} from "../components/UserCard";
import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/config";

export const UsersScreen = () => {
    const [usersData, setUsersData] = useState([])

    async function getAllUsers() {
        const data = []
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })
        setUsersData(data)
    }

    useEffect(() => {
        try {
            getAllUsers()
        } catch (e) {
            console.log(e.message)
        }

    }, [])

    console.log(usersData)
    return (
        <div className="lg:mx-96 lg:my-20">
            {usersData && usersData.map((user)=>{
                return <UserCard key={user.uid} user={user}/>
            })}
        </div>
    )
}
