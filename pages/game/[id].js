import { useRouter } from "next/dist/client/router";
import Link from "next/link"
import MainLayout from "../../components/MainLayout";
import Router from 'next/router'



export default function game() {
    const router = useRouter();

    return (
        <MainLayout>            
            <h1>Game {router.query.id}</h1>
            <p><Link href="/"><a>назад</a></Link></p>
            <button onClick={() => Router.back()}>Back</button>
        </MainLayout>
    );
}
