import MainLayout from "../components/MainLayout";
import GameList from "../components/GameList";

import { useState } from "react";

export default function Index() {
    const [searchStringValue, setSearchStringValue] = useState("");
    return (
        <MainLayout>
                <GameList />
        </MainLayout>
    );
}
