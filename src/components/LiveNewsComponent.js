import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context"
import LiveNewsArticle from "./LiveNewsArticleComponent"

const LiveNewsComponent = () => {
    const {sectionList, API_KEY} = useContext(Context)

    const [section, setSection] = useState("")
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleClick = async() => {
        setIsLoading(true)
        try {
            await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => setNewsData([data.results]))
                // console.log(newsData)
                setIsLoading(false)
        } catch {
            // setErrorMessage("Sorry, something has gone wrong")
            setIsLoading(false)
        }
    }

    return (
        <>
            <h1>Live News Sections</h1>
            <p>{isLoading ? "Loading" : null}</p>
            <ul className="list-unstyled">
                {sectionList.map(section => {
                    return (
                        <button 
                            key={section} 
                            onClick={() => {
                                setSection(section)
                                handleClick()
                            }}
                        >
                                <li>{section.toUpperCase()}</li>
                        </button>
                    )
                })}
            </ul>
            {newsData && !errorMessage ? 
                newsData.map(data => data.map((article, index) => <LiveNewsArticle article={article} key={index} />)) 
            : 
            errorMessage ? 
                <h3>{errorMessage}</h3>
            :
            null
            }
        </>
    )
}

export default LiveNewsComponent