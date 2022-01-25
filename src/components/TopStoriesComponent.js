import React, {useContext, useEffect} from "react"
import {Spinner} from "react-bootstrap"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const TopStoriesComponent = () => {

    const {topStories, loading} = useContext(Context)

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    
    return (
        <div className="center page-width">
            <h2 className="letter-spacing">Top Stories</h2>
            <hr className="hr"/>
            <div className="mt-5">{loading ? <Spinner animation="border" /> : null}</div>
            <div className="d-flex">

                {topStories.map((article, index) => {
                    return (
                        <div className="max-width card my-shadow rounded-edges" key={index}>
                            <NewsArticle article={article} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopStoriesComponent