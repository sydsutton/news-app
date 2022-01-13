import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const LiveNewsComponent = () => {
    const {sectionList, API_KEY} = useContext(Context)

    const [section, setSection] = useState("world")
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        let isMounted = true

        async function getData(){

            let isMounted = true
            setIsLoading(true)

            await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    if(isMounted){
                        setNewsData([data.results])
                    } 
                })
                .catch(error => console.log(error))
                setIsLoading(false)
        }
        getData()

        return isMounted = false

    }, [section])

    return (
        <>
            <h1 className="center">Live News Sections</h1>
            <p>{isLoading ? "Loading" : null}</p>
            <ul className="list-unstyled center">
                {sectionList.map(section => {
                    return (
                        <button 
                            key={section} 
                            onClick={() => setSection(section)}
                        >
                                <li>{section.toUpperCase()}</li>
                        </button>
                    )
                })}
            </ul>
            <div className="center d-flex">
                {newsData && !errorMessage ? 
                    newsData.map(data => data.map((article, index) => 
                        <div className="max-width" key={index}>
                            <NewsArticle article={article} />
                        </div>
                    )) 
                : 
                errorMessage ? 
                    <h3>{errorMessage}</h3>
                :
                null
                }
            </div>
        </>
    )
}

export default LiveNewsComponent