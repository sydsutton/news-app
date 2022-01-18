import React, {useState, useEffect} from "react"

const Context = React.createContext()

const ContextProvider = (props) => {

    const [sectionList, setSectionList] = useState([])
    const [topStories, setTopStories] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchData, setSearchData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        try {
            fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setSectionList(data.results.map(section => section.section).filter(section => !section.includes("&"))))
            .catch(error => setErrorMessage(error))
            setLoading(false)
        } catch {
            console.log("error")
        }

        try {
            fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setTopStories(data.results)
                })
                .catch(error => setErrorMessage(error))
                setLoading(false)
        } catch {
            console.log("error")
        }
        setLoading(false)
        return () => {isMounted = false}
    }, [])

    const handleToggle = () => {
        console.log("hello")
    }

    

    return (
        <Context.Provider value={{
            sectionList, topStories, searchQuery, setSearchQuery, searchData, setSearchData, errorMessage, setErrorMessage, loading, setLoading, handleToggle
        }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}