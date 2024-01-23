import {CreatePostModal} from "../components/CreatePostModal";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/config";
import {PostCard} from "../components/PostCard";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";

export const FeedScreen = () => {
    const [posts, setPosts] = useState([])
    const {setIsOpen, isLoading, setIsLoading, error, setError} = useContext(TweetXContext)


    function openModalHandler(){
        setIsOpen(true)
    }

    async function fetchAllPosts() {
        try {
            setIsLoading(true)
            const data = []
            const collectionRef = collection(db, "posts")
            const querySnapshot= await getDocs(collectionRef)
            querySnapshot.forEach((doc) => {
                const sortByTimestamp= doc.data().posts.sort(function (a,b){
                    return b.timestamp.seconds- a.timestamp.seconds
                })
                data.push(...sortByTimestamp)
            })
            setPosts(data)
            setIsLoading(false)
        }catch (e){
            setError("Oops! Something went wrong. We couldn't fetch the posts at the moment. Please try again later")
            setIsLoading(false)
        }

    }

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
            {error && <ErrorMessage message={error}/> }
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
