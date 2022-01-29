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

    console.log(currentUser)
    return (
        <div className="page-width center">
            {currentUser && isLoggedIn ? 
                <div className="mb-5">
                    <h2 className="letter-spacing">Account</h2>
                    <hr className="hr"/>
                    <div className="bg-light mx-auto rounded-edges account d-flex flex-column my-shadow">
                        <p>Email: {currentUser.email}</p>
                        <p>Account created: {currentUser.metadata.creationTime}</p>
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
                </div>
            :
            null
            }
            <h2 className="letter-spacing">Saved Articles</h2>
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