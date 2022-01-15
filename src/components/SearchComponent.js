import React, {useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const SearchComponent = () => {

    const {searchData, searchQuery, loading} = useContext(Context)

    return (
        <>
            <h2>Search {searchQuery ? `results for ${searchQuery.toUpperCase()}` : null }</h2>
            {loading ? "loading..." : null}
            <div className="d-flex">
                {searchData ? searchData.map((article, index) => {
                    // console.log(index)
                    return (
                        <div key={index} className="max-width">
                            <NewsArticle article={article} />
                        </div>
                    )
                })
                :
                null
            }
            </div>
        </>
    )
}

export default SearchComponent