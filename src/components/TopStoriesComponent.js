import React, {useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const TopStoriesComponent = () => {

    const {topStories} = useContext(Context)
    
    return (
        <div className="center">
            <h1>Top Stories</h1>
            <div className="d-flex">
                {topStories.map((article, index) => {
                    return (
                        <div className="max-width card shadow" key={index}>
                            <NewsArticle article={article} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopStoriesComponent