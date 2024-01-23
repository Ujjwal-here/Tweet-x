import {CreatePostModal} from "../components/CreatePostModal";
import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {PostCard} from "../components/PostCard";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";
import {useFeed} from "../hooks/useFeed";
import {InfoMessage} from "../components/InfoMessage";

export const FeedScreen = () => {
    const {isLoading, setIsLoading, error, setError} = useContext(TweetXContext)

    const {fetchAllPosts, posts, openModalHandler} = useFeed()

    useEffect(() => {
        fetchAllPosts()

        return ()=>{
            setIsLoading(false)
            setError("")
        }
    }, [])

    if (isLoading){
        return <div className="flex flex-row justify-center items-center h-lvh"><ClipLoader size={50} color="black"/></div>
    }

    return (
        <div className="md:mx-24 lg:mx-48 xl:mx-72 2xl:mx-96">
            {posts.length === 0 && <div className="sm:my-5 flex flex-row justify-center"><InfoMessage message="No Post Found !"/></div>}
            {error && <div className="sm:my-5 flex flex-row justify-center"><ErrorMessage message={error}/></div>}
            <button onClick={openModalHandler} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    className="bg-[#FF748D] shadow-xl text-white rounded font-normal md:text-xs md:px-6 md:py-2 md:mt-10 lg:text-sm md:mx-16 lg:mx-20 xl:text-sm xl:px-6 xl:py-2 xl:mx-24 xl:mt-10 2xl:text-base">Create
                Post
            </button>
            {posts && posts.map((post)=>{
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
            <CreatePostModal/>
        </div>
    )
}
