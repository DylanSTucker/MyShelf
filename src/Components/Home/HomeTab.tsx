import "./HomeTab.css";
import {searchBooks} from "../../scripts/googleBooks";
import Card from "../Card/Card";
import Showcase from "../Showcase/Showcase";
import Modal from "../Modal/Modal";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Props{
    search: string;
    tag: string;
    setBookItem: (item: Object) => void;
    setShowModal: (showModal: boolean) => void;
    maxResults: number;
    showcase: boolean;
}

const Search = (props: Props) =>{

    const [cookies] = useCookies(undefined);

    const [allBookData, setAllBookData] = useState([]);


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


  return (
    <div className="home-container">
        {!showModal && 
            <>
            <div className="showcase">
                    <Search 
                        search={"Mistborn"}
                        tag={"Mistborn"}
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