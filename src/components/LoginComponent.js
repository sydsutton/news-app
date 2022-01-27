import React, {useContext, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {Context} from "../Context"

const LoginComponent = () => {
    const {setModalOpen, login, setIsLoggedIn, currentUser} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setError("")
            await login(email, password)
                .then(() => {
                    setIsLoggedIn(true)
                    setModalOpen(false)
                    navigate("/saved")
                })
                .catch((error) => {
                    alert(error.message)
                })

        } catch {
            setError("Failed to log in")
        }   
    }

    return (
        <>
            <div className="my-modal" onClick={() => setModalOpen(false)}>
            </div>
            <div className="inner my-shadow">
                <h3 className="letter-spacing">Log In</h3>
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
                    <div className="d-flex flex-row align-items-center text-align-center mb-0">
                        <p>Forgot password?</p>
                        <Link to="forgot-password" onClick={() => setModalOpen(false)}><p>Reset password</p></Link>
                    </div>
                    <hr className="hr mt-0 mb-2"/>
                    <p>Don't have an account?</p>
                    <Link to="/signup" onClick={() => setModalOpen(false)}><p>Sign up</p></Link>
                </div>
                <button className="close-modal-btn" onClick={() => setModalOpen(false)}>X</button>
            </div>
        </>
    )
}

export default LoginComponent