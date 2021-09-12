import React from "react";
import { getGameScreenshots } from "../api";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    & img {
        max-width: 100%;
        transition: 0.5s linear;
    }
`
const SlideBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 5px;
`
const SlideBarBtn = styled.div`
    background-color: grey;
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    transition: 0.5s linear;
    &:nth-child(${props => true && props.active}){
        background-color: orange;
    }

`
export default function Slider({ slug }) {

    const [gameScreenshotsObj, setGameScreenshotsObj] = useState([]);
    const [activeImg, setActiveImg] = useState(0);
    const [activeImgLink, setActiveImgLink] = useState('');
    const [sliderIsVisible, setSliderIsVisible] = useState(true)

    useEffect(() => {
        getGameScreenshots(slug)
            .then((body) => {
                if ([...body.results].length > 0) {
                    setGameScreenshotsObj(body.results);
                    setActiveImgLink(body.results[activeImg].image)
                } else {
                    setSliderIsVisible(false)
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },[]);

    return (
        <>
            {sliderIsVisible && <SliderContainer>
                <img src={activeImgLink}/> 
                <SlideBar>
                    {gameScreenshotsObj.map((item, index) => (
                        <SlideBarBtn key={index} active={activeImg+1} onClick={()=>(setActiveImg(index), setActiveImgLink(item.image))}></SlideBarBtn>
                    ))}
                </SlideBar>
            </SliderContainer>}
        </>
    );
}
