import {CreatePostModal} from "../components/CreatePostModal";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/config";
import {PostCard} from "../components/PostCard";
import {ClipLoader} from "react-spinners";

export const FeedScreen = () => {
    const [posts, setPosts] = useState([])
    const {isOpen, setIsOpen, isLoading, setIsLoading, success, setSuccess, error, setError} = useContext(TweetXContext)


    function openModalHandler(){
        setIsOpen(true)
    }

    async function fetchAllPosts() {
        try {
            setIsLoading(true)
            const data = []
            const collectionRef = collection(db, "posts")
            const q = query(collectionRef, orderBy("timestamp","desc"))
            const querySnapshot= await getDocs(q)
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            setPosts(data)
            setIsLoading(false)
            setSuccess("Post Fetched Successfully!")
        }catch (e){
            setError(e.message)
            setIsLoading(false)
        }

    }


    useEffect(() => {
        fetchAllPosts()

        return ()=>{
            setIsLoading(false)
            setError("")
            setSuccess("")
        }
    }, [])

    if (isLoading){
        return <div className="flex flex-row justify-center items-center h-lvh"><ClipLoader size={50} color="black"/></div>
    }

    return (
        <div className="md:mx-28 lg:mx-40 xl:mx-72">
            <button onClick={openModalHandler} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    className="bg-[#FF748D] shadow-xl text-white rounded font-normal md:text-xs md:px-6 md:py-2 md:mt-10 lg:text-sm lg:mx-24 xl:text-sm xl:px-6 xl:py-2 xl:mx-24 xl:mt-10">Create
                Post
            </button>
            {posts && posts.map((post)=>{
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
            <CreatePostModal/>
        </div>
    )
}
