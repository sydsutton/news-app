import React, {useState, useEffect} from "react"
import { auth } from "./firebase"

const Context = React.createContext()

const ContextProvider = (props) => {
    const API_KEY = process.env.REACT_APP_API_KEY

    const [sectionList, setSectionList] = useState([])
    const [topStories, setTopStories] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchData, setSearchData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [savedArticlesArray, setSavedArticlesArray] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        let isMounted = true

        setLoading(true)
        try {
            fetch(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                if(isMounted){
                    setSectionList(data.results.map(section => section.section).filter(section => !section.includes("&") && !section.includes("/")))
                }
            })
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

        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return () => {isMounted = false}
    }, [])

    async function getSearchData({tempSearch}) {
        setLoading(true)
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
                        if(data.response.docs.length === 0){
                            setErrorMessage("Sorry, but we didn't find any articles")
                        }
                        setLoading(false)
                        setSearchData(data.response.docs)
                    })
                    .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
                    setLoading(false)
            } catch {
                setLoading(false)
                setSearchData([])
            }
    }

    const saveArticle = (article) => {
        setSavedArticlesArray([...savedArticlesArray, article])
    }

    const removeArticle = (article) => {
        setSavedArticlesArray([...savedArticlesArray.filter(prevArticles => prevArticles !== article)])
    }
    
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const reset = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const signOut = () => {
        return auth.signOut()
    }

    return (
        <Context.Provider value={{
            sectionList,
            API_KEY,
            topStories,
            searchQuery,
            setSearchQuery,
            searchData,
            setSearchData,
            errorMessage,
            setErrorMessage,
            loading,
            setLoading,
            getSearchData,
            saveArticle,
            removeArticle,
            savedArticlesArray,
            isLoggedIn,
            setIsLoggedIn,
            modalOpen,
            setModalOpen,
            currentUser,
            signup,
            login,
            reset,
            signOut,
            rememberMe,
            setRememberMe
        }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}