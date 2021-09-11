import styled from "styled-components";
import SearchContext from "../context";
import GameLoadBlock from "./GameLoadBlock";

import { useContext, useEffect, useState } from "react";

const GameListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
`;

const TestBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    background-color: orange;
`;

const ArrowTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background-color: rgba(242, 242, 242, 0.4);
    top: 20px;
    right: 20px;
    position: fixed;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    cursor: pointer;
`




export default function GameList() {
    
    const {searchString} = useContext(SearchContext)
    const {sortMethod} = useContext(SearchContext)
    const {platformId} = useContext(SearchContext)
    const { gamesCount } = useContext(SearchContext);
    const [pageArr, settPageArr] = useState([1])
    const [maxPage, setMaxPage] = useState(1)
    const [ArrowIsVisible, setArrowIsVisible] = useState(false)

    useEffect(()=>setMaxPage(Math.ceil(gamesCount[0]/10)), [gamesCount[0]])

    useEffect(()=>settPageArr([1]), [searchString, platformId, sortMethod])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    })

    const scrollHandler = (e) => {
        if (pageArr.length < maxPage) {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) {
                settPageArr([...pageArr, pageArr.length + 1])
            }
        }   
        if (e.target.documentElement.scrollTop > 200) {
            setArrowIsVisible(true)
        } else {
            setArrowIsVisible(false)
        }
    }

    return (
        <>
        
        {/* <TestBlock>
            <div>Строка поиска: {searchString}</div>
            <div>Метод сортировки: {sortMethod}</div>
            <div>ID игровой платформы: {platformId}</div>
        </TestBlock> */}

            {ArrowIsVisible && <ArrowTop onClick={()=>window.scrollTo(pageXOffset, 0)} className="material-icons">arrow_upward</ArrowTop>}
            <GameListContainer searchString={searchString} sortMethod={sortMethod} platformId={platformId}>
                {pageArr.map((item)=>(<GameLoadBlock key={item} page={item} pageSize={10}/>))}
            </GameListContainer>
        </>
    );
}
