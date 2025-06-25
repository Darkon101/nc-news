import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import fetchArticles from "../../utils/api"

const Body = () => {

    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState

    useEffect(()=>{
        fetchArticles().then((result)=>{
            const {articles} = result
            console.log(result)
            setArticles(articles)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
            setError(true)
        })
    }, [])

    return (
        <>
            <ArticleCard />
        </>
    )
}

export default Body