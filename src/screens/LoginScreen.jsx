import {Link} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {ErrorMessage} from "../components/ErrorMessage";
import {SuccessMessage} from "../components/SuccessMessage";
import useLogin from "../hooks/useLogin";

export const LoginScreen = () => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)
    const {loginFormRef, handleLogin} = useLogin()

    useEffect(() => {
        return () => {
            setError("")
            setIsLoading(false)
        }
    }, []);
    return (
        <div
            className="md:py-8 md:px-48 sm:h-lvh lg:px-24 xl:py-10 xl:px-28 flex flex-row justify-between items-center lg:gap-24 xl:gap-32">
            <div className="flex-1">
                <h3 className="text-[#FF748D] font-medium md:text-2xl xl:text-3xl">TweetX</h3>
                <Link to="/signup">
                    <button
                        className="border-2 border-[#C1C1C1] rounded-xl md:px-8 md:py-2 md:my-8 xl:my-8 xl:py-2 xl:px-12 xl:text-sm xl:font-medium">Create
                        Account
                    </button>
                </Link>
                <h1 className="text-[#5D676E] font-bold md:mt-8 md:mb-4 md:text-2xl xl:mt-10 xl:mb-4 xl:text-3xl">Login</h1>
                <div>
                    <form ref={loginFormRef} className="flex flex-col md:gap-7 md:my-8 xl:gap-8 xl:my-8">
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm" type="email"
                               placeholder="Email"
                               name="email"/>
                        <input className="bg-[#f9f9f9] rounded md:p-3 xl:p-4 xl:text-sm" type="password"
                               placeholder="Password"
                               name="password"/>
                        <div className="text-right flex flex-row justify-between items-center">
                            <span>Forgot Password?</span>
                            <button onClick={handleLogin}
                                    className="bg-[#FF748D] shadow-xl text-white rounded font-normal md:px-6 md:py-2 xl:text-sm xl:px-6 xl:py-2">
                                {isLoading ? <ClipLoader
                                    size={10}
                                    color="white"
                                /> : "Login"}
                            </button>
                        </div>
                        {error && <ErrorMessage message={error}/>}
                    </form>
                </div>
            </div>
            <div className="flex-1 hidden lg:block">
                <img className="aspect-auto" src="/Images/login-tweetx.svg"
                     alt="Login-Pic"/>
            </div>
        </div>
    )
}
