export const UserCard = () => {
    return (
        <div className="lg:px-24">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center lg:gap-10">
                    <div>
                        <img className="inline-block lg:h-16 lg:w-16 rounded-full ring-2 ring-white"
                             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                             alt="profile_pic"/>
                    </div>
                    <div>
                        <h3 className="font-medium text-lg text-[#8F8F8F]">Arjun Reddy</h3>
                        <p className="font-light text-xs text-[#8F8F8F] lg:my-1">Following : 200</p>
                    </div>
                </div>
                <div>
                    <button className="bg-[#FF748D] text-white rounded font-normal lg:text-sm lg:px-6 lg:py-2">Follow
                    </button>
                </div>
            </div>
            <hr className="lg:my-12"/>
        </div>
    )
}
