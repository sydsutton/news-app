import React, {useState, useContext} from "react"
import logo from "../images/logo.png"
import {
    Navbar,
    Container
} from "react-bootstrap"

import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.
    const {API_KEY, setSearchQuery, setSearchData, setErrorMessage, loading, setLoading, handleToggle} = useContext(Context)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        setSearchQuery(tempSearch)
        setLoading(true)
        setSearchData([])
        async function getSearchData() {
            try {
                await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${tempSearch}&api-key=${API_KEY}`)
                        .then(res => {
                            if (res.status >= 200 && res.status <= 299) {
                                return res.json();
                              } else {
                                throw Error(res.statusText);
                        }})
                        .then(data => {
                            setSearchData(data.response.docs)
                        })
                        .catch(error => setErrorMessage(error))
                        // setSearchData([])
                        setLoading(false)
                } catch {
                    setSearchData([])
                }
            setLoading(false)
        }

        getSearchData()
    }

    return (
        <nav className="shadow">
            <Navbar>
                <Container>
                    <ul className="list-unstyled">
                        <div className="flex-row">
                            <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
                            <li>
                                <input className="shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                                <button 
                                    className="search-button bold"
                                    type="submit" 
                                    onClick={e => {
                                        navigate("search") 
                                        handleClick(e) 
                                    }}
                                    >
                                    Search
                                </button>
                            </li>
                            <li><Link className="text-decoration-none bold nav-list-item" to="/">Top Stories</Link></li>
                            <li><Link className="text-decoration-none bold nav-list-item" to="/most-popular">Most Popular</Link></li>
                            <li><Link className="text-decoration-none bold nav-list-item" to="/live-news">Real-Time News</Link></li>
                            <li className="toggle-collapse" onClick={() => handleToggle()}>X</li>
                        </div>
                    </ul>
                </Container>
            </Navbar>
        </nav>
    )
}

export default NavbarComponent