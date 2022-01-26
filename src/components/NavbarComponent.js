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
        if (location.pathname === "/most-popular"){
            setInactive()
            setMostPopularActive(true)
         } else if(location.pathname === "/live-news"){
            setInactive()
            setLiveNewsActive(true)
         } else if(location.pathname === "/saved"){
            setInactive()
            setSavedArticlesActive(true)
         } else if(location.pathname === "/signup"){
             setInactive()
         } else if(location.pathname === "/"){
            setInactive()
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
        <Navbar collapseOnSelect className={modalOpen ? "nav-bg mb-4 my-shadow disabled" : "nav-bg mb-4 my-shadow"} fixed="top" expand="lg">
            <Navbar.Brand href="/"><img src={logo} className="logo" alt="Newz logo" /></Navbar.Brand>
            <div className="float-right custom-width">
                <form className="text-right d-flex align-items-center">
                    <input 
                        className="my-shadow nav-input" 
                        type="text" 
                        value={tempSearch} 
                        onChange={e => setTempSearch(e.target.value)} 
                    />
                    <button 
                        className="search-button"
                        type="submit" 
                        onClick={e => handleClick(e) }
                    >
                        Search
                    </button>
                </form>
            </div>
            <Navbar.Toggle className="toggle-icon" aria-controls="navbar"/>
            <Navbar.Collapse className="nav-bg" id="navbar" >
                <Nav className="nav-collapse">
                    <Nav.Link 
                        as={Link} 
                        to="/" 
                        eventKey={1}
                        className={topStoriesActive ? "active nav-list-item" : "nav-list-item"}
                    >
                        Top Stories
                    </Nav.Link>
                    <Nav.Link 
                        as={Link}
                        to="/most-popular"
                        eventKey={2}
                        className={mostPopularActive ? "active nav-list-item" : "nav-list-item"}
                    >
                        Most Popular
                    </Nav.Link>
                    <Nav.Link 
                        as={Link}
                        to="/live-news" 
                        eventKey={3}
                        className={liveNewsActive ? "active nav-list-item" : "nav-list-item"}
                    >
                        Real-Time News
                    </Nav.Link>
                    {isLoggedIn ?
                    <Nav.Link 
                        as={Link}
                        to="/saved" 
                        eventKey={4}
                        className={savedArticlesActive ? "active nav-list-item" : "nav-list-item"}
                    >
                        {savedArticlesArray.length > 0 ? 
                            <div className="d-flex flex-row justify-content-evenly"><FaUserCircle size={15} /><div className="d-inline">{savedArticlesArray.length} Saved</div> </div>
                            : 
                            <div className="d-flex flex-row justify-content-evenly"><FaUserCircle size={15}/><div className="d-inline">Saved</div> </div>
                        }
                    </Nav.Link>
                    :
                    <>
                        <button 
                            className={loginActive ? "nav-list-item nav-login" : "nav-list-item nav-login" }
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