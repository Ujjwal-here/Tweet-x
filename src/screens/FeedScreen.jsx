import {CreatePostModal} from "../components/CreatePostModal";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {collection, getDocs, orderBy,query} from "firebase/firestore";
import {db} from "../firebase/config";
import {PostCard} from "../components/PostCard";

export const FeedScreen = () => {
    const [posts, setPosts] = useState([])
    const {isOpen,setIsOpen} = useContext(TweetXContext)

    function openModalHandler(){
        setIsOpen(prevState=>!prevState)
    }

    async function fetchAllPosts() {
        const data = []
        const collectionRef = collection(db, "posts")
        const q = query(collectionRef, orderBy("timestamp","desc"))
        const querySnapshot= await getDocs(q)
        querySnapshot.forEach((doc) => {
           data.push(doc.data())
        })
        setPosts(data)
    }


    useEffect(() => {
        try {
            fetchAllPosts()
        } catch (e) {
            console.log(e.message)
        }

    }, [])

    return (
        <div className="lg:mx-96">
            <button onClick={openModalHandler} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                className="bg-[#FF748D] shadow-xl text-white rounded font-normal lg:text-sm lg:px-6 lg:py-2 lg:mx-24 lg:mt-10">Write
            </button>
            {posts && posts.map((post)=>{
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
            <CreatePostModal/>
        </div>
    )
}
