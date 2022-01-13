import React, {useState, useEffect, useContext} from "react"
import {Context} from "../Context"
import Search from "./SearchComponent"
import {Link, Routes, Route} from "react-router-dom"

const NavbarComponent = () => {
    const {API_KEY} = useContext(Context)

    const [search, setSearch] = useState("")
    const [query, setQuery] = useState("")
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        let isMounted = true
        try {
            fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    if(isMounted){
                        setSearchData([data.response.docs])
                    }
                })
        } catch {
            console.log("error")
        }

        return () => {isMounted = false}
    }, [query])

    const handleClick = (e) => {
        e.preventDefault()
        setQuery(search)
    }

    return (
        <div>
            <ul className="list-unstyled d-flex">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/top-stories">Top Stories</Link></li>
                <li><Link to="/most-popular">Most Popular</Link></li>
                <li><Link to="/live-news">Real-Time News</Link></li>
                <li>
                    <Link to="/search">
                        <form>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type="submit" onClick={(e) => handleClick(e)}>Search</button>
                        </form>
                    </Link>
                </li>
            </ul>
            <Routes>
                <Route exact path="/search" element={<Search searchData={searchData} />} />
            </Routes>
        </div>
    )
}

export default NavbarComponent