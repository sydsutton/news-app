import React, {useContext, useEffect} from "react"
import {Context} from "../Context"
import {Spinner} from "react-bootstrap"
import NewsArticle from "./NewsArticleComponent"

const SearchComponent = () => {

    const {searchData, searchQuery, loading, errorMessage} = useContext(Context)

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div className="page-width center">
            <h2 className="letter-spacing">Search {searchQuery ? `RESULTS FOR ${searchQuery.toUpperCase()}` : null }</h2>
            <hr className="hr"/>

            <div className="mt-5">{loading ? <Spinner animation="border" /> : null}</div>

            <div className="d-flex">
                {searchData.length !== 0 ? searchData.map((article, index) => {
                    return (
                        <div key={index} className="max-width card my-shadow rounded-edges">
                            <NewsArticle article={article} />
                        </div>
                    )
                })
                :
                <p>{errorMessage}</p>
            }
            </div>
        </div>
    )
}

export default SearchComponent