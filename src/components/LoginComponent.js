import React, {useContext, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {Context} from "../Context"

const LoginComponent = () => {
    const {setModalOpen, login, currentUser, setIsLoggedIn} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setError("")
            await login(email, password)
            navigate("/")
            setIsLoggedIn(true)
            setModalOpen(false)
        } catch {
            setError("Failed to log in")
        }   
    }


    return (
        <div className="my-modal">
            <div className="inner my-shadow">
                <h1>Log In</h1>
                <hr className="hr mb-2"/>
                <div className="signup-error">{error ? error : null}</div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        className="my-shadow" 
                        type="email" 
                        value={email} 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        className="my-shadow" 
                        type="password" 
                        value={password} 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="my-shadow login-btn" type="submit">Log In</button>
                </form>
                <div className="alt-login">
                    <p>Don't have an account?</p>
                    <Link to="/signup" onClick={() => setModalOpen(false)}><p>Sign up</p></Link>
                    <hr className="hr mb-3"/>
                </div>
                <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            </div>
        </div>
    )
}

export default LoginComponent