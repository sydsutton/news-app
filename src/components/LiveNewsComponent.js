import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context"
import {Spinner} from "react-bootstrap"
import NewsArticle from "./NewsArticleComponent"

const LiveNewsComponent = () => {

    const {sectionList, API_KEY, setErrorMessage, errorMessage} = useContext(Context)

    const [section, setSection] = useState("world")
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        setNewsData([])
        async function getData(){

            let isMounted = true
            setLoading(true)

            await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if(isMounted){
                        setLoading(false)
                        setNewsData([data.results])
                    } 
                })
                .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
                setLoading(false)
        }
        getData()

        return isMounted = false

    }, [section])

    return (
        <>
            <h1 className="center">Live News Sections</h1>
            <hr className="hr"/>
            <ul className="list-unstyled center subject-container">
                {sectionList.map(section => {
                    return (
                        <button 
                            className="list-item my-shadow"
                            key={section} 
                            onClick={() => setSection(section)}
                        >
                                <li>{section.toUpperCase()}</li>
                        </button>
                    )
                })}
            </ul>
            <p className="mt-5">{loading ? <Spinner animation="border" /> : null}</p>
            <div className="center d-flex">
                {newsData && !errorMessage ? 
                    newsData.map(data => data.map((article, index) => 
                        <div className="max-width card my-shadow rounded-edges" key={index}>
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