import React from "react";
import Link from "next/link";
import styled from "styled-components";
import dayjs from "dayjs";

const MyTile = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.21);
    -moz-box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.21);
    box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.21);
`;
const TileInfoContainer = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    & h2 {
        font-size: 1rem;
    }
    & ul {
        list-style-type: none;
    }
    & li {
        margin: 3px 0
    }
    & li:first-child {
        margin-top: 0; 
    }
    & li:last-child {
        margin-bottom: 0; 
    }
`;
const NoImage = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit;

`
const PosterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: grey;
    height: 4rem;
    width: 4rem;
    min-width: 4rem;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.47);
    -moz-box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.47);
    box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.47);
    & img {
        height: 4rem;
        width: 4rem;
        object-fit: cover;
        border-radius: 5px;
    }
    & a {
        height: inherit;
    }
`;

export default function GameTile({ gameInfoObj }) {
    return (
        <MyTile>
            <PosterContainer>
                <Link href={"/game/" + gameInfoObj.slug}>
                    <a>
                        { gameInfoObj.background_image ? 
                        <img src={gameInfoObj.background_image} alt={`Poster: ${gameInfoObj.name}`}/> : 
                        <NoImage className="material-icons">image_not_supported</NoImage>
                        }
                    </a>
                </Link>
            </PosterContainer>
            <TileInfoContainer>
                <ul>
                    <li><h2><Link href={"/game/" + gameInfoObj.slug}><a>{gameInfoObj.name}</a></Link></h2></li>
                    <li>Рейтинг: {gameInfoObj.rating ? gameInfoObj.rating : "не указан"}</li>
                    <li>Дата релиза: {gameInfoObj.released ? dayjs(gameInfoObj.released).format("DD.MM.YYYY")  : "не указана"}</li>
                </ul>
            </TileInfoContainer>
        </MyTile>
    );
}
