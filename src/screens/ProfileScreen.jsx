import {Link, Outlet} from "react-router-dom";

export const ProfileScreen = () => {
    return (
        <div className="lg:mx-96 lg:my-10">
            <div className="flex flex-row lg:gap-28">
                <div>
                    <img className="inline-block lg:h-32 lg:w-32 rounded-full ring-2 ring-white"
                         src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt="profile_pic"/>
                </div>
                <div className="flex flex-col lg:gap-y-8 lg:my-10">
                    <h3 className="font-medium text-2xl text-[#707070]">Arjun Reddy</h3>
                    <div className="flex flex-row lg:gap-10">
                        <span className="text-[#B7B7B7]">Posts: 500</span>
                        <span className="text-[#B7B7B7]">Followers: 500</span>
                        <span className="text-[#B7B7B7]">Following: 500</span>
                    </div>
                </div>
            </div>
            <hr className="lg:mt-10 lg:mb-5 border-[#B7B7B7]"/>
            <div className="flex flex-row justify-between lg:gap-10 lg:mx-36">
                <Link to="/profile/posts" className="text-[#B7B7B7]"><i className="fa-solid fa-book"></i>{" "}Posts</Link>
                <Link to="/profile/followers" className="text-[#B7B7B7]"><i className="fa-solid fa-thumbs-up"></i>{" "}Followers</Link>
                <Link to="/profile/following" className="text-[#B7B7B7]"><i className="fa-solid fa-address-book"></i>{" "}Following</Link>
            </div>
            <Outlet/>
        </div>
    )
}
