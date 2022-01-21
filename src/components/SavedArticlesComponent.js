import React, {useState, useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"

const SavedArticlesComponent = () => {

    const {savedArticlesArray} = useContext(Context)
    return (
        <div>
            <h1>Saved Articles</h1>
            <hr className="hr"/>
            {savedArticlesArray.length > 0 ? 
                <div className="center d-flex">
                    {savedArticlesArray.map((article, index) => {
                        return (
                            <div className="max-width card my-shadow rounded-edges" key={index}>
                                <NewsArticle article={article} />
                            </div>  
                        )
                    })}
                </div>
            :
            <p className="mt-4">You don't have any saved articles yet</p>
            }
        </div>
    )
}

export default SavedArticlesComponent