import "./LandingPage.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

//redirect to sign up page
const redirect = (navigate: ReturnType<typeof useNavigate>, endpoint: string) => {
    navigate("/" + endpoint);
}

//HTML reference elements for scrolling to element when button is clicked
interface landingProps{
    booksRef: React.RefObject<HTMLDivElement>;
    featuresRef: React.RefObject<HTMLDivElement>;
    appRef: React.RefObject<HTMLDivElement>;
}

const LandingNavbar = (props: landingProps) =>{
    const navigate = useNavigate();

    //functions for scrolling to element when nav button is clicked
    const scrollToBooks = () => {
        if (props.booksRef.current) {
            props.booksRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const scrollToApp = () => {
        if (props.appRef.current) {
            props.appRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const scrollToFeatures = () => {
        if (props.featuresRef.current) {
            props.featuresRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <nav className="landing-nav">
            <div className="nav-logo">
                <i className="fa-solid fa-book fa-xl" />
                <p>My Shelf</p>

            </div>
            <div className="nav-buttons">
                <button onClick={scrollToBooks}>Books</button>
                <button onClick={scrollToApp}>App</button>
                <button onClick={scrollToFeatures}>Features</button>
                <div className="divider"></div>
                <div className="nav-login-buttons">
                    <button className="nav-signup" onClick={() => redirect(navigate, "SignUp")}>Sign up</button>
                    <button className="nav-login" onClick={() => redirect(navigate, "Login")}>Login</button>
                </div>
            </div>

        </nav>

    );
}

const LandingPage = () => {

    const navigate = useNavigate();

    const booksRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);


  return (
    <div className="landing-container">

        <LandingNavbar booksRef={booksRef} featuresRef={featuresRef} appRef={appRef}/>
        <header>
            <div className="welcome-text">
                <h1>Welcome To </h1> 
                <h1 className="emphasis">&nbsp;Your&nbsp;</h1>  
                <h1> Shelf</h1>
            </div>
            <div className="tagline">
                <p>Keep Track of Your Books. Take Notes. View Stats.</p>
            </div>
            <div className="login-buttons">
                <button className="sign-up" onClick={() => redirect(navigate, "SignUp")}>Sign up</button>
            </div>
        </header>

        <div ref={booksRef} className="home-img-container">
                <div className="home-img-bg">
                    <video autoPlay muted loop className="home-img">
                        <source src="/home.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
        </div>
        
        <header ref={featuresRef} className="header">
            <h1>Keep Track of Your Thoughts While You Read.</h1>
        </header>
        
        <section className="info-container">
            <article className="info">
                <div>
                    <span className="material-symbols-outlined">
                        book_4
                    </span>
                    <h3>Log Your Reading Journey</h3>
                </div>
                <p>
                    Easily organize your personal library by saving books you've read or want to read. 
                    Filter your collection by genre to quickly find the next book on your list.
                </p>
            </article>
            <article className="info">
                <div>
                    <span className="material-symbols-outlined">
                        sticky_note_2
                    </span>
                    <h3>Document Your Thoughts</h3>
                </div>
                <p>
                    Capture your thoughts, notes, and favorite quotes from each book you read. 
                    Keep everything in one place for easy reference whenever you need it.
                </p>
            </article>
        </section>
        
        <section className="info-container">
            <article className="info">
                <div>
                    <span className="material-symbols-outlined">
                        library_books
                    </span>
                    <h3>Comprehensive Catalog</h3>
                </div>
                <p>
                    Explore millions of titles through our seamless integration with Google Books, 
                    ensuring you always have access to the latest and greatest reads.
                </p>
            </article>
            <article className="info">
                <div>
                    <span className="material-symbols-outlined">
                        money_off
                    </span>
                    <h3>It's Free</h3>

                </div>
                <p>
                    Enjoy all of these features at no cost. 
                    Sign up today and start building your book collection with no hidden fees or charges!
                </p>
            </article>
        </section>
        
        <hr className="line" />
        
        <section ref={appRef} className="coming-soon-container">
            <h1>Coming Soon!</h1>
        </section>
        
        <section className="upcoming-features">
            <p>App Version</p>
            <div />
            <p>Statistics</p>
            <div />
            <p>Share With Your Friends</p>
        </section>
    </div>
  )
}

export default LandingPage;
