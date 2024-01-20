import {useRef, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth} from "../firebase/config";

export const SignupScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const formRef = useRef()


    async function handleSubmit(e){
        setIsLoading(true)
        e.preventDefault()
        const name= formRef.current[0].value
        const email= formRef.current[1].value
        const password= formRef.current[1].value
        const confirmPassword= formRef.current[1].value
        try {
            if (password!==confirmPassword){
                return setError("Passwords do not match")
            }
            const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
            console.log(userCredentials)
            setIsLoading(false)
        }
        catch (e){
            setError(e.message)
        }
    }

    return (
        <div className="py-10 px-28">
            <h3 className="text-[#FF748D] font-medium lg:text-2xl">TweetX</h3>
            <button className="border-2 border-[#C1C1C1] rounded-xl lg:my-10 lg:py-2 lg:px-16 lg:text-sm lg:font-medium">Login</button>
            <h1 className="text-[#5D676E] font-semibold lg:mt-8 lg:mb-4 lg:text-3xl">Create Account</h1>
            <div className="flex flex-row">
                <form ref={formRef} className="flex-1 flex flex-col gap-8 lg:my-8 lg:pr-80">
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm" type="text" placeholder="Name"
                           name="name"/>
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm" type="email" placeholder="Email"
                           name="email"/>
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm" type="password" placeholder="Password"
                           name="password"/>
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm"
                           type="password" placeholder="Confirm Password" name="confirmPassword"/>
                    <button onClick={handleSubmit}
                            className="bg-[#FF748D] text-white rounded font-normal lg:text-sm lg:px-4 lg:py-2">Sign up
                    </button>
                </form>
                <div>
                    <img className="h-96" src="/Images/signup_tweetx.svg" alt="SignupScreen-Tweetx"/>
                </div>
            </div>
        </div>
    )
}
