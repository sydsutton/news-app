import React, {useState, useContext, useEffect} from "react"
import logo from "../images/logo.png"
import { Navbar, Nav } from 'react-bootstrap'
import {Context} from "../Context"
import {Link, useNavigate, useLocation} from "react-router-dom"
import {AiOutlineLogin} from "react-icons/ai"
import {FaUserCircle} from "react-icons/fa"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    const [topStoriesActive, setTopStoriesActive] = useState(true)
    const [mostPopularActive, setMostPopularActive] = useState(false)
    const [liveNewsActive, setLiveNewsActive] = useState(false)
    const [savedArticlesActive, setSavedArticlesActive] = useState(false)
    const [loginActive, setLoginActive ] = useState(false)

    //I used a temporary search variable so that the search page would not update
    //the search query with every key stroke.

    const {setSearchQuery, setSearchData, setLoading, getSearchData, savedArticlesArray, isLoggedIn, modalOpen, setModalOpen} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()

    const setInactive = () => {
        setTopStoriesActive(false)
        setMostPopularActive(false)
        setLiveNewsActive(false)
        setSavedArticlesActive(false)
    }

    useEffect(()=>{
        setInactive()
        if (location.pathname === "/most-popular"){
            setMostPopularActive(true)
         } else if(location.pathname === "/live-news"){
            setLiveNewsActive(true)
         } else if(location.pathname === "/saved"){
            setSavedArticlesActive(true)
         } else if(location.pathname === "/signup"){
             setInactive()
         } else if(location.pathname === "/"){
            setTopStoriesActive(true)
         }
    }, [location.pathname, modalOpen])


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
        <Navbar className={modalOpen ? "nav-bg mb-4 my-shadow disabled" : "nav-bg mb-4 my-shadow"} fixed="top" expand="lg" sticky="top">
            <Navbar.Brand href="/"><img src={logo} className="logo" alt="Newz logo" /></Navbar.Brand>
            <div className="float-right custom-width">
                <form className="text-right d-flex align-items-center">
                    <input className="my-shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                    <button 
                        className="search-button"
                        type="submit" 
                        onClick={e => handleClick(e) }
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
                        >
                            Top Stories
                        </div>
                    </Link>
                    <Link 
                        to="/most-popular"
                    >
                        <div
                            className={mostPopularActive ? "active nav-list-item" : "nav-list-item"}
                        >
                        Most Popular
                        </div>
                    </Link>
                    <Link 
                        to="/live-news" 
                    >
                        <div
                            className={liveNewsActive ? "active nav-list-item" : "nav-list-item"}
                        >
                            Real-Time News
                        </div>
                    </Link>
                    {isLoggedIn ?
                    <Link 
                        to="/saved" 
                    >
                        <div
                            className={savedArticlesActive ? "active nav-list-item" : "nav-list-item"}
                        >
                            {savedArticlesArray.length > 0 ? 
                                <div><FaUserCircle size={20} /><div className="d-inline">{savedArticlesArray.length} Saved</div> </div>
                                : 
                                <div><FaUserCircle size={20}/><div className="d-inline">Saved</div> </div>
                            }
                        </div>
                    </Link>
                    :
                    <>
                        <button 
                            className={loginActive ? "nav-list-item bg-transparent nav-login" : "nav-list-item bg-transparent nav-login" }
                            onClick={() => setModalOpen(true)}>
                                <AiOutlineLogin size={15} /> Log In
                        </button>
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComponent