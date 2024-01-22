import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth"
import {auth} from "../firebase/config";
import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {ClipLoader} from "react-spinners";

export const Navbar = () => {
    const {isLoading, setIsLoading, success, setSuccess, error, setError} = useContext(TweetXContext)
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            setError("")
            setIsLoading(false)
            setSuccess("")
        }
    }, []);

    async function logoutHandler(){
        try {
            setIsLoading(true)
            await signOut(auth)
            localStorage.removeItem("token")
            localStorage.removeItem("uid")
            setSuccess("Logged Out Successfully!")
            setIsLoading(false)
            navigate("/login")
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }

    }
    return (
        <div className="shadow-md flex flex-row justify-between items-center md:px-20 md:py-4 xl:py-4 xl:px-32">
            <h1 className="md:text-xl xl:text-2xl text-[#FF748D] font-bold">TweetX</h1>
            <ul className="flex flex-row md:gap-10 xl:gap-20">
                <Link to="/feed" className="text-[#E8EAED] md:text-sm xl:text-lg">Feed</Link>
                <Link to="/users" className="text-[#E8EAED] md:text-sm xl:text-lg">Users</Link>
                <Link to="/profile" className="text-[#E8EAED] md:text-sm xl:text-lg">Profile</Link>
            </ul>
            <button onClick={logoutHandler} data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="border border-[#FF748D] text-[#FF748D] rounded font-normal md:text-sm md:px-4 md:py-1 xl:text-sm xl:px-6 xl:py-2 ">
                {isLoading ? <ClipLoader
                    size={10}
                    color="white"
                /> : "Logout"}
            </button>
        </div>
    )
}
