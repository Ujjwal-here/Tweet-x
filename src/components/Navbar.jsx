export const Navbar = () => {
    return (
        <div className="shadow-md flex flex-row justify-between lg:py-6 lg:px-52">
            <h1 className="text-xl text-[#FF748D] font-semibold">TweetX</h1>
            <ul className="flex flex-row lg:gap-10">
                <li className="text-[#E8EAED]">Feed</li>
                <li className="text-[#E8EAED]">Users</li>
                <li className="text-[#E8EAED]">Profile</li>
            </ul>
        </div>
    )
}
