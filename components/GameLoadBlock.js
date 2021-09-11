import React from "react";
import styled from "styled-components";
import { keyframes } from 'styled-components'
import SearchContext from "../context";
import { getGameList } from "../api";
import { useContext, useEffect, useState } from "react";
import GameTile from "./GameTile";

const MyLoadBlock = styled.ul`
    margin: 0 10px;
`;

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
    border: 5px solid #5e5e5e;
    border-top: 5px solid #3b3b3b;
    width: 20px;
    height: 20px;
    content: "";
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
}
`


export default function GameLoadBlock({ page, pageSize }) {
    const { searchString } = useContext(SearchContext);
    const { sortMethod } = useContext(SearchContext);
    const { platformId } = useContext(SearchContext);
    const { gamesCount } = useContext(SearchContext);
    const [gameListArr, setGameListArr] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true)
        getGameList(page, pageSize, searchString[0], platformId[0], sortMethod[0])
        .then((body) => {
                setIsLoad(false)
                setGameListArr([...body.results]);
                gamesCount[1](body.count)
            })
        .catch((err) => {
            console.error(err);
        });
    }, [searchString, platformId, sortMethod]);

    return (
        <>
            {isLoad ? <Spinner></Spinner> :  <MyLoadBlock>
                {gameListArr.map((item) => (
                    <GameTile key={item.id} gameInfoObj={item} />
                ))}
            </MyLoadBlock>}
        </>
    );
}
