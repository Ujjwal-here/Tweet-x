import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className="shadow-md flex flex-row justify-between lg:py-6 lg:px-52">
            <h1 className="text-xl text-[#FF748D] font-semibold">TweetX</h1>
            <ul className="flex flex-row lg:gap-10">
                <Link to="/feed" className="text-[#E8EAED]">Feed</Link>
                <Link to="/users" className="text-[#E8EAED]">Users</Link>
                <Link to="/profile" className="text-[#E8EAED]">Profile</Link>
            </ul>
        </div>
    )
}
