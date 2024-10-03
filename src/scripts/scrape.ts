import axios from "axios";

const allCategories = new Set(["Fiction", "Fantasy", "Science Fiction", "Philosophy", "Satire", "Young Adult Fiction", "Humorous", "Suspense", "Classics", "Horror", "Comics & Graphic Novels", "Manga", "Dark Fantasy"]);

//this function may also be too slow with the .split.join calls
export const getBookInfo = async (
  volume_id: string,
  setData: (item: Object) => void
) => {
  //scrape the data needed from googles api
  axios
    .get("https://www.googleapis.com/books/v1/volumes/" + volume_id)
    .then((res) => {
      const str = res.data.volumeInfo.description;
      setData({
        title: res.data.volumeInfo.title,
        author: res.data.volumeInfo.authors.toString(),
        publisher: res.data.volumeInfo.publisher,
        publisherDate: res.data.volumeInfo.publishedDate,
        categories: getCategories(res.data.volumeInfo.categories),
        thumbnail: res.data.volumeInfo.imageLinks.thumbnail,
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
const getCategories = (categories: string[]) =>{
  let cat = [] as string[];
  let duplicates = new Set<string>();
  categories.map((item: string) => {
    const temp = item.split(" / ");
    console.log(temp);
    temp.forEach((str: string) => {
      if(allCategories.has(str) && !duplicates.has(str)){
        duplicates.add(str);
        cat.push(str);
      }
    });
  });
  console.log(cat);
  return cat;
}
