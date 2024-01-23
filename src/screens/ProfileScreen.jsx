import {Link, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {TweetXContext} from "../context/TweetXContext";
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/config";
import {ClipLoader} from "react-spinners";
import {ErrorMessage} from "../components/ErrorMessage";

export const ProfileScreen = () => {
    const {
        error,
        posts,
        fetchAllLoggedInPosts
    } = useContext(TweetXContext)


    const [profileLoader, setProfileLoader] = useState(false)
    const {setError} = useContext(TweetXContext)
    const loggedInUid = localStorage.getItem("uid")

    const [userData, setUserData] = useState()

    const [activeList, setActiveList] = useState("list1");

    const changeColor = (listId) => {
        // Set the active list and update the state
        setActiveList(listId);
    };

    async function getAllLoggedInUserData() {
        try {
            setProfileLoader(true)
            const data = []
            const userRef = collection(db, 'users')
            const q = query(userRef, where(documentId(), '==', loggedInUid))
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                data.push(doc.data())
            })
            setUserData(data)
            setProfileLoader(false)
        } catch (e) {
            setError("We couldn't fetch user data. Please try again.")
            setProfileLoader(false)
        }
    }

    useEffect(() => {
        getAllLoggedInUserData()
        fetchAllLoggedInPosts()
    }, []);

    if (profileLoader) {
        return <div className="flex flex-row justify-center items-center h-lvh"><ClipLoader size={50} color="black"/>
        </div>
    }
    return (
        <div className="md:mx-32 md:my-10 lg:mx-52 lg:my-14 xl:mx-72 xl:my-16 2xl:mx-96">
            {error && <ErrorMessage message="Couldn't fetch Profile"/> }
            {userData && <>
                <div className="flex flex-row md:gap-20 lg:gap-24 xl:gap-28">
                <div>
                    <img className="inline-block md:h-20 md:w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32 rounded-full ring-2 ring-white"
                         src="https://images.pexels.com/photos/11873209/pexels-photo-11873209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                         alt="profile_pic"/>
                </div>
                    <div className="flex flex-col md:gap-y-4 md:my-8 lg:gap-y-6 lg:my-8 xl:gap-y-8 xl:my-10">
                        <h3 className="font-medium md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#707070]">{userData[0].name}</h3>
                        <div className="flex flex-row md:gap-7 lg:gap-9 xl:gap-10">
                            <span className={`text-[#B7B7B7] md:text-sm lg:text-base xl:text-lg 2xl:text-xl`}>Posts: {posts?.length}</span>
                            <span className={`text-[#B7B7B7] md:text-sm lg:text-base xl:text-lg 2xl:text-xl`}>Followers: {userData[0].followers.length}</span>
                            <span className={`text-[#B7B7B7] md:text-sm lg:text-base xl:text-lg 2xl:text-xl`}>Following: {userData[0].following.length}</span>
                    </div>
                </div>
            </div>
                <hr className="md:mt-6 xl:mt-10 border-[#B7B7B7]"/>
                <div className="flex flex-row justify-between md:mb-10 md:gap-6 md:mx-20 lg:gap-8 lg:mx-28 xl:gap-10 xl:mx-40">
                <Link to="/profile/posts" onClick={() => changeColor('list1')} className={`${activeList === 'list1' ? 'border-t-2 border-[#747474] text-[#747474]' : 'text-[#bfbfbf]'} text-[#B7B7B7] text-center flex-1 sm:pt-3 md:text-sm lg:text-sm xl:text-base 2xl:text-lg`}><i className="fa-solid fa-book"></i>{" "}Posts</Link>
                <Link to="/profile/followers" onClick={() => changeColor('list2')} className={`${activeList === 'list2' ? 'border-t-2 border-[#747474] text-[#747474]' : 'text-[#bfbfbf]'} text-[#B7B7B7] text-center sm:pt-3 flex-1 md:text-sm lg:text-sm xl:text-base 2xl:text-lg`}><i className="fa-solid fa-thumbs-up"></i>{" "}Followers</Link>
                <Link to="/profile/following" onClick={() => changeColor('list3')} className={`${activeList === 'list3' ? 'border-t-2 border-[#747474] text-[#747474]' : 'text-[#bfbfbf]'} text-[#B7B7B7] text-center sm:pt-3 flex-1 md:text-sm lg:text-sm xl:text-base 2xl:text-lg`}><i className="fa-solid fa-address-book"></i>{" "}Following</Link>
            </div>
            <Outlet/>
            </>
            }
        </div>
    )
}
