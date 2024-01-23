export const PostCard = ({post}) => {
    return (
        <div className="flex flex-row shadow-[0_8px_24px_rgba(149,157,165,0.2)] rounded-xl relative md:p-5 md:gap-4 md:mx-16 lg:mx-20 md:my-8 xl:mx-24 xl:gap-5 xl:my-10 xl:p-5">
            <img className="inline-block md:h-10 md:w-10 xl:h-14 xl:w-14 rounded-full ring-2 ring-white"
                 src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt="profile_pic"/>
            <div className="md:mr-8 md:my-2 xl:mr-10 xl:my-2">
                <h3 className="font-medium text-base text-[#8F8F8F]">{post.name}</h3>
                <p className="font-light text-xs text-[#8F8F8F] md:mb-3 xl:mb-4 text-right">10 secs ago</p>
                <p className="font-normal text-xs text-[#8F8F8F] ">{post.description}</p>
            </div>
            <div className="absolute right-0">
                <div className="md:w-4 md:h-8 xl:w-5 xl:h-10 rounded-tl-full rounded-bl-full bg-[#FF748D]"></div>
            </div>
        </div>

    )
}
