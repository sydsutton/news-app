import React from "react"

const MainComponent = () => {

    const API_KEY = process.env.REACT_APP_API_KEY

    const handleClick = async() => {
        await fetch(`https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${API_KEY}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default MainComponent