import {useContext, useEffect} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase/config";
import {ClipLoader} from "react-spinners";

export const CreatePostModal = () => {
    const {
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        success,
        setSuccess,
        error,
        setError,
        postFormRef
    } = useContext(TweetXContext)

    function closeModalHandler() {
        setIsOpen(false)
    }

    async function createPostHandler(e) {
        e.preventDefault()
        const name = postFormRef.current[0].value
        const description = postFormRef.current[1].value
        try {
            setIsLoading(true)
            const uid = localStorage.getItem("uid")
            const docRef = doc(db, 'posts', uid)
            const result = await setDoc(docRef, {
                uid,
                name,
                description,
                timestamp: Timestamp.now()
            })
            setIsLoading(false)
            setSuccess("Post Created Successfully")
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }

        setIsOpen(false)
    }

    useEffect(() => {
        return () => {
            setIsLoading(false)
            setError("")
            setSuccess("")
        }
    }, []);
    return (
        <>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                 className={`bg-gray-50 overflow-y-auto overflow-x-hidden ${isOpen ? "flex" : "hidden"} fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-xl">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold">
                                Create New Post
                            </h3>
                            <button onClick={closeModalHandler} type="button"
                                    className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form ref={postFormRef} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="text" name="name" id="name"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                           placeholder="Type Post Name" required=""/>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description"
                                           className="block mb-2 text-sm font-medium text-gray-900">Post
                                        Description</label>
                                    <textarea id="description" rows="4"
                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                              placeholder="Write Post description here"></textarea>
                                </div>
                            </div>
                            <button onClick={createPostHandler} type="submit"
                                    className="text-white inline-flex items-center bg-[#FF748D] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                          clipRule="evenodd"></path>
                                </svg>
                                {isLoading ? <ClipLoader
                                    size={10}
                                    color="white"
                                /> : "Create Post"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
