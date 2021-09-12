const URL = "https://api.rawg.io/"
const key = "d4298b9b88494180a572db66bedb94f5"

export async function getPlatforms() {
    const response = await fetch(`${URL}api/platforms/lists/parents?key=${key}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
    });
    const body = await response.json();
    return body.results;
}

export async function getGameList(page, pageSize, searchString, platformsCount, ordering) {

    const pageResult = `&page=${page}`
    const pageSizeResult = `&page_size=${pageSize}`
    const searchStringResult = searchString === "" ? "" : `&search=${searchString}`
    const orderingResult = ordering === "" ? "" : `&ordering=${ordering}`
    const platformsCountResult = platformsCount == 0 ? "" : `&parent_platforms=${platformsCount}`
    const conditions = pageResult+pageSizeResult+searchStringResult+orderingResult+platformsCountResult
    const response = await fetch(`${URL}api/games?key=${key+conditions}&search_precise`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
    });
    const body = await response.json();
    return body;
}

export async function getGameBySlug(slug) {

    const response = await fetch(`${URL}api/games/${slug}?key=${key}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
    });
    const body = await response.json();
    return body;
}

export async function getGameScreenshots(slug) {

    const response = await fetch(`${URL}api/games/${slug}/screenshots?key=${key}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
    });
    const body = await response.json();
    return body;
}