import React, {useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const SearchComponent = () => {

    const {searchData, searchQuery, loading} = useContext(Context)

    return (
        <>
            <h2 className="letter-spacing">SEARCH {searchQuery ? `RESULTS FOR ${searchQuery.toUpperCase()}` : null }</h2>
            {loading ? "loading..." : null}
            <div className="d-flex">
                {searchData ? searchData.map((article, index) => {
                    return (
                        <div key={index} className="max-width card shadow rounded">
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