import React from "react"

const LiveNewsArticleComponent = ({article}) => {
    const {title, abstract, multimedia} = article
    
    return (
        <>
            <h2>{title}</h2>
            <p>{abstract}</p>
            <img src={multimedia[2].url} />
        </>
    )
    
}

export default LiveNewsArticleComponent