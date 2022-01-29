import React, {useEffect, useContext, useState} from "react"
import {Context} from "../Context"
import NewsArticle from "./NewsArticleComponent"
import {useNavigate} from "react-router-dom"

const SavedArticlesComponent = () => {

    const {savedArticlesArray, currentUser, isLoggedIn, setIsLoggedIn, signOut} = useContext(Context)
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div className="page-width center">
            {currentUser && isLoggedIn ? 
                <div className="mb-5">
                    <h2 className="letter-spacing">{currentUser.displayName ? `${currentUser.displayName}'s ` : null }Account</h2>
                    <hr className="hr"/>
                    <div className="bg-light mx-auto rounded-edges account d-flex flex-column my-shadow p-3 small">
                        <p>Display name: <strong>{currentUser.displayName}</strong></p>
                        <p>Email: <strong>{currentUser.email}</strong></p>
                        <p>Account created: <strong>{currentUser.metadata.creationTime}</strong></p>
                        <hr className="hr" />
                        <input 
                            className="mx-auto mb-4 w-50 border small"
                            type="text" 
                            placeholder="New display name"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <button 
                        className="save-btn mb-4"
                            onClick={() => {

                                navigate("/saved")
                                currentUser.updateProfile({displayName: username})
                            }}
                        >
                            Update display name
                        </button>
                        <button 
                            className="search-button mx-auto px-4" 
                            style={{maxWidth: "200px"}} 
                            onClick={() => {
                                signOut()
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