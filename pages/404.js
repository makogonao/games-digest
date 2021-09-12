import React from 'react'
import MainLayout from "../components/MainLayout";
import styled from 'styled-components';
import Link from "next/link"

const LinkContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`

const ErrorMessage = styled.h2`
    display: flex;
    margin-top: 10%;
    align-items: center;
    justify-content: center;
`

export default function Error() {

    return (
        <MainLayout>
            <ErrorMessage>Страница не найдена</ErrorMessage>
            <LinkContainer>
                <Link href="/" ><a>Перейти на главную</a></Link>
            </LinkContainer>

        </MainLayout>
    )
}
