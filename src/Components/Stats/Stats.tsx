import { useEffect, useState } from "react";
import "./Stats.css";
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, ResponsiveContainer, Label } from 'recharts';
import { useCookies } from "react-cookie";

const colors = ["#34B1FE", "#62C370", "#9E4770", "#FEC601", "#EA7317", "#478978", "#E4572E", "#6761A8", "#F4F4F6", "#7A6F9B", "#D7E8BA", "#136F63", "#DEB841"];
const nonCategories = new Set(["Read", "Reading", "To Be Read", "Fiction", "Non-Fiction"]);

var genreData: { name: string; value: number }[] = [];
var authorData: { name: string; value: number }[] = [];


var userData: { [key: string]: number } = {
    "Read": 0,
    "Reading": 0,
    "To Be Read": 0,
    "authors read": 0,
    "pages read": 0,
    "Fiction": 0,
    "Non-Fiction": 0
};
var bookType: {name: string, value: number}[] = [];
var bookSize: {name: string, value: number}[] = [
    {name: "<300", value: 0},
    {name: "300-499", value: 0},
    {name: ">500", value: 0}
];


type infoTypes = Object[];
interface IFilters {
    allTime: boolean;
    yearRead: number;
}

/*
check the page count of different books to determine the size of the book
    small: less than 300 pages
    medium: 300-499 pages
    large: more than 500 pages
*/
const getBookSizeData = (item: any) =>{
    userData["pages read"] += item.page_count;
    if(item.page_count < 300){
        bookSize[0].value += 1;
    }else if(item.page_count >= 300 && item.page_count < 500){
        bookSize[1].value += 1;
    }else{
        bookSize[2].value += 1;
    }

}

/*
Get author data
- count number of unique authors read, and count how many books read from each author
*/ 
const getAuthorData = (author: string, authorDuplicates: Set<string>) =>{
    if(!authorDuplicates.has(author)){
        //count number of unique authors read
        userData["authors read"] += 1;
        authorData.push({name: author, value: 1});
        authorDuplicates.add(author);
    }else{
        //count how many books read from each author
        const value = authorData.find(item => item.name === author);
        if(value){
            value.value += 1;
        }
    }
}

//get user data based on other filters selected
const getUserData = (item: any, filters: IFilters) =>{
    const categories = item.categories.split(",");
    categories?.map((category: string) =>{
        //make sure that date_read is not null
        if(item.date_read || filters.allTime == true){
        //get data for the year that was selected
            const readDate = new Date(item.date_read);
            //was option selected for 'All Time' or is the 'year' option the same as the year the book was read
            const readOnSelectedYear = filters.allTime == true || filters.yearRead == readDate.getFullYear();

            //find book in genreData
            let value = genreData.find(item => item.name === category);

            if(readOnSelectedYear){
                if(nonCategories.has(category)){
                    userData[category] += 1;
                }else if(!value){
                    const newValue = { name: category, value: 1};
                    genreData.push(newValue);

                }else {
                    value.value += 1;
                }
            }
        }
    });
}

const Stats = () => {
    const [info, setInfo] = useState<infoTypes>();
    //const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [cookies] = useCookies(undefined);
    const userEmail = cookies.Email;
    const [selectedOption, setSelectedOption] = useState("All Time");

    //NOTE!!!!!
    //this function should get book info from googleBooks.ts script instead of the server
    const getShelfData = async () => {
        try {
            fetch(
                `${process.env.SERVERURL_SHELF_USER}/${userEmail}`
            ).then((res) => res.json())
            .then((responseJson) => {
                getData(responseJson);

            });
        } catch (err) {
            console.error(err);
        }
    };

    //get book info from googleBooks.ts
    const getData = (info: infoTypes) =>{
        setInfo(info);

        //reset data
        for(let key in userData){
            userData[key] = 0;
        }
        genreData = [];
        bookType = [];
        authorData = [];
        var authorDuplicates: Set<string> = new Set([]);


        info?.map((item: any) => {
            if(selectedOption === "All Time"){
                getUserData(item, {allTime: true, yearRead: 2024});
            }else{
                getUserData(item, {allTime: false, yearRead: parseInt(selectedOption)});
            }
            //get author related data
            getAuthorData(item.author, authorDuplicates);

            //get book size data
            getBookSizeData(item);
        });
        //set data for bookType (count fiction or nonfiction)
        bookType.push({name: "Fiction", value: userData["Fiction"]});
        bookType.push({name: "Non-Fiction", value: userData["Non-Fiction"]});

      }


    useEffect(() => {
        //when get data button is pressed refresh component
    }, [info]);

    //renders custom labels for pie chart
    const renderCustomizedLabel = (entry: any) => {
        const { x, y, cx, name, percent } = entry;

        return(
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={30}>
            {name +` (${(percent * 100).toFixed(0)}%)`}
          </text>
        );
    }

    return (
        <div className="stats-container">
            <header className="stats-header">
                <h1><span>Your</span> Data</h1>
            </header>
            <div className="data-filters">
                <button onClick={getShelfData}>get data</button>

                <select onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="All Time">All Time</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                </select>
            </div>
            <div className="stats-content">

                <div className="stats-item">
                    <h2>Books Read</h2>
                    <p>{userData["Read"]}</p>
                </div>
                <hr/>
                <div className="stats-item">
                    <h2>Books Reading</h2>
                    <p>{userData["Reading"]}</p>
                </div>
                <hr/>
                <div className="stats-item">
                    <h2>Books To Read</h2>
                    <p>{userData["To Be Read"]}</p>
                </div>
            </div>
            <div className="stats-content">
                <header>
                    <h2>Fiction / Non-Fiction</h2>
                </header>
                <ResponsiveContainer width={400} aspect={1}>

                    <PieChart className="pie-chart">
                        <Pie data={bookType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} label={renderCustomizedLabel} labelLine={false}>
                            {
                                bookType.map((_, index: number) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="stats-content">
                <header>
                    <h2>Genre</h2>
                </header>
                <ResponsiveContainer width="75%" aspect={1}>
                    <BarChart className="bar-chart" 
                        data={genreData} 
                        layout="vertical" 
                    >
                        <CartesianGrid stroke="#FFFFFF" />
                        <XAxis dataKey="value" type="number" fontSize={25}>
                            <Label value="# of books" position="bottom" fontSize={25}/>
                        </XAxis>
                        <YAxis dataKey="name" type="category" fontSize={25}/>
                        <Tooltip />
                        <Bar dataKey="value" >
                        {
                            genreData.map((_, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))
                        }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="stats-content">
                <header>
                    <h2>Authors Read</h2>
                    <p>{userData["authors read"]}</p>
                </header>
                <ResponsiveContainer width={800} aspect={1}>
                    <BarChart className="bar-chart" 
                        data={authorData} 
                        layout="vertical" 
                    >
                        <CartesianGrid stroke="#FFFFFF" />
                        <XAxis dataKey="value" type="number" fontSize={25}>
                            <Label value="# of books" position="bottom" fontSize={25}/>
                        </XAxis>
                        <YAxis dataKey="name" type="category" fontSize={15}/>
                        <Tooltip />
                        <Bar dataKey="value" >
                        {
                            authorData.map((_, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))
                        }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="stats-content">
                <header>
                    <h2>Pages Read</h2>
                    <p>{userData["pages read"]}</p>
                </header>
                <ResponsiveContainer width={400} aspect={1}>
                    <PieChart className="pie-chart">
                        <Pie data={bookSize} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} label={renderCustomizedLabel} labelLine={false}>
                            {
                                bookSize.map((_, index: number) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Stats;