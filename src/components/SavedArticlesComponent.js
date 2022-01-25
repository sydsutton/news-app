import React, {useEffect, useContext} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"
import {useNavigate} from "react-router-dom"

const SavedArticlesComponent = () => {

    const {savedArticlesArray, currentUser, isLoggedIn, setIsLoggedIn} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div>
            {currentUser && isLoggedIn ? 
                <div className="mb-5">
                    <h1>Account</h1>
                    <hr className="hr"/>
                    <div className="text-align-left">
                        <p>Email: {currentUser.email}</p>
                        <p>Account created: {currentUser.metadata.creationTime}</p>
                    </div>
                    <button 
                        className="save-btn" 
                        style={{maxWidth: "200px"}} 
                        onClick={() => {
                            setIsLoggedIn(false)
                            navigate("/")
                        }}
                    >
                        Log Out
                    </button>
                </div>
            :
            null
            }
            <h1>Saved Articles</h1>
            <hr className="hr"/>
            {savedArticlesArray.length > 0 && isLoggedIn ? 
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