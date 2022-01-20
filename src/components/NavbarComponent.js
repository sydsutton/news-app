import React, {useState, useContext} from "react"
import logo from "../images/logo.png"
import { Navbar, Nav } from 'react-bootstrap'
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    const [topStoriesActive, setTopStoriesActive] = useState(true)
    const [mostPopularActive, setMostPopularActive] = useState(false)
    const [liveNewsActive, setLiveNewsActive] = useState(false)
    const [savedArticlesActive, setSavedArticlesActive] = useState(false)

    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.

    const {setSearchQuery, setSearchData, setLoading, getSearchData, savedArticlesArray} = useContext(Context)
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        if(tempSearch !== ""){
            navigate("search")
            setSearchQuery(tempSearch)
            setLoading(true)
            setSearchData([])
    
            getSearchData({tempSearch})
        } 
    }

    return (
        <Navbar className="nav-bg mb-4 my-shadow" fixed="top" expand="lg" sticky="top">
            <Navbar.Brand href="/"><img src={logo} className="logo" alt="Newz logo" /></Navbar.Brand>
            <div className="float-right custom-width">
                <form className="text-right">
                    <input className="my-shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                    <button 
                        className="search-button"
                        type="submit" 
                        onClick={e => {
                            handleClick(e) 
                            setTopStoriesActive(false)
                            setMostPopularActive(false)
                            setLiveNewsActive(false)
                            setSavedArticlesActive(false)
                        }}
                        >
                        Search
                    </button>
                </form>
            </div>
            <Navbar.Toggle className="toggle-icon"/>
            <Navbar.Collapse className="nav-bg">
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
                                setSavedArticlesActive(false)
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
                                setSavedArticlesActive(false)
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
                                setSavedArticlesActive(false)
                            }}
                        >
                            Real-Time News
                        </div>
                    </Link>
                    <Link 
                        to="/saved" 
                    >
                        <div
                            className={savedArticlesActive ? "active nav-list-item" : "nav-list-item"}
                            onClick={() => {
                                setTopStoriesActive(false)
                                setMostPopularActive(false)
                                setLiveNewsActive(false)
                                setSavedArticlesActive(true)
                            }}
                        >
                            {savedArticlesArray.length} Saved
                        </div>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComponent