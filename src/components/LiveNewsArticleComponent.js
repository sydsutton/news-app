import React from "react"

import { Link } from "react-router-dom"

const LiveNewsArticleComponent = ({article}) => {
    const {title, abstract, multimedia} = article
    
    // I used a ternary at the beginning of the return because I only wanted to show
    // articles that have pictures associated with them
    return (
        <>
        {multimedia && multimedia.length > 3 && title ? 
                <>
                    <Link to="">
                        <img src={multimedia[2].url} alt={multimedia.caption} />
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

export default LiveNewsArticleComponent