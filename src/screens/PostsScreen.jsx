import {PostCard} from "../components/PostCard";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/config";
import {useEffect, useState} from "react";

export const PostsScreen = () => {
    const [posts, setPosts] = useState([])
    async function fetchAllPosts() {
        const data = []
        const collectionRef = collection(db, "posts")
        const q = query(collectionRef, orderBy("timestamp","desc"))
        const querySnapshot= await getDocs(q)
        querySnapshot.forEach((doc) => {
            if(doc.data().uid===localStorage.getItem("uid")){
                data.push(doc.data())
            }
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
        <div className="lg:my-16">
            {posts && posts.map((post)=>{
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
        </div>
    )
}
