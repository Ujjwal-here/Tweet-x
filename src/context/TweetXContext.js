import {createContext, useRef, useState} from "react";
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/config";

export const TweetXContext = createContext(null);

export const TweetXProvider = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [success, setSuccess] = useState("")
    const [error,setError]=useState("")
    const [posts,setPosts]=useState([])
    const postFormRef = useRef()


    const loggedInUid = localStorage.getItem("uid")

    async function fetchAllLoggedInPosts(){
        try{
            setIsLoading(true)
            const data = []
            const postsRef = collection(db,'posts')
            const q = query(postsRef, where(documentId(), '==', loggedInUid))
            const docSnap= await getDocs(q)
            docSnap.forEach((doc)=>{
                data.push(...doc.data().posts)
            })
            setPosts(data)
            setIsLoading(false)
        }
        catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
    }


    const data={
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        success,
        setSuccess,
        error,
        setError,
        postFormRef,
        posts,
        fetchAllLoggedInPosts,
    }
    return (
        <TweetXContext.Provider value={data}>
            {children}
        </TweetXContext.Provider>
    )
}

