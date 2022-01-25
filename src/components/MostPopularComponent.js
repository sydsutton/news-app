import React, {useEffect, useState, useContext} from "react"
import {Context} from "../Context"
import {Spinner} from "react-bootstrap"
import NewsArticle from "./NewsArticleComponent"

const MostPopularComponent = () => {
    
    const {API_KEY, setErrorMessage} = useContext(Context)

    const [type, setType] = useState("shared")
    const [period, setPeriod] = useState(1)
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        setNewsData([])
        setLoading(true)
        let isMounted = true
        try {
            fetch(`https://api.nytimes.com/svc/mostpopular/v2/${type}/${period}.json?api-key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.results)
                    if(isMounted){
                        setNewsData(data.results)
                        setLoading(false)
                    }
                })
                .catch(() => setErrorMessage("Sorry, we are having trouble loading that information right now. Please try again later."))
        } catch {
            console.log("error")
            setLoading(false)
        }
        return () => {isMounted = false}

    }, [type, period])

    return (
        <div className="page-width center">
            <h2 className="letter-spacing">Most Popular</h2>
            <hr className="hr"/>
            <select onChange={e => setType(e.target.value)}>
                <option value="shared">The most shared articles</option>
                <option value="emailed">The most emailed articles</option>
                <option value="viewed">The most viewed articles</option>
            </select>
            <select onChange={e => setPeriod(e.target.value)}>
                <option value={1}>In the last day</option>
                <option value={7}>In the last week</option>
                <option value={30}>In the last month</option>
            </select>

            <div className="mt-5">{loading ? <Spinner animation="border" /> : null}</div>

            <div className="d-flex">
                {newsData.filter(article => article.media.length >= 1).map((article, index) => {
                    // console.log(article)
                    return (
                        <div className="max-width card my-shadow rounded-edges" key={index}>
                            <NewsArticle article={article} key={index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MostPopularComponent

// abstract: "Marilyn Mosby, the state’s attorney for Baltimore City, is accused of lying about pandemic hardships to withdraw retirement funds and of making false statements in her mortgage applications to buy two Florida vacation homes."
// adx_keywords: "Perjury;Pensions and Retirement Plans;Mortgages;Frauds and Swindling;District Attorneys;Mosby, Marilyn J (1980- );Baltimore (Md)"
// asset_id: 100000008159007
// byline: "By Alyssa Lukpat and Christine Chung"
// column: null
// x des_facet: (5) ['Perjury', 'Pensions and Retirement Plans', 'Mortgages', 'Frauds and Swindling', 'District Attorneys']
// eta_id: 0
// x geo_facet: ['Baltimore (Md)']
// id: 100000008159007
// x media: [{…}]
// nytdsection: "u.s."
// x org_facet: []
// x per_facet: ['Mosby, Marilyn J (1980- )']
// published_date: "2022-01-13"
// section: "U.S."
// source: "New York Times"
// subsection: ""
// title: "Baltimore Prosecutor Charged With Perjury and Filing False Loan Applications"
// type: "Article"
// updated: "2022-01-14 11:04:50"
// uri: "nyt://article/283b5acf-0fca-5df9-abb4-b8ed0e8bad43"
// url: "https://www.nytimes.com/2022/01/13/us/marilyn-mosby-baltimore-charged.html"