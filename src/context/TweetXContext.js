import {createContext, useRef, useState} from "react";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase/config";
import {Timestamp} from "firebase/firestore";

export const TweetXContext = createContext(null);
export const TweetXProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState("")
    const formRef = useRef()

    async function createPostHandler(e){
        setIsLoading(prevState => !prevState)
        e.preventDefault()
        const name= formRef.current[0].value
        const description= formRef.current[1].value
        try{
            const uid= localStorage.getItem("uid")
            const docRef = doc(db, 'posts', uid)
            const result = await setDoc(docRef, {
                uid,
                name,
                description,
                timestamp: Timestamp.now()
            })
            setIsLoading(prevState => !prevState)
        }
        catch (e) {
            setError(e.message)
            setIsLoading(prevState => !prevState)
        }
        setIsOpen(prevState => !prevState)
    }
    const data={
        isOpen, setIsOpen, formRef,createPostHandler
    }
    return (
        <TweetXContext.Provider value={data}>
            {children}
        </TweetXContext.Provider>
    )
}

