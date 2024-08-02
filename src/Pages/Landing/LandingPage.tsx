import "./LandingPage.css";


const LandingPage = () => {
    return(
    <div>
        <div className="landing-background-gradient"/>

        <div className="landing">
            <div className="landing-logo">My Shelf</div>
            <div className="landing-title">
                <h1>A Digital Book Shelf, For You.</h1>
                <p>Store notes for each book on your shelf.</p>
            </div>

            <div className="login-buttons">
                <button className="sign-up">Sign Up</button>
                <button className="login">Login</button>
            </div>
            <div className="landing-img">
                <img/>
            </div>
        </div>
    </div>
    );
}

export default LandingPage;
