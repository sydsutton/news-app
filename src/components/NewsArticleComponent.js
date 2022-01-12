import React from "react"
import { Link } from "react-router-dom"

const NewsArticleComponent = ({article}) => {

    const {title, abstract, multimedia} = article
    
    // I used a ternary at the beginning of the return because I only wanted to show
    // articles that have pictures associated with them
    return (
        <>
        { title && !multimedia ? 
            <>
                <Link to="">
                    <h2>{title}</h2>
                    <p>{abstract}</p>
                </Link>
            </>
        :
        multimedia && multimedia.length > 3 && title ? 
                <>
                    <Link to="">
                        <img src={multimedia[2].url} alt={multimedia.caption} />
                        <h2>{title}</h2>
                        <p>{abstract}</p>
                    </Link>
                </>
            :
            multimedia.length < 2 ? 
                <>
                    <Link to="">
                        <img className="image"src={multimedia[0].url} alt={multimedia.caption} />
                        <h2>{title}</h2>
                        <p>{abstract}</p>
                    </Link>
                </>
            :
        null
        }    
        </>
    )
    
}

export default NewsArticleComponent