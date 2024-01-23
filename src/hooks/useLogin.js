import {useContext, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase/config";
import {TweetXContext} from "../context/TweetXContext";

const useLogin = () => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)
    const loginFormRef = useRef()
    const navigate = useNavigate()

    async function handleLogin(e) {
        setIsLoading(true)
        e.preventDefault()
        const email = loginFormRef.current[0].value
        const password = loginFormRef.current[1].value
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            localStorage.setItem("token", userCredential.user.accessToken)
            localStorage.setItem("uid", userCredential.user.uid)
            setIsLoading(false)
            navigate("/feed")
        }
        catch (e){
            if (e.code === "auth/user-not-found") {
                setError("User not found !")
            }
            if (e.code === "auth/invalid-email") {
                setError("Invalid Email !")
            }
            if (e.code === "auth/wrong-password"){
                setError("Entered password is wrong !")
            }
            setIsLoading(false)
        }
    }

    return {isLoading, setIsLoading, error, setError, loginFormRef, handleLogin}
}
export default useLogin
