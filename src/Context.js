import React, {useState, useEffect} from "react"

const Context = React.createContext()

const ContextProvider = (props) => {

    const API_KEY = process.env.REACT_APP_API_KEY

    const [sectionList, setSectionList] = useState([])

    useEffect(() => {
        try {
            fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setSectionList(data.results.map(section => section.section)))
        } catch {
            console.log("error")
        }
        
    }, [])

    return (
        <Context.Provider value={{sectionList, API_KEY}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}