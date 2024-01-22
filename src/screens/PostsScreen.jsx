import {PostCard} from "../components/PostCard";
import {collection, getDocs, orderBy, query,doc,where,documentId} from "firebase/firestore";
import {db} from "../firebase/config";
import {useEffect, useState} from "react";

export const PostsScreen = () => {
    const [posts, setPosts] = useState([])
    async function fetchAllPosts() {
        const uid= localStorage.getItem("uid")
        const data = []
        const booksRef = collection(db,'posts')
        const q = query(booksRef, where(documentId(), '==', uid))
        const docSnap= await getDocs(q)
        docSnap.forEach((doc)=>{
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
        <div className="lg:my-16">
            {posts && posts.map((post)=>{
                return <PostCard key={post.timestamp.seconds} post={post} />
            })}
        </div>
    )
}
