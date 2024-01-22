import {useContext, useRef, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase/config";
import {addDoc, collection,doc,setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {TweetXContext} from "../context/TweetXContext";

export const useSignup = () => {
    const {isLoading, setIsLoading,success, setSuccess, error, setError}= useContext(TweetXContext)
    const signUpFormRef = useRef()
    const navigate= useNavigate()

    async function handleSignup(e) {
        setIsLoading(true)
        e.preventDefault()
        const name = signUpFormRef.current[0].value
        const email = signUpFormRef.current[1].value
        const password = signUpFormRef.current[2].value
        const confirmPassword = signUpFormRef.current[3].value

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
            setSuccess("User Registered Successfully")
            setIsLoading(false)
            navigate("/feed")
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
    }

    return {isLoading, setIsLoading, error, setError, signUpFormRef, handleSignup}
}
