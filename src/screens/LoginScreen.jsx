import {Link} from "react-router-dom";
import useLogin from "../hooks/useLogin";

export const LoginScreen = () => {
    const {formRef} = useLogin()
    return (
        <div className="lg:py-10 lg:px-28">
            <h3 className="text-[#FF748D] font-medium lg:text-2xl">TweetX</h3>
            <Link to="/signup">
                <button
                    className="border-2 border-[#C1C1C1] rounded-xl lg:my-10 lg:py-3 lg:px-10 lg:text-sm lg:font-medium">Create
                    Account
                </button>
            </Link>

            <h1 className="text-[#5D676E] font-semibold lg:mt-8 lg:mb-4 lg:text-3xl">Login</h1>
            <div className="flex flex-row">
                <form ref={formRef} className="flex-1 flex flex-col lg:gap-8 lg:my-8 lg:pr-80">
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm" placeholder="Email"/>
                    <input className="bg-[#f9f9f9] rounded lg:p-4 lg:text-sm" placeholder="Password"/>
                    <div className="flex flex-row justify-between items-center lg:my-5">
                        <span className="text-sm">Forgot Password?</span>
                        <button className="bg-[#FF748D] text-white rounded font-normal lg:text-sm lg:px-4 lg:py-2">Login
                        </button>
                    </div>
                </form>
                <div>
                    <img className="lg:h-96" src="/Images/login-tweetx.svg" alt="SignupScreen-Tweetx"/>
                </div>
            </div>
        </div>
    )
}
