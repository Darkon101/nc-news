const baseUrl = `https://nc-news-ldgq.onrender.com/api`

const fetchArticles = async () => {
    try {
        const response = await fetch(`${baseUrl}/articles`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const json = await response.json()
        console.log(json)
        return json
    } catch (error) {
        console.log(error.message, '<<fetchArticles')
        throw error
    }
}

export default fetchArticles