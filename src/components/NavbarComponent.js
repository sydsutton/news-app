import React, {useState, useContext} from "react"
import logo from "../images/logo.png"
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = (props) => {
    const [tempSearch,  setTempSearch] = useState("")
    const [navOpen, setNavOpen] = useState(false)
    const [active, setActive] = useState("")

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
        <Navbar className="nav-bg mb-4 my-shadow" fixed="top" expand="lg" sticky="top">
            <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
            <div className="float-right custom-width">
                <form className="text-right">
                    <input className="my-shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
                    <button 
                        className="search-button"
                        type="submit" 
                        onClick={e => {
                            navigate("search") 
                            handleClick(e) 
                        }}
                        >
                        Search
                    </button>
                </form>
            </div>
            <Navbar.Toggle onClick={() => setNavOpen(!navOpen)}/>
            <Navbar.Collapse isOpen={navOpen} className="nav-bg">
                <Nav  activeKey={active ? active : "/"} onSelect={(key) => setActive(key)}>
                    <Nav.Item>
                        <Link to="/"><Nav.Link eventKey="/" className="nav-list-item float-right">Top Stories</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/most-popular"><Nav.Link eventKey="/most-popular" className="nav-list-item float-right">Most Popular</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/live-news"><Nav.Link eventKey="/live-news" className="nav-list-item float-right">Real-Time News</Nav.Link></Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComponent