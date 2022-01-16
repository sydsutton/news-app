import React from "react"
import { Link } from "react-router-dom"

const NewsArticleComponent = ({article}) => {

    const {title, abstract, multimedia, media, headline, byline, updated, created_date, pub_date} = article

    return (
        <>
            <Link to="" className="text-decoration-none flex-col">
                <h2 className="letter-spacing">{title ? title : headline ? headline.main : null}</h2>
                <p className="small">{pub_date ? `Published on ${pub_date.slice(0, 10)}` : updated ? `Updated on ${updated.slice(0, 10)} ` : created_date ? `Created on ${created_date.slice(0, 10)}` :  null}</p>
                {
                media ? 
                    <img src={media[0]["media-metadata"][2].url} className="image rounded shadow" /> : 
                !multimedia ? 
                    <img src="https://nytimesineducation.com/wp-content/themes/nyt-project-x/images/placeholder.jpg" className="image rounded shadow" /> :
                multimedia.length === 1 ? 
                    <img src={multimedia[0].url} className="image rounded shadow" /> :
                multimedia.length < 70 ? 
                    <img src={multimedia[2].url} className="image rounded shadow" /> :
                multimedia.length > 20 ? 
                    <img src={`https://static01.nyt.com/${multimedia[5].url}`} className="image rounded shadow" />  :
                multimedia ?
                    <img src={multimedia[0].url} className="image rounded shadow" /> :
                    null
                } 
                <p className="bold line-height">{abstract}</p>
                <p className="small lower-case float-right">{byline.original ? byline.original : byline.original === null ? "By Uknown" : byline && !byline.original ? byline : null}</p>
            </Link>
        </>
    )
    
}

export default NewsArticleComponent