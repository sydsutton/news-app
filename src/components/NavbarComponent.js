import React, {useState, useContext} from "react"
import logo from "../images/logo.png"
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import {Context} from "../Context"
import {Link, useNavigate} from "react-router-dom"

const NavbarComponent = () => {
    const [tempSearch,  setTempSearch] = useState("")
    const [navOpen, setNavOpen] = useState(false)
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
        // <nav className="my-shadow navbar navbar-expand-lg navbar-light flex-row">
        //     <div>
        //         <Link className="navbar-brand" to="/"><img src={logo} className="logo" /></Link>
        //         <form>
        //             <input className="my-shadow" type="text" value={tempSearch} onChange={e => setTempSearch(e.target.value)} />
        //             <button 
        //                 className="search-button bold"
        //                 type="submit" 
        //                 onClick={e => {
        //                     navigate("search") 
        //                     handleClick(e) 
        //                 }}
        //                 >
        //                 Search
        //             </button>
        //         </form>
        //         <button className="navbar-toggler" onClick={() => setNavOpen(!navOpen)}>
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbar" open={navOpen}>
        //             <Link className="text-decoration-none bold nav-list-item" to="/">Top Stories</Link>
        //             <Link className="text-decoration-none bold nav-list-item" to="/most-popular">Most Popular</Link>
        //             <Link className="text-decoration-none bold nav-list-item" to="/live-news">Real-Time News</Link>
        //         </div>
        //     </div>
        // </nav>
        <Navbar className="bg-dark mb-4" fixed="top" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
            <div className="mx-auto">
                <form>
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
            <Navbar.Collapse isOpen={navOpen} className="bg-dark">
                <Nav className="ml-auto">
                    <Nav.Link className="bold nav-list-item float-right" href="/">Top Stories</Nav.Link>
                    <Nav.Link className="bold nav-list-item float-right" href="/most-popular">Most Popular</Nav.Link>
                    <Nav.Link className="bold nav-list-item float-right" href="/live-news">Real-Time News</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavbarComponent