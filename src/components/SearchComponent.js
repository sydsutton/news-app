import React from "react"
import NewsArticle from "./NewsArticleComponent"

const SearchComponent = ({searchData}) => {

    return (
        <div>
            <h2>Search</h2>
            {/* {searchData.map(article => {
                return (
                    <div>
                        <NewsArticle article={article} />
                        <p>hello</p>
                    </div>
                )
            })} */}
        </div>
    )
}

export default SearchComponent