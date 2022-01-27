import React, {useState, useContext} from "react"
import {AiOutlinePlus, AiOutlineMinus, AiOutlineLogin} from "react-icons/ai"

import {Context} from "../Context"

const NewsArticleComponent = ({article}) => {

    const {title, abstract, multimedia, media, headline, byline, updated, created_date, pub_date, url, web_url} = article
    const {saveArticle, removeArticle, savedArticlesArray, isLoggedIn, setModalOpen} = useContext(Context)

    const buttonClass = "saved d-flex align-items-center justify-content-evenly"

    return (
        <>
            <div onClick={() => window.open(url ? url : web_url, "New York Times", + "height=500px," + "width=300px," + "modal=yes," + "top=200")} className="card-div">
                {/* <div className="overlay rounded-edges" style={visible ? {display: "block"} : {display: "none"}}>
                    <div className="overlay-text">
                        <h4>Go to link</h4>
                        <button onClick={() => window.open(url ? url : web_url)} className="overlay-link my-shadow">{url ? url : web_url}</button>
                    </div>
                </div> */}
                <div className="my-flex-column">
                    <h3 className="letter-spacing">{title ? title : headline ? headline.main : null}</h3>
                    <p className="small lower-case float-right byline">{byline.original ? byline.original : byline.original === null ? "By Uknown" : byline && !byline.original ? byline : null}</p>
                    {
                    media ? 
                        <img src={media[0]["media-metadata"][2].url} className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> : 
                    !multimedia ? 
                        <img src="https://nytimesineducation.com/wp-content/themes/nyt-project-x/images/placeholder.jpg" className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> :
                    multimedia.length === 0 ? 
                    <img src="https://nytimesineducation.com/wp-content/themes/nyt-project-x/images/placeholder.jpg" className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> :
                    multimedia.length === 1 ? 
                        <img src={multimedia[0].url} className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> :
                    multimedia.length < 50 ? 
                        <img src={multimedia[2].url} className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> :
                    multimedia.length > 50 && multimedia[5].url ? 
                        <img src={`https://static01.nyt.com/${multimedia[5].url}`} className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} />  :
                    multimedia ?
                        <img src={multimedia[0].url} className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} /> :
                        <img src="https://nytimesineducation.com/wp-content/themes/nyt-project-x/images/placeholder.jpg" className="image rounded-edges my-shadow" alt={title ? title : headline ? headline.main : null} />
                    } 
                    <p className="line-height small">{abstract}</p>
                    <p className="small date">{pub_date ? `Published on ${pub_date.slice(0, 10)}` : updated ? `Updated on ${updated.slice(0, 10)} ` : created_date ? `Created on ${created_date.slice(0, 10)}` :  null}</p>
                </div>
            </div>
            {isLoggedIn && !savedArticlesArray.includes(article) ? 
                <button 
                    className={buttonClass}
                    onClick={() => saveArticle(article)}
                >
                        <AiOutlinePlus size={15} className="pr-3" /> Save Article
                </button> 
                :
            !isLoggedIn ?
                <button 
                    className={`${buttonClass} article-login`}
                    onClick={() => setModalOpen(true)}
                >
                    <AiOutlineLogin size={15} className="pr-3" /> Login to save
                </button>
                :
                <button 
                    className={`${buttonClass} outline`}
                    onClick={() => removeArticle(article)}>
                        <AiOutlineMinus size={15} className="pr-3" />Unsave Article
                </button> 
            }
        </>
    )
    
}

export default NewsArticleComponent