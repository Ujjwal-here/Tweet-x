import {PostCard} from "../components/PostCard";
import {CreatePostModal} from "../components/CreatePostModal";
import {useContext, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";

export const FeedScreen = () => {
    const {isOpen,setIsOpen} = useContext(TweetXContext)

    function openModalHandler(){
        setIsOpen(prevState=>!prevState)
    }

    return (
        <div className="lg:mx-96">
            <button onClick={openModalHandler} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                className="bg-[#FF748D] shadow-xl text-white rounded font-normal lg:text-sm lg:px-6 lg:py-2 lg:mx-24 lg:mt-10">Write
            </button>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <CreatePostModal/>
        </div>
    )
}
