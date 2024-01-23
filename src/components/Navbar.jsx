import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth"
import {auth} from "../firebase/config";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";

export const Navbar = () => {
    const {error, setError} = useContext(TweetXContext)
    const navigate = useNavigate()

    const [activeList, setActiveList] = useState(null);

    const changeColor = (listId) => {
        // Set the active list and update the state
        setActiveList(listId);
    };

    useEffect(() => {
        return () => {
            setError("")
        }
    }, []);

    async function logoutHandler(){
        try {
            await signOut(auth)
            localStorage.removeItem("token")
            localStorage.removeItem("uid")
            navigate("/login")
        } catch (e) {
            setError(e.message)
        }

    }
    return (
        <div className="shadow-md flex flex-row justify-between items-center md:px-20 md:py-4 xl:py-4 xl:px-32">
            <h1 className="md:text-xl xl:text-2xl text-[#FF748D] font-bold">TweetX</h1>
            <ul className="flex flex-row md:gap-10 xl:gap-20">
                <Link to="/feed" className={`${activeList === 'list1' ? 'text-[#f17186]' : 'text-[#dcdcdc]'} text-[#E8EAED] md:text-sm xl:text-lg`}
                      onClick={() => changeColor('list1')}>Feed</Link>
                <Link to="/users" className={`${activeList === 'list2' ? 'text-[#f17186]' : 'text-[#dcdcdc]'} text-[#E8EAED] md:text-sm xl:text-lg`}
                      onClick={() => changeColor('list2')}>Users</Link>
                <Link to="/profile/posts" className={`${activeList === 'list3' ? 'text-[#f17186]' : 'text-[#dcdcdc]'} text-[#E8EAED] md:text-sm xl:text-lg`}
                      onClick={() => changeColor('list3')}>Profile</Link>
            </ul>
            <button onClick={logoutHandler} data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="border border-[#FF748D] text-[#FF748D] rounded font-normal md:text-sm md:px-4 md:py-1 xl:text-sm xl:px-6 xl:py-2 ">
                {"Logout"}
            </button>
        </div>
    )
}
