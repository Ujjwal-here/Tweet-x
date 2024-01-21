import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase/config";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const formRef = useRef()
    const navigate = useNavigate()

    async function loginHandleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        const email = formRef.current[0].value
        const password = formRef.current[1].value
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            localStorage.setItem("token", userCredential.user.accessToken)
            localStorage.setItem("uid", userCredential.user.uid)
            setIsLoading(false)
            navigate("/feed")
        }
        catch (e){
            setError(e.message)
            setIsLoading(false)
        }
    }
    return {isLoading,setIsLoading,error,setError,formRef,loginHandleSubmit}
}
export default useLogin
