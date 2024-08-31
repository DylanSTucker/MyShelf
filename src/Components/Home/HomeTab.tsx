import "./HomeTab.css";
import {searchBooks} from "../../scripts/googleBooks";
import Card from "../Card/Card";
import Showcase from "../Showcase/Showcase";
import Modal from "../Modal/Modal";
import SignUp from "../../Pages/Login-Signup/SignUp";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import TagCloud from "TagCloud";

interface Props{
    search: string;
    tag: string;
    setBookItem: (item: Object) => void;
    setShowModal: (showModal: boolean) => void;
    maxResults: number;
    showcase: boolean;
}

const LandingNavbar = () =>{
    return(
        <nav>
            <div className="nav-logo">
                <i className="fa-solid fa-book fa-xl" />
                <p>My Shelf</p>

            </div>
            <div className="nav-buttons">
                <button>Books</button>
                <button>App</button>
                <button>Features</button>
                <div className="divider"></div>
                <div className="nav-login-buttons">
                    <button className="nav-signup">Sign Up</button>
                    <button className="nav-login">Login</button>
                </div>
            </div>

        </nav>

    );
}

const Search = (props: Props) =>{

    const [cookies] = useCookies(undefined);

    const [allBookData, setAllBookData] = useState([]);


    //search for books to display
    useEffect(() => {
        if(!cookies.authToken){
            //search google books
            searchBooks(props.search, setAllBookData, props.maxResults);
        }
    }, []); //only re-run the effect if query changes

    if(props.showcase){
        return (
            <div className="searches-container">
                {allBookData?.map((item: any) => (
                    <Showcase
                        book={item}
                        setBookItem={props.setBookItem}
                        setShowModal={props.setShowModal}
                        search={"mistborn"}
                    />
                ))}
            </div>
        );
    }else{
        return (
            <div className="searches-container">
                <h3>{props.tag}</h3>
                <div className="searches">
                    {allBookData?.map((item: any) => (
                        <Card
                            book={item}
                            setBookItem={props.setBookItem}
                            setShowModal={props.setShowModal}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

const HomeTab = () => {
    const [bookItem, setBookItem] = useState<object>();
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const redirect = () => {
        navigate("/SignUp");
    }


    useEffect(() => {
        return () => {
            const cloud: any = ".tagcloud";
            const text = [
                "Fantasy",
                "Sci-Fi",
                "Romance",
                "History",
                "Fiction",
                "Non-Fiction",
                "Science",
                "Self-Help",
                "Philosophy",
                "Thriller",
                "Historical Fiction",
                "Memoir",
                "Poetry",
                "Essay",
                "Autobiography",
                "Fairy Tale",
            ];

            const options: object = {
                radius: 200,
                maxSpeed: "normal",
                initSpeed: "normal",
                keep: true,
            };

            TagCloud(cloud, text, options);
        }
    }, []);


  return (
    <div className="home-container">
        <LandingNavbar/>
        <div className="welcome-text">
            <div className="emphasis">Welcome To <p>&nbsp;Your&nbsp;</p>  Shelf</div>
        </div>
        <div className="tagline">
            <p>Keep Track of Your Books. Take Notes. View Stats.</p>
        </div>
        <div className="quotes-container">
            <p></p>
        </div>

        <div className="login-buttons">
            <button className="sign-up" onClick={() => redirect()}>Sign Up</button>
        </div>
        {/*
                <div className="screenshot-container">
            <div className="screenshot-background"/>
        </div>
        */}
        {/*
        <div className="text-sphere">
            <span className="tagcloud"></span>
        </div>
        */}
        <div className="home-img-container">
            <div className="home-img-bg">
                <img className="home-img" src="/HomePage.png" alt="" />
            </div>
        </div>

        {!showModal && 
            <>
            <div className="showcase-container">
                <Search 
                    search={"1984"}
                    tag={"1984"}
                    setBookItem={setBookItem}
                    setShowModal={setShowModal}
                    maxResults={1}
                    showcase={true}
                />

            </div>
                <Search 
                    search={"subject:'Fantasy'"}
                    tag={"Fantasy"}
                    setBookItem={setBookItem}
                    setShowModal={setShowModal}
                    maxResults={5}
                    showcase={false}
                />

                <Search 
                    search={"subject:'Fiction'"}
                    tag={"Fiction"}
                    setBookItem={setBookItem}
                    setShowModal={setShowModal}
                    maxResults={5}
                    showcase={false}
                />

                <div className="showcase">
                    <Search 
                        search={"Meditations: A New Translation"}
                        tag={"Meditations"}
                        setBookItem={setBookItem}
                        setShowModal={setShowModal}
                        maxResults={1}
                        showcase={true}
                    />
                </div>

                <Search 
                    search={"subject:'Philosophy'"}
                    tag={"Philosophy"}
                    setBookItem={setBookItem}
                    setShowModal={setShowModal}
                    maxResults={5}
                    showcase={false}
                />
            </>
        }

        {showModal && (
            <Modal
            showModal={showModal}
            item={bookItem}
            onClose={() => setShowModal(false)}
            />
        )}
    </div>
  )
}

export default HomeTab;