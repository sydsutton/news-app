import React, {useState, useEffect} from "react"

const Context = React.createContext()

const ContextProvider = (props) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    const [sectionList, setSectionList] = useState([])
    const [topStories, setTopStories] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        let isMounted = true
        try {
            fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setSectionList(data.results.map(section => section.section)))
        } catch {
            console.log("error")
        }

        try {
            fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setTopStories(data.results)
                })
        } catch {
            console.log("error")
        }

        return () => {isMounted = false}
    }, [])

    

    return (
        <Context.Provider value={{sectionList, API_KEY, topStories, searchQuery, setSearchQuery, searchData, setSearchData}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}