import { useRouter } from "next/router";
import Link from "next/link"
import MainLayout from "../../components/MainLayout";
import { getGameBySlug } from "../../api";
import { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import styled from "styled-components";

const Heading = styled.h2`
    padding: 10px;
    margin: 5px 0;
    background-color: #c97900;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Descriprion = styled.div`
    padding: 10px;
    margin: 5px 0;
    background-color: #545454;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    max-width: 100%;
    &:nth-child() {
        max-width:100%;
        word-wrap: break-word;
    }

`
const WebSite = styled.div`
    padding: 10px;
    margin: 5px 0;
    background-color: #545454;
    display: flex;
    flex-direction: column;
    align-items: start;
    &:nth-child() {
        max-width:100%;
    }
`
const BackArrowContainer = styled.div`
    position: fixed;
    top: 1.4rem;
    left: 10px;
    & a{
        font-size: 2rem;
    }
`

export default function Game() {

    const router = useRouter();
    const slug = router.query.id
    //
    console.log(slug)
    const [gameInfoObj, setGameInfoObj] = useState([])

    useEffect(() => {
        getGameBySlug(slug)
        .then((body) => {
            setGameInfoObj(body)

            })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <MainLayout>            
            <Heading>{gameInfoObj.name}</Heading>
            <Slider slug={slug}/>
            <Descriprion dangerouslySetInnerHTML={{__html: gameInfoObj.description}}>
            </Descriprion>
                {gameInfoObj.website && <WebSite>
                    <div>Ссылка на сайт игры: </div>
                    <div><a href={gameInfoObj.website} target="_blank">{gameInfoObj.website}</a></div>
                </WebSite>}

                <BackArrowContainer><Link href="/"><a className="material-icons">arrow_back</a></Link></BackArrowContainer>
        </MainLayout>
    );
}