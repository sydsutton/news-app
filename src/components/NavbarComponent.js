import React, {useState, useContext} from "react"
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.
    const {API_KEY, setSearchQuery, setSearchData, setErrorMessage, loading, setLoading} = useContext(Context)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        setSearchQuery(tempSearch)
        setLoading(true)
        setSearchData([])
        async function getSearchData() {
            try {
                await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${tempSearch}&api-key=${API_KEY}`)
                        .then(res => res.json())
                        .then(data => {
                            setSearchData(data.response.docs)
                        })
                        .catch(error => setErrorMessage(error))
                        // setSearchData([])
                        setLoading(false)
                } catch {
                    console.log("error")
                }
            setLoading(false)
        }

        getSearchData()
    }

    const handleToggle = () => {
        console.log("toggled")
        // document.getElementsByClassName('nav-list-item').display = "block"
    }

    return (
        <nav>
            <ul className="list-unstyled">
                <div className="flex-row">
                    <li className="nav-list-item"><Link className="text-decoration-none bold" to="/">Top Stories</Link></li>
                    <li className="nav-list-item"><Link className="text-decoration-none bold" to="/most-popular">Most Popular</Link></li>
                    <li className="nav-list-item"><Link className="text-decoration-none bold" to="/live-news">Real-Time News</Link></li>
                    <li className="toggle-collapse" onClick={() => handleToggle()}>X</li>
                    <li>
                        <input type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                        <button 
                            type="submit" 
                            onClick={e => {
                                navigate("search") 
                                handleClick(e) 
                            }}
                            >
                            Search
                        </button>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default NavbarComponent