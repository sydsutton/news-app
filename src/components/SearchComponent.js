import React, {useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const SearchComponent = () => {

    const {searchData, searchQuery} = useContext(Context)

    return (
        <div>
            <h2>Search {searchQuery ? `results for ${searchQuery}` : null }</h2>
            {searchData.length !== 0 ? searchData[0].map((article, index) => {
                return (
                    <div key={index}>
                        <NewsArticle article={article} />
                        <p>{article.headline.main}</p>
                    </div>
                )
            })
        :
        null
        }
        </div>
    )
}

export default SearchComponent