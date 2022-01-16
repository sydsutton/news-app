import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const LiveNewsComponent = () => {
    const {sectionList, API_KEY, loading, setLoading} = useContext(Context)

    const [section, setSection] = useState("world")
    const [newsData, setNewsData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

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
                        setNewsData([data.results])
                    } 
                })
                .catch(error => console.log(error))
                setLoading(false)
        }
        getData()

        return isMounted = false

    }, [section])

    return (
        <>
            <h1 className="center">Live News Sections</h1>
            <ul className="list-unstyled center subject-container">
                {sectionList.map(section => {
                    return (
                        <button 
                            className="list-item shadow"
                            key={section} 
                            onClick={() => setSection(section)}
                        >
                                <li>{section.toUpperCase()}</li>
                        </button>
                    )
                })}
            </ul>
            <p>{loading ? "Loading" : null}</p>
            <div className="center d-flex">
                {newsData && !errorMessage ? 
                    newsData.map(data => data.map((article, index) => 
                        <div className="max-width card shadow rounded" key={index}>
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

// abstract: ""
// byline: "BY MEGAN SPECIA"
// created_date: "2022-01-14T12:42:02-05:00"
// des_facet: null
// first_published_date: "2022-01-14T12:42:02-05:00"
// geo_facet: null
// item_type: "Article"
// kicker: ""
// material_type_facet: "Live Blog Post"
// x multimedia: (4) [{…}, {…}, {…}, {…}]
// org_facet: null
// per_facet: null
// published_date: "2022-01-14T12:42:02-05:00"
// related_urls: null
// section: "World"
// slug_name: "14virus-briefing-europe-version"
// source: "New York Times"
// subheadline: ""
// subsection: ""
// thumbnail_standard: "https://static01.nyt.com/images/2022/01/14/multimedia/14virus-briefing-europe/14virus-briefing-europe-thumbStandard.jpg"
// title: "Omicron prompts changes in European pandemic policies that some public health experts say are risky."
// updated_date: "2022-01-14T12:42:02-05:00"
// uri: "nyt://article/0a332960-d791-542b-b3c9-837881f320f0"
// url: "https://www.nytimes.com/live/2022/01/14/world/omicron-covid-vaccine-tests/omic