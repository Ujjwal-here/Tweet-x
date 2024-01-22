import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth"
import {auth} from "../firebase/config";

export const Navbar = () => {
    const navigate = useNavigate()
    async function logoutHandler(){
        await signOut(auth)
        localStorage.removeItem("token")
        localStorage.removeItem("uid")
        navigate("/login")
    }
    return (
        <div className="shadow-md flex flex-row justify-between items-center lg:py-6 lg:px-52">
            <h1 className="text-xl text-[#FF748D] font-semibold">TweetX</h1>
            <ul className="flex flex-row lg:gap-10">
                <Link to="/feed" className="text-[#E8EAED]">Feed</Link>
                <Link to="/users" className="text-[#E8EAED]">Users</Link>
                <Link to="/profile" className="text-[#E8EAED]">Profile</Link>
            </ul>
            <button onClick={logoutHandler} data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="border border-[#FF748D] text-[#FF748D] rounded font-normal lg:text-sm lg:px-6 lg:py-2 ">Logout
            </button>
        </div>
    )
}
