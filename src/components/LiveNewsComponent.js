import React, {useContext, useState, useEffect} from "react"
import {Context} from "../Context"

const LiveNewsComponent = () => {
    const {sectionList, API_KEY} = useContext(Context)

    const [section, setSection] = useState("")
    const [newsData, setNewsData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getSectionData = async() => {
            setIsLoading(true)
            try {
                await fetch(`https://api.nytimes.com/svc/news/v3/content/nyt/${section}.json?api-key=${API_KEY}`)
                    .then(res => res.json())
                    .then(data => setNewsData([data.results]))
                    setIsLoading(false)
            } catch(error) {
                // console.log(error)
                setIsLoading(false)
            }
        }
        getSectionData()
    },[section])

    return (
        <>
            <h1>Live News Sections</h1>
            <p>{isLoading ? "Loading" : null}</p>
            <ul className="list-unstyled">
                {sectionList.map(section => {
                    return (
                        <button 
                            key={section} 
                            onClick={() => setSection(section)}
                        >
                                <li>{section}</li>
                        </button>
                    )
                })}
            </ul>
            {newsData ? newsData.map(article => console.log(article)) : null}
        </>
    )
}

export default LiveNewsComponent