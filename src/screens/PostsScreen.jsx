import {PostCard} from "../components/PostCard";
import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";
import {InfoMessage} from "../components/InfoMessage";

export const PostsScreen = () => {
    const {
        isLoading,
        setIsLoading,
        success,
        setSuccess,
        error,
        setError,
        posts,
        fetchAllLoggedInPosts
    } = useContext(TweetXContext)


    useEffect(() => {
        fetchAllLoggedInPosts()

        return () => {
            setIsLoading(false)
            setSuccess("")
            setError("")
        }
    }, [])

    if (isLoading) {
        return <div className="flex flex-row justify-center items-center my-20"><ClipLoader size={50} color="black"/>
        </div>
    }

    return (
        <div className="lg:my-16">
            {error && <div className="flex flex-row justify-center"><ErrorMessage message={error}/></div>}
            {posts.length===0 && <div className="flex flex-row justify-center"><InfoMessage message="No Post Found!"/> </div>}
            {posts && posts.map((post) => {
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
        </div>
    )
}
