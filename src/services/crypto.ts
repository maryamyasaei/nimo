export const getMarketData = async ({ page, rowsPerPage }: { page: number, rowsPerPage: number }) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&x-cg-demo-api-key=${import.meta.env.VITE_API_KEY}`)
    return res.json()
}

export const getCoinDetail = async ({ id }: { id?: string }) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/${id}`);
    return res.json()
}