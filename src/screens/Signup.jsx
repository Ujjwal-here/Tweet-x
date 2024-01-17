import SignupImage from "../../public/Images/signup_tweetx.svg"

export const Signup = () => {
    return (
        <>
            <h3>TweetX</h3>
            <button>Login</button>
            <h1>Create Account</h1>
            <div>
                <div>
                    <input placeholder="Name"/>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <input placeholder="Confirm Password"/>
                </div>
                <img src={SignupImage} alt="Signup-Tweetx"/>
            </div>

            <button>Submit</button>
        </>
    )
}
