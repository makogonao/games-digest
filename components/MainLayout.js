import Head from "next/head";
import Header from "./Header";
import SearchContext from '../context'
import { useState } from "react";

export default function MainLayout({ children }) {

    const [searchString, setSearchString] = useState("")
    const [sortMethod, setSortMethod] = useState("-rating")
    const [platformId, setPlatformId] = useState(0)
    const [gamesCount, setGamesCount] = useState(0)

    const changeSearchString = (item) => {
        setSearchString(item)
    }
    const changeSortMethod = (item) => {
        setSortMethod(item)
    }
    const changePlatformId = (item) => {
        setPlatformId(item)
    }

    return (
        <SearchContext.Provider 
            value={{
                searchString: [searchString, setSearchString], 
                sortMethod: [sortMethod, setSortMethod], 
                platformId: [platformId, setPlatformId],
                gamesCount: [gamesCount, setGamesCount],
        }}>
                    <Head>
                        <title>Game digest</title>
                        <meta name="keywords" content="games, игра" />
                        <meta name="keywords" content="Справочник компьютерных игр" />
                        <meta charSet="utf-8" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
                        <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet"/>
                        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet"></link>
                    </Head>
                    <Header 
                        changeSearchString={(item)=>{changeSearchString(item)}}
                        changeSortMethod={(item)=>{changeSortMethod(item)}}
                        changePlatformId={(item)=>{changePlatformId(item)}}
                    />
                    <main>{children}</main>
        </SearchContext.Provider>
    );
}
