import React, {useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const TopStoriesComponent = () => {

    const {topStories, loading} = useContext(Context)
    
    return (
        <div className="center">
            <h1 className="letter-spacing">Top Stories</h1>
            <hr className="hr"/>
            {loading ? "loading..." : null}
            <div className="d-flex">
                {topStories.map((article, index) => {
                    return (
                        <div className="max-width card shadow rounded" key={index}>
                            <NewsArticle article={article} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopStoriesComponent