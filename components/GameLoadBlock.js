import React from "react";
import styled from "styled-components";
import SearchContext from "../context";
import { getGameList } from "../api";
import { useContext, useEffect, useState } from "react";
import GameTile from "./GameTile";

const MyLoadBlock = styled.ul`
    margin: 0 10px;
`;



export default function GameLoadBlock({ page, pageSize, isLoad, changeLoadStatus }) {
    const { searchString } = useContext(SearchContext);
    const { sortMethod } = useContext(SearchContext);
    const { platformId } = useContext(SearchContext);
    const { gamesCount } = useContext(SearchContext);
    const [gameListArr, setGameListArr] = useState([]);

    useEffect(() => {
        changeLoadStatus(true)
        getGameList(page, pageSize, searchString[0], platformId[0], sortMethod[0])
        .then((body) => {
                changeLoadStatus(false)
                setGameListArr([...body.results]);
                gamesCount[1](body.count)
            })
        .catch((err) => {
            console.error(err);
        });
    }, [searchString[0], platformId[0], sortMethod[0]]);

    return (
        <>
            <MyLoadBlock>
                {gameListArr.map((item) => (
                    <GameTile key={item.id} gameInfoObj={item} />
                ))}
            </MyLoadBlock>
        </>
    );
}
