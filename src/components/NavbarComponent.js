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

    return (
        <div>
            <ul className="list-unstyled d-flex justify-content-around">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/top-stories">Top Stories</Link></li>
                <li><Link to="/most-popular">Most Popular</Link></li>
                <li><Link to="/live-news">Real-Time News</Link></li>
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
        </div>
    )
}

export default NavbarComponent