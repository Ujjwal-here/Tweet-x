import {useRef, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase/config";
import {addDoc, collection,doc,setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const formRef = useRef()
    const navigate= useNavigate()

    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        const name = formRef.current[0].value
        const email = formRef.current[1].value
        const password = formRef.current[1].value
        const confirmPassword = formRef.current[1].value
        try {
            if (password !== confirmPassword) {
                return setError("Passwords do not match")
            }
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredentials.user.uid
            const token = userCredentials.user.accessToken
            localStorage.setItem("token", token)
            localStorage.setItem("uid", uid)
            const docRef = doc(db, 'users', uid)
            const result = await setDoc(docRef, {
                uid,
                name,
                email,
                followers:[],
                following: []
            })
            setIsLoading(false)
            navigate("/feed")
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
    }

    return {isLoading, setIsLoading, error, setError, formRef, handleSubmit}
}
