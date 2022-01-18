import React, {useState, useContext} from "react"
import logo from "../images/logo.png"
import { Navbar, Nav } from 'react-bootstrap'
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    const [navOpen, setNavOpen] = useState(false)
    const [topStoriesActive, setTopStoriesActive] = useState(false)
    const [mostPopularActive, setMostPopularActive] = useState(false)
    const [liveNewsActive, setLiveNewsActive] = useState(false)

    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.
    const API_KEY = process.env.REACT_APP_API_KEY
    const {setSearchQuery, setSearchData, setErrorMessage, setLoading} = useContext(Context)
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
        <Navbar className="nav-bg mb-4 my-shadow" fixed="top" expand="lg" sticky="top">
            {/* <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand> */}
            <div className="float-right custom-width">
                <form className="text-right">
                    <input className="my-shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                    <button 
                        className="search-button"
                        type="submit" 
                        onClick={e => {
                            navigate("search") 
                            handleClick(e) 
                            setTopStoriesActive(false)
                            setMostPopularActive(false)
                            setLiveNewsActive(false)
                        }}
                        >
                        Search
                    </button>
                </form>
            </div>
            <Navbar.Toggle className="toggle-icon" onClick={() => setNavOpen(!navOpen)}/>
            <Navbar.Collapse isOpen={navOpen} className="nav-bg">
                <Nav className="nav-collapse">
                    <Link 
                        to="/"
                    >
                        <div
                            className={topStoriesActive ? "active nav-list-item" : "nav-list-item"}
                            onClick={() => {
                                setTopStoriesActive(true)
                                setMostPopularActive(false)
                                setLiveNewsActive(false)
                            }}
                        >
                            Top Stories
                        </div>
                    </Link>
                    <Link 
                        to="/most-popular"
                    >
                        <div
                            className={mostPopularActive ? "active nav-list-item" : "nav-list-item"}
                            onClick={() => {
                                setTopStoriesActive(false)
                                setMostPopularActive(true)
                                setLiveNewsActive(false)
                            }}
                        >
                        Most Popular
                        </div>
                    </Link>
                    <Link 
                        to="/live-news" 
                    >
                        <div
                            className={liveNewsActive ? "active nav-list-item" : "nav-list-item"}
                            onClick={() => {
                                setTopStoriesActive(false)
                                setMostPopularActive(false)
                                setLiveNewsActive(true)
                            }}
                        >
                            Real-Time News
                        </div>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComponent