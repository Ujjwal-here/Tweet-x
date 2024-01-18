import {PostCard} from "../components/PostCard";

export const FeedScreen = () => {
    return (
        <div className="lg:mx-96">
            <button className="bg-[#FF748D] shadow-xl text-white rounded font-normal lg:text-sm lg:px-6 lg:py-2 lg:mx-24 lg:mt-10">Write
            </button>
            <PostCard/>
            <PostCard/>
            <PostCard/>
        </div>
    )
}
