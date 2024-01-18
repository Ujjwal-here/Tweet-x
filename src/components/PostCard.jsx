export const PostCard = () => {
    return (
        <div className="flex flex-row shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-xl relative lg:mx-24 lg:gap-5 lg:my-10 lg:p-5">
            <img className="inline-block lg:h-14 lg:w-14 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt="profile_pic"/>
            <div className="lg:mr-10 lg:my-2">
                <h3 className="font-medium text-md text-[#8F8F8F]">Arjun Reddy</h3>
                <p className="font-light text-xs text-[#8F8F8F] lg:mb-4 text-right">10 mins ago</p>
                <p className="font-normal text-xs text-[#8F8F8F] ">Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s</p>
            </div>
            <div className="absolute right-0 bottom-12">
                <div className="lg:w-5 lg:h-10 rounded-tl-full rounded-bl-full bg-[#FF748D]"></div>
            </div>
        </div>

    )
}
