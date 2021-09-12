import styled from "styled-components";
import { keyframes } from 'styled-components'
import SearchContext from "../context";
import GameLoadBlock from "./GameLoadBlock";

import { useContext, useEffect, useState } from "react";

const GameListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
`;

const ArrowTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background-color: rgba(242, 242, 242, 0.5);
    top: 40px;
    right: 20px;
    position: fixed;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
`

const ArrowBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background-color: rgba(242, 242, 242, 0.5);
    bottom: 40px;
    right: 20px;
    position: fixed;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    display: flex;
    justify-content: center;
    &::after {
    border: 5px solid #d2d2d2;
    border-top: 5px solid rgba(255, 255, 255, 0);
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 20px;
    content: "";
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;


    -webkit-box-shadow: 0px 0px 8px 1px rgba(59, 59, 59, 1);
    -moz-box-shadow: 0px 0px 8px 1px rgba(59, 59, 59, 1);
    box-shadow: 0px 0px 8px 1px rgba(59, 59, 59, 1);
}
`

export default function GameList() {
    
    const {searchString} = useContext(SearchContext)
    const {sortMethod} = useContext(SearchContext)
    const {platformId} = useContext(SearchContext)
    const {gamesCount} = useContext(SearchContext);
    const [isLoad, setIsLoad] = useState(false);
    const [pageArr, setPageArr] = useState([1])
    const [maxPage, setMaxPage] = useState(1)
    const [ArrowTopIsVisible, setArrowTopIsVisible] = useState(false)
    const [ArrowBottomIsVisible, setArrowBottomIsVisible] = useState(false)

    const changeLoadStatus = (item) => {
        setIsLoad(item)
    }

    useEffect(()=>setMaxPage(Math.ceil(gamesCount[0]/10)), [gamesCount[0]])

    useEffect(()=>{
        setPageArr([1])
        setArrowBottomIsVisible(false)
    }, [searchString[0], platformId[0], sortMethod[0]])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    })

    const scrollHandler = (e) => {
        if (pageArr.length < maxPage && !isLoad) {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) {
                setPageArr([...pageArr, pageArr.length + 1])
            }
        }   
        if (e.target.documentElement.scrollTop > 200) {
            setArrowTopIsVisible(true)
        } else {
            setArrowTopIsVisible(false)
        }
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) > 1200) {
            setArrowBottomIsVisible(true)
        } else {
            setArrowBottomIsVisible(false)
        }
    }

    return (
        <>
        {ArrowTopIsVisible && <ArrowTop onClick={()=>window.scrollTo(pageXOffset, 0)} className="material-icons">arrow_upward</ArrowTop>}
        {ArrowBottomIsVisible && <ArrowBottom onClick={()=>window.scrollTo(pageXOffset, document.body.scrollHeight)} className="material-icons">arrow_downward</ArrowBottom>}
            <GameListContainer searchString={searchString} sortMethod={sortMethod} platformId={platformId}>
                {pageArr.map((item)=>(<GameLoadBlock key={item} page={item} pageSize={10} isLoad={isLoad} changeLoadStatus={(item)=>changeLoadStatus(item)}/>))}
                {isLoad && <Spinner/>}
            </GameListContainer>
        </>
    );
}
