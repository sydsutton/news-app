import React, {useEffect, useState, useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const MostPopularComponent = () => {
    const {API_KEY} = useContext(Context)

    const [type, setType] = useState("shared")
    const [period, setPeriod] = useState(1)
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        let isMounted = true
        try {
            fetch(`https://api.nytimes.com/svc/mostpopular/v2/${type}/${period}.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.results)
                    if(isMounted){
                        setNewsData(data.results)
                    }
                })
        } catch {
            console.log("error")
        }

        return () => {isMounted = false}
    }, [type, period])

    return (
        <>
            <h1>Most Popular</h1>
            <select onChange={e => setType(e.target.value)}>
                <option value="shared">The most shared articles</option>
                <option value="emailed">The most emailed articles</option>
                <option value="viewed">The most viewed articles</option>
            </select>
            <select onChange={e => setPeriod(e.target.value)}>
                <option value={1}>In the last day</option>
                <option value={7}>In the last week</option>
                <option value={30}>In the last month</option>
            </select>
            <div>
                {newsData.map((article, index) => {
                    return (
                        <NewsArticle article={article} key={index} />
                    )
                })}
            </div>
        </>
    )
}

export default MostPopularComponent