import {createContext, useState} from "react";

export const TweetXContext = createContext(null);
export const TweetXProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const data={
        isOpen,setIsOpen
    }
    return (
        <TweetXContext.Provider value={data}>
            {children}
        </TweetXContext.Provider>
    )
}

