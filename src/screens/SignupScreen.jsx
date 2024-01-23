import {useSignup} from "../hooks/useSignUp";
import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {ErrorMessage} from "../components/ErrorMessage";


export const SignupScreen = () => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)
    const {signUpFormRef, handleSignup} = useSignup()

    console.log(error)
    useEffect(() => {
        return () => {
            setError("")
            setIsLoading(false)
        }
    }, []);
    return (
        <div
            className="md:py-8 md:px-48 sm:h-lvh lg:px-24 xl:py-10 xl:px-28 flex flex-row justify-between items-center lg:gap-24 xl:gap-40">
            <div className="flex-1">
                <h3 className="text-[#FF748D] font-medium md:text-2xl xl:text-3xl">TweetX</h3>
                <Link to="/login">
                    <button
                        className="border-2 border-[#C1C1C1] rounded-xl md:px-14 md:py-2 md:my-8 xl:my-8 xl:py-2 xl:px-16 xl:text-sm xl:font-medium">Login
                    </button>
                </Link>
                <h1 className="text-[#5D676E] font-bold md:mt-8 md:mb-4 md:text-2xl xl:mt-10 xl:mb-4 xl:text-3xl">Create Account</h1>
                <div>
                    <form ref={signUpFormRef} className="flex flex-col md:gap-7 md:my-8 xl:gap-8 xl:my-8">
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm" type="text" placeholder="Name"
                               name="name"/>
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm" type="email" placeholder="Email"
                               name="email"/>
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm" type="password" placeholder="Password"
                               name="password"/>
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm"
                               type="password" placeholder="Confirm Password" name="confirmPassword"/>
                        <div className="text-right">
                            <button onClick={handleSignup}
                                    className="bg-[#FF748D] shadow-xl text-white rounded font-normal md:px-6 md:py-2 xl:text-sm xl:px-6 xl:py-2">
                                {isLoading ? <ClipLoader
                                    size={10}
                                    color="white"
                                /> : "Sign up"}
                            </button>
                        </div>
                        {error && <ErrorMessage message={error}/>}
                    </form>
                </div>
            </div>
            <div className="flex-1 hidden lg:block">
                <img className="aspect-auto" src="/Images/signup_tweetx.svg"
                     alt="SignupScreen-Tweetx"/>
            </div>
        </div>
    )
}

