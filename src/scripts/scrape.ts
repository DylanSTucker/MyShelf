import axios from "axios";
import { IBookData } from "./interfaces"; 


const allCategories = new Set(["Read", "To Be Read", "Reading", "Fiction", "Non-Fiction", "Fantasy", "Science Fiction", "Philosophy", "Satire", "Young Adult Fiction", "Humorous", "Suspense", "Classics", "Horror", "Comics & Graphic Novels", "Manga", "Dark Fantasy"]);

//this function may also be too slow with the .split.join calls
export const getBookInfo = async (
  volume_id: string,
  setData: (item: IBookData) => void
) => {
  //scrape the data needed from googles api
  axios
    .get("https://www.googleapis.com/books/v1/volumes/" + volume_id)
    .then((res) => {
      const str = res.data.volumeInfo.description;
      console.log(res.data.volumeInfo);
      setData({
        title: res.data.volumeInfo.title,
        author: res.data.volumeInfo.authors.toString(),
        publisher: res.data.volumeInfo.publisher,
        publisherDate: res.data.volumeInfo.publishedDate,
        categories: getCategories(res.data.volumeInfo.categories),
        thumbnail: res.data.volumeInfo.imageLinks.thumbnail,
        pageCount: res.data.volumeInfo.pageCount,
        //remove HTML tags in string, before setting the description with clean text
        description: str.split(/<[^>]*>/).join(""),
        volume_id: volume_id,
      });
    })
    .catch((err) => console.log(err));
};

//might be a faster method of doing this
/*
takes a list of strings in the format of ["Fiction / Fantasy / Romance", "Fiction / example / example"] 
keep track of duplicates and split the strings into sub arrays using " / " as marker
then check each category (ex. "Fantasy") to see if its in our allCategories set
*/
export const getCategories = (categories: string[]) =>{
  let hasFiction = false;
  let cat = [] as string[];
  let duplicates = new Set<string>();
  categories.map((item: string) => {
    const temp = item.split(" / ");
    temp.forEach((str: string) => {
      if(allCategories.has(str) && !duplicates.has(str)){
        duplicates.add(str);
        cat.push(str);
        if(str == "Fiction"){
          hasFiction = true;
        }
      }
    });
  });
  //check if 'Fiction' tag is in categories, if not, then add 'Non-Fiction'
  if(!hasFiction){
    cat.push("Non-Fiction");
  }

  //console.log(cat);
  return cat;
}


