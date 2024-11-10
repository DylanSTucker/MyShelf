import { ChangeEvent, useEffect, useState } from "react";
import "./Stats.css";
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Label } from 'recharts';
import { useCookies } from "react-cookie";
import { IBookData } from "../../scripts/interfaces";

const colors = ["#34B1FE", "#62C370", "#9E4770", "#FEC601", "#EA7317", "#478978", "#E4572E", "#6761A8", "#F4F4F6", "#7A6F9B", "#D7E8BA", "#136F63", "#DEB841"];
const allCategories = new Set(["Fantasy", "Science Fiction", "Philosophy", "Satire", "Young Adult Fiction", "Humorous", "Suspense", "Classics", "Horror", "Comics & Graphic Novels", "Manga", "Dark Fantasy"]);
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


type infoTypes = Object[];
interface IFilters {
    allTime: boolean;
    yearRead: number;
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
    
    const [bookData, setBookData] = useState<IBookData>({
        title: "",
        author: "",
        publisher: "",
        publisherDate: "",
        categories: [],
        thumbnail: "",
        pageCount: 0,
        description: "",
        volume_id: "",
    });

    //NOTE!!!!!
    //this function should get book info from googleBooks.ts script instead of the server
    const getShelfData = async () => {
        try {
            const response = await fetch(
                `${process.env.SERVERURL_SHELF_USER}/${userEmail}`
            );
            const json = await response.json();
            setInfo(json);
            getData();
        } catch (err) {
            console.error(err);
        }
    };

    //get book info from googleBooks.ts
    const getData = () =>{

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

            //userData["pages read"] += bookData.pageCount;
        });
        //set data for bookType (count fiction or nonfiction)
        bookType.push({name: "Fiction", value: userData["Fiction"]});
        bookType.push({name: "Non-Fiction", value: userData["Non-Fiction"]});

      }


    useEffect(() => {
        getData();
    }, [genreData, userData]);

    //renders custom labels for pie chart
    const renderCustomizedLabel = (entry: any) => {
        const { x, y, cx, cy, name, percent } = entry;

        return(
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {name +` ${(percent * 100).toFixed(0)}%`}
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
                <PieChart className="pie-chart" width={400} height={400}>
                    <Pie data={bookType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={renderCustomizedLabel} labelLine={false}>
                        {
                            bookType.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>

            <div className="stats-content">
                <header>
                    <h2>Genre</h2>
                </header>
                <BarChart className="bar-chart" 
                    width={400} 
                    height={600} 
                    data={genreData} 
                    layout="vertical" 
                >
                    <CartesianGrid stroke="#FFFFFF" />
                    <XAxis dataKey="value" type="number">
                        <Label value="# of books" position="bottom"/>
                    </XAxis>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip />
                    <Bar dataKey="value" >
                    {
                        genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))
                    }
                    </Bar>
                </BarChart>
            </div>
            <div className="stats-content">
                <header>
                    <h2>Authors Read</h2>
                    <p>{userData["authors read"]}</p>
                </header>
                <BarChart className="bar-chart" 
                    width={400} 
                    height={600} 
                    data={authorData} 
                    layout="vertical" 
                >
                    <CartesianGrid stroke="#FFFFFF" />
                    <XAxis dataKey="value" type="number">
                        <Label value="# of books" position="bottom"/>
                    </XAxis>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip />
                    <Bar dataKey="value" >
                    {
                        authorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))
                    }
                    </Bar>
                </BarChart>
            </div>

            <div className="stats-content">
                <header>
                    <h2>Pages Read</h2>
                    <p>{userData["pages read"]}</p>
                </header>
                <PieChart className="pie-chart" width={400} height={400}>
                    <Pie data={bookType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={renderCustomizedLabel} labelLine={false}>
                        {
                            bookType.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default Stats;