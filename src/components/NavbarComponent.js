import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const NavbarComponent = () => {

    const [search, setSearch] = useState("")


    return (
        <div>
            <ul className="list-unstyled d-flex">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/top-stories">Top Stories</Link></li>
                <li><Link to="/most-popular">Most Popular</Link></li>
                <li><Link to="">Real-Time News</Link></li>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </ul>
        </div>
    )
}

export default NavbarComponent