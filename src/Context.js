import React, {useState, useEffect} from "react"

const Context = React.createContext()

const ContextProvider = (props) => {
    const API_KEY = process.env.REACT_APP_API_KEY

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
            .then(data => setSectionList(data.results.map(section => section.section).filter(section => !section.includes("&") && !section.includes("/"))))
            .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
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
                .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
                setLoading(false)
        } catch {
            console.log("error")
        }
        setLoading(false)
        return () => {isMounted = false}
    }, [])

    async function getSearchData({tempSearch}) {
        try {
            await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${tempSearch}&api-key=${API_KEY}`)
                    .then(res => {
                        if (res.status >= 200 && res.status <= 299) {
                            return res.json();
                          } else {
                            throw Error(res.statusText);
                    }})
                    .then(data => {
                        console.log(data)
                        setSearchData(data.response.docs)
                    })
                    .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
                    setLoading(false)
            } catch {
                setSearchData([])
            }
        setLoading(false)
    }


    return (
        <Context.Provider value={{
            sectionList, API_KEY, topStories, searchQuery, setSearchQuery, searchData, setSearchData, errorMessage, setErrorMessage, loading, setLoading, getSearchData
        }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}