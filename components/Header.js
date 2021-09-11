import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPlatforms } from "../api";

const MyHeader = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: grey;
`;
const MyInput = styled.input`
    padding: 20px;
    border: none;
    height: 2.5rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    width: 100%;
    color: #3b3b3b;
    &::placeholder {
        text-align: center;
        color: #e3e3e3;
    }
`;
const MySelectContainer = styled.div`
    background-color: white;
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    height: 2.5rem;
    border-radius: 1rem;
`;
const MySelect = styled.select`
    border: none;
    height: 2.5rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    width: 100%;
    background-color: white;
    color: #3b3b3b;
`;
const MyLogo = styled.h1`
    display: flex;
    justify-content: center;
    margin: 10px;
    font-family: "Do Hyeon";
    font-size: 2rem;
    font-weight: 100;
    text-shadow: #3b3b3b 0 0 10px;
`;
const MySearchContainer = styled.div`
    padding: 10px;
    padding-top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
const MyBtn = styled.button`
    background-color: #bdbdbd;
    border: none;
    min-width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    border-radius: 1rem;
    margin-left: 10px;
    color: #3b3b3b;
`;
const MyAdvSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function Header({changeSearchString, changeSortMethod, changePlatformId}) {

    const [isShowAdvSearch, setIsShowAdvSearch] = useState(false);
    const [isReversSort, setIsReversSort] = useState(false);
    const [sortTheme, setSortTheme] = useState("rating");
    const [platformsList, setPlatformsList] = useState([]);

    useEffect(()=>{
        changeSortMethod((!isReversSort ? "-" : "") + sortTheme), [isReversSort, sortTheme]
    })

    useEffect(() => {
        getPlatforms()
            .then((body) => {
                setPlatformsList([...body]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [isShowAdvSearch]);

    
    const hideAdvSearch = () => {
        setIsShowAdvSearch(false);
    };
    const showAdvSearch = () => {
        setIsShowAdvSearch(true);
    };

    return (
        <MyHeader>
            <MyLogo>GameDigest</MyLogo>
            <MySearchContainer>
                <MyInput
                    onChange={(event) => changeSearchString(event.target.value)}
                    placeholder="Поиск"
                />
                <MyBtn
                    className="material-icons"
                    onClick={() => (isShowAdvSearch ? hideAdvSearch() : showAdvSearch())
                    }
                >
                    tune
                </MyBtn>
            </MySearchContainer>
            {isShowAdvSearch && (
                <MyAdvSearchContainer>
                    <MySearchContainer>
                        <MySelectContainer>
                            <MySelect
                                onChange={(event) => (
                                        setSortTheme(event.target.value)
                                        )}
                                        >
                                <option value="rating">По рейтингу</option>
                                <option value="name">По названию</option>
                                <option value="released">По дате релиза</option>
                            </MySelect>
                        </MySelectContainer>
                        <MyBtn onClick={()=>(setIsReversSort(!isReversSort))} className="material-icons"> {!isReversSort ? "keyboard_double_arrow_down" : "keyboard_double_arrow_up"}</MyBtn>
                    </MySearchContainer>
                    <MySearchContainer>
                        <MySelectContainer>
                            <MySelect
                                onChange={() => (
                                    changePlatformId(event.target.value)
                                )}
                            >
                                <option value="0">Все игровые платформы</option>
                                {platformsList.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </MySelect>
                        </MySelectContainer>
                    </MySearchContainer>
                </MyAdvSearchContainer>
            )}
        </MyHeader>
    );
}
