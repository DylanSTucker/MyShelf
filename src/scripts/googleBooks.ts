import axios from "axios";


const google_api_key = process.env.GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (search: string, setAllBookData: (item: []) => void, maxResults: number) =>{
    axios
        .get(
            "https://www.googleapis.com/books/v1/volumes?q=" + search +
            "&key=" +
            google_api_key +
            "&maxResults=" + maxResults
        )
        .then((res) => {
            setAllBookData(res.data.items);
        })
        .catch((err) => console.log(err));
}