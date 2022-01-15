import React from "react"
import { Link } from "react-router-dom"

const NewsArticleComponent = ({article}) => {

    const {title, abstract, multimedia, media, headline, byline} = article

    // I used a ternary at the beginning of the return because I only wanted to show
    // articles that have pictures associated with them

    // console.log(article)
    return (
        <>
            <Link to="">
                <h2>{title ? title : headline ? headline.main : null}</h2>
                {
                media ? 
                    <img src={media[0]["media-metadata"][2].url} /> : 
                !multimedia ? 
                    <img src="https://nytimesineducation.com/wp-content/themes/nyt-project-x/images/placeholder.jpg" className="image" /> :
                multimedia.length === 1 ? 
                    <img src={multimedia[0].url} className="image" /> :
                multimedia.length < 70 ? 
                    <img src={multimedia[2].url} /> :
                multimedia.length > 20 ? 
                    <img src={`https://static01.nyt.com/${multimedia[5].url}`}/>  :
                multimedia ?
                    <img src={multimedia[0].url} className="image" /> :
                    null
                } 
                <p>{abstract}</p>
                <p>{byline && byline.original !== "" ? byline.original : byline !== "" ? byline : "By: Unknown"}</p>
            </Link>
        </>
    )
    
}

export default NewsArticleComponent