import React, {useState, useContext} from "react"
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.
    const {API_KEY, setSearchQuery, setSearchData} = useContext(Context)
    const navigate = useNavigate()

    const handleClick = (e) => {

        e.preventDefault()
        setSearchQuery(tempSearch)

        async function getSearchData() {
            try {
                await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${tempSearch}&api-key=${API_KEY}`)
                     .then(res => res.json())
                     .then(data => {
                         setSearchData([data.response.docs])
                     })
             } catch {
                 console.log("error")
             }
        }

        getSearchData()
    }

    const handleToggle = () => {
        console.log("toggled")
        // document.getElementsByClassName('nav-list-item').display = "block"
    }

    return (
        <nav>
            <ul className="list-unstyled d-flex justify-content-around">
                <div className="d-flex justify-content-between">
                    <li className="nav-list-item"><Link to="/">Home</Link></li>
                    <li className="nav-list-item"><Link to="/top-stories">Top Stories</Link></li>
                    <li className="nav-list-item"><Link to="/most-popular">Most Popular</Link></li>
                    <li className="nav-list-item"><Link to="/live-news">Real-Time News</Link></li>
                    <li className="toggle-collapse" onClick={() => handleToggle()}>X</li>
                </div>
                <li>
                    <input type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                    <button 
                        type="submit" 
                        onClick={e => {
                            navigate("search")
                            handleClick(e)}}>
                        Search
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarComponent